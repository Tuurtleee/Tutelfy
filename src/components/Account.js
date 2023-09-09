import React, { useEffect, useState } from 'react'
import Playlist from './Playlist'
import Track from './Track'


function Account({token, queue, setQueue, toptracks, setToptracks, reader, setReader, tracks, setTracks, currentView, setCurrentView, setCurrentPlaylist}){
    const[user,setUser]=useState()
    const [topArtists, setTopArtists] = useState([])
    const [topTracks, setTopTracks] = useState([])
    useEffect(()=>{
        fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token,
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(json =>{
        setUser(json)
    })

    fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=12',{
      method: 'GET',
        headers: {
            'Authorization':'Bearer '+token,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
    .then(json =>{
      console.log(json.items)
        setTopArtists(json.items)
    })
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',{
      method: 'GET',
        headers: {
            'Authorization':'Bearer '+token,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
    .then(json =>{
        setTopTracks(json.items)
    })

    },[token])
    return (<>
            <div className='banner'>
                <img src={user && user.images[1].url}></img>
                <h1>{user && user.display_name}</h1>
            </div>
        <div className='Account-container'>
            <h1 className='reader'>Top Artists - All time</h1>
            <div className='artists-library flexbox'>
                {topArtists && topArtists.map((pl,i)=>{
                   return <Playlist currentview={currentView} setCurrentView={setCurrentView} token={token} item={pl} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} key={i} setCurrentPlaylist={setCurrentPlaylist}/>
                })}
            </div>
            <h1 className='reader mgtop'>Top Tracks - All time</h1>
            <div className='topTracks'>
                {topTracks && topTracks.map((pl,i)=>{
                    return <Track token={token} item={pl} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} key={i}/>
                  }
                )}
            </div>
        </div>
        </>
    )
}
export default Account
