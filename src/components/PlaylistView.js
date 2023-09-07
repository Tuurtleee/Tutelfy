import React, { useEffect, useState } from 'react'
import Track from './Track'

function PlaylistView({token, currentPlaylist,setReader,setToptracks}){
  const [tracks,setTracks]=useState([])
  useEffect(()=>{
    if(currentPlaylist.type == "album"){
      fetch("https://api.spotify.com/v1/albums/"+currentPlaylist.id+"/tracks", {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token,
            'Content-Type': 'application/json',
        },
    }).then((response)=>{return response.json()}).then((json)=>{
      const updatedTracks = json.items.map((t) =>{
        let tt = t
        tt.album = {"images":[{"url":currentPlaylist.images[0].url}]}
        return tt
      });
          setTracks(updatedTracks);
    })
    }else{
      fetch(currentPlaylist.tracks.href, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token,
            'Content-Type': 'application/json',
        },
    }).then((response)=>{return response.json()}).then((json)=>{
      const updatedTracks = json.items.map((t) => t.track);
          setTracks(updatedTracks);
    })
    }
  },[currentPlaylist])
  return <div className='Playlist-Page'>
    <div className="bg-pl" style={{background: "url("+currentPlaylist.images[0].url+")"}}></div>
    <header>
      <img src={currentPlaylist.images[0].url} alt="" className='playlist-pp'/>
      <div className="playlist-topper">
      <h1 className='playlist-title'>{currentPlaylist.name}</h1>
      <p>{currentPlaylist.description}</p>
      <p>Created by {currentPlaylist.type=="album" ? <button>{currentPlaylist.artists[0].name}</button> : <button>{currentPlaylist.owner.display_name}</button>}</p>

      </div>
    </header>
    <div className='Playlist-content'>
      {tracks.map((track,i)=>{
        if(track){
          return <Track item={track} token={token} setToptracks={setToptracks} setReader={setReader} key={i}/>
        }else{
          console.log(tracks)
        }
      }
      )}
    </div>
  </div>
}

export default PlaylistView
