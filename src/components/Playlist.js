import React, { useEffect, useState } from 'react'

function Playlist({item, token, setToptracks, setReader, currentView, setCurrentView,setCurrentPlaylist}){
    return (
        <div className='Playlist-container' onClick={()=>{
            setCurrentView("playlist")
            setCurrentPlaylist(item)
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
            //fetch('https://api.spotify.com/v1/playlists/'+item.id+'/tracks', {
            //        method: 'GET',
            //        headers: {
            //            'Authorization':'Bearer '+token,
            //            'Content-Type': 'application/json',
            //        },
            //    }).then((response)=>response.json())
            //    .then((json)=>{
            //        let tracks = json.items.map((t)=>{
            //            return t.track
            //        })
            //        setToptracks(tracks)
            //    })
            }}>
            <img src={item.images[0].url} alt="" draggable="false"/>
            <h2>{item.name.slice(0,20)}</h2>
        </div>
    )
}
export default Playlist
