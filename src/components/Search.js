import React, { useEffect, useState, useRef } from 'react'
import Playlist from './Playlist'
import Track from './Track'

function Search({token, toptracks, setToptracks, setReader, tracks, setTracks, currentView, setCurrentView, setCurrentPlaylist}){
    const ref = useRef()
    const[album,setAlbum]=useState([])
    const[track,setTrack]=useState([])
    const[playlist,setPlaylist]=useState([])
    useEffect(()=>{
        fetch('https://api.spotify.com/v1/search?type=track,album,playlist&q=rock', {
                    method: 'GET',
                    headers: {
                        'Authorization':'Bearer '+token,
                        'Content-Type': 'application/json',
                    },
                }).then((response)=>response.json())
                .then((json)=>{
                    setAlbum(json.albums.items)
                    setPlaylist(json.playlists.items)
                    setTrack(json.tracks.items)
                })
    },[token])
    return (
        <div className='search-container'>
            <div className='topper'><form onSubmit={(e)=>{
                e.preventDefault();
               let query = ref.current.value;
               fetch('https://api.spotify.com/v1/search?type=track,album,playlist&q='+query, {
                    method: 'GET',
                    headers: {
                        'Authorization':'Bearer '+token,
                        'Content-Type': 'application/json',
                    },
                }).then((response)=>response.json())
                .then((json)=>{
                    setAlbum(json.albums.items)
                    setPlaylist(json.playlists.items)
                    setTrack(json.tracks.items)
                })
            }}><input type='text' ref={ref} spellCheck="false" placeholder='Search for songs, playlists, artists, users ...' tabIndex={-1}/></form></div>
            <div className='query-result'>
            <div>
                    <h1>Tracks</h1>
                    <div className=''>
                    {track.map((pl,i)=>{
                        return <Track token={token} item={pl} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} key={i}/>
                    })}
                    </div>
                </div>
                <div>
                    <h1>Playlists</h1>
                    <div className='flexbox'>
                    {playlist.map((pl,i)=>{
                        return <Playlist currentview={currentView} setCurrentView={setCurrentView} token={token} item={pl} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} key={i} setCurrentPlaylist={setCurrentPlaylist}/>
                    })}
                    </div>
                </div>
                <div>
                    <h1>Albums</h1>
                    <div className='flexbox'>
                    {album.map((pl,i)=>{
                        return <Playlist currentview={currentView} setCurrentView={setCurrentView} token={token} item={pl} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} key={i} setCurrentPlaylist={setCurrentPlaylist}/>
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Search
