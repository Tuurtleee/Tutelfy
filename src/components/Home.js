import React, { useEffect, useState } from 'react'
import Playlist from './Playlist';

function Home({token, queue, setQueue, toptracks, setToptracks, reader, setReader, tracks, setTracks}){
    useEffect(()=>{
        fetchData('/me/playlists?limit=5',token,'playlists')
        if(toptracks.length==0){
            fetchData('/me/top/tracks?limit=15',token,'tracks')
        }
    },[token])
    return (
        <div className='Home-container'>
            <div className='Playlists'>
            {tracks.length!=0 && tracks.map((obj,i)=>{
                return <Playlist token={token} item={obj} key={i} setToptracks={setToptracks} setReader={setReader}/>
            })}
            </div>
            <div className='player'>
                <h1 className='reader'>{reader}</h1>
                {toptracks.map((track,i)=>{
                    let durationms= track.duration_ms
                    let duration = String(Math.round(((durationms/1000)/60)*100)/100).replace('.',':')
                    return (<div key={i} className='track' onClick={()=>{
                        fetch('https://api.spotify.com/v1/me/player/play', {
                    method: 'PUT',
                    headers: {
                        'Authorization':'Bearer '+token,
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        "uris": toptracks.map((t)=>{
                            return t.uri
                        }),
                        "offset":{"position":i}
                      })
                })
                    }}>
                        <div className='flexbox'>
                        <img src={track.album.images[0].url}></img>
                        <div className='prod-info'>
                        <span className='trackname'>{track.name}</span>
                        <span className='artist'>{track.artists[0].name}</span>
                        </div>
                        <div className='albumname'>{track.album.name}</div>
                        </div>
                        <div className='duration'>{duration}</div>
                    </div>)
                })}
            </div>
        </div>
    )
    function fetchData(url,token,target){
        fetch('https://api.spotify.com/v1'+url, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token,
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(json =>{
        if(target=='playlists'){
            setTracks(json.items)
        }
        if (target=='favartists'){
            setFavartists(json.items)
        }
        if (target=='tracks'){
            setToptracks(json.items)
        }
    })
    }
}

export default Home