import React, { useEffect, useState } from 'react'

function Playlist({item, token, setToptracks, setReader, currentView, setCurrentView,setCurrentPlaylist}){
    return (
        <div className='Playlist-container' onClick={()=>{
            setCurrentView("playlist")
            setCurrentPlaylist(item)
            }}>
            <img src={item.images[0].url} alt="" draggable="false"/>
            <h2>{item.name.slice(0,20)}</h2>
        </div>
    )
}
export default Playlist
