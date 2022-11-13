import React, { useEffect, useState } from 'react'

function Track({item, token, setToptracks, setReader}){
    let durationms= item.duration_ms
                    let duration = String(Math.round(((durationms/1000)/60)*100)/100).replace('.',':')
    return (<div className='track' onClick={()=>{
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
        <span className='trackname'>{item.name}</span>
        <span className='artist'>{item.artists[0].name}</span>
        </div>
        <div className='albumname'>{item.album.name}</div>
        </div>
        <div className='duration'>{duration}</div>
    </div>)
}
export default Track