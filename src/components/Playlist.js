import React, { useEffect, useState } from 'react'

function Playlist({item, token, setToptracks, setReader, currentView, setCurrentView,setCurrentPlaylist}){
    return (
        <div className='Playlist-container' onClick={()=>{
            setCurrentView("playlist")
            setCurrentPlaylist(item)
            console.log(item)
            //fetch('https://api.spotify.com/v1/me/player/play', {
            //        method: 'PUT',
            //        headers: {
            //            'Authorization':'Bearer '+token,
            //            'Content-Type': 'application/json',
            //        },
            //        body:JSON.stringify({
            //            "context_uri": item.uri
            //          })
            //    })
            }}>
            <img src={item.images[0].url} alt="" draggable="false"/>
            <h2>{item.name.slice(0,20)}</h2>
        </div>
    )
}
export default Playlist
