import React, { useEffect, useState } from 'react'
import Track from './Track'

function PlaylistView({token, currentPlaylist,setReader,setToptracks}){
  const [tracks,setTracks]=useState([])
  const [currentPlaying,setCurrentPlaying]=useState("")
  const [ownerpfp,setOwnerpfp]=useState("")

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
    let I;
    if(currentPlaying==""){
        I = setInterval(()=>{
        fetch('https://api.spotify.com/v1/me/player', {
          method: 'GET',
          headers: {
              'Authorization':'Bearer '+token,
              'Content-Type': 'application/json'
          },
      }).then((response)=>{return response.json()}).then((json)=>{
        if(json.item){
          setCurrentPlaying(json.item)
        }
      })
    },1000)

    if(ownerpfp==""){
      if(currentPlaylist.type=="album"){
        getUserpfp(currentPlaylist.artists[0].href,token).then((url)=>{
          setOwnerpfp(url)
        })
      }else{
      getUserpfp(currentPlaylist.owner.href,token).then((url)=>{
        setOwnerpfp(url)
      })
    }
  }
    }
    return ()=>{
      console.log("clearing interval")
      clearInterval(I)
    }
  },[currentPlaylist])
  return <div className='Playlist-Page'>
    <div className="bg-pl" style={{background: "url("+currentPlaylist.images[0].url+")"}}></div>
    <header>
      <img src={currentPlaylist.images[0].url} alt="" className='playlist-pp'/>
      <div className="playlist-topper">
      <h1 className='playlist-title'>{currentPlaylist.name}</h1>
      <p>{currentPlaylist.description}</p>
      <p className='flex'>Created by {currentPlaylist.type=="album" ? <button>{currentPlaylist.artists[0].name}</button> : <button className='playlist-owner'><img className="playlist-pfp" src={ownerpfp} alt="" />{currentPlaylist.owner.display_name}</button>}</p>

      </div>
    </header>
    <div className="cont">
    <button className="playlist-play" onClick={()=>{
        fetch('https://api.spotify.com/v1/me/player/play', {
                  method: 'PUT',
                  headers: {
                      'Authorization':'Bearer '+token,
                      'Content-Type': 'application/json',
                  },
                  body:JSON.stringify({
                      "context_uri": currentPlaylist.uri
                    })
              })
      }}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg></button>
    <div className='Playlist-content'>
      {tracks.map((track,i)=>{
        if(track){
          return <Track item={track} token={token} setToptracks={setToptracks} setReader={setReader} key={i} currentPlaying={currentPlaying}/>
        }else{
          console.log(tracks)
        }
      }
      )}
    </div>
  </div>
  </div>
}
async function getUserpfp(href, token) {
  try {
      const response = await fetch(href, {
          method: 'GET',
          headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
          },
      });

      const json = await response.json();
      return json.images[1].url;
  } catch (error) {
      // Gérez les erreurs ici si nécessaire
      console.error(error);
      throw error;
  }
}

export default PlaylistView
