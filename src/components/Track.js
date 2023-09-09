import React, { useEffect, useState } from 'react'

function Track({item, token, setToptracks, setReader,currentPlaying}){
    let ms= item.duration_ms
    var min = Math.floor(ms/60000)
    var sec = ((ms % 60000) / 1000).toFixed(0);
    var duration = min + ":" + (sec < 10 ? '0' : '') + sec;
    if(currentPlaying==undefined){
        currentPlaying=""
    }
    return (<div className={item.name!=currentPlaying.name ?'track':"track track-playing"} onClick={()=>{
        fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
        'Authorization':'Bearer '+token,
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({
        "uris": [item.uri]
      })
})
    }}>
        <div className='flexbox'>
        <img src={item.album.images[0].url}></img>
        <div className='prod-info'>
        <span className='trackname'>{clearName(item.name)}</span>
        <span className='artist'>{clearName(item.artists[0].name)}</span>
        </div>
        <div className='albumname'>{clearName(item.album.name)}</div>
        </div>
        <div className='duration'>{duration}</div>
    </div>)
}
function clearName(name){
  //if name is a string
   if(typeof name === 'string'){
      if(name.length>25){
        return name.slice(0,25)+"..."
    }else{
        return name
    }
  }else{
    return ""
  }
}
export default Track
