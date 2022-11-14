import React, { useEffect, useState } from 'react'
import Artist from './Artist'
import Playlist from './Playlist'

function Library({token, toptracks, setToptracks, setReader, tracks, setTracks, currentView, setCurrentView}){
    const [playlist, setPlaylist]=useState([])
    const [artist, setArtist]=useState([])
    useEffect(()=>{
        fetchData("/me/top/artists?limit=10",token,"favartists")
        fetchData('/me/playlists?limit=50',token,'playlists')
    },[token])
    return (
        <div className='Library-container'>
            <h1>Favorite Artists</h1>
            <div className='artists-library flexbox'>
                {artist.map((artist,i)=>{
                    return < Artist token={token} item={artist} currentview={currentView} setCurrentView={setCurrentView} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} key={i}/>
                })}
            </div>
            <div>
                    <h1>Playlists</h1>
                    <div className='flexbox'>
                    {playlist.map((pl,i)=>{
                        return <Playlist currentview={currentView} setCurrentView={setCurrentView} token={token} item={pl} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} key={i}/>
                    })}
                    </div>
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
            setPlaylist(json.items)
        }
        if (target=='favartists'){
            setArtist(json.items)
        }
        if (target=='tracks'){
            setToptracks(json.items)
        }
    })
    }
}
export default Library