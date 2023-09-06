import React, { useEffect, useState } from 'react'

function PlaylistView({token, currentPlaylist}){
  console.log(currentPlaylist)

  return <div className='Playlist-Page'>
    <div className="bg-pl" style={{background: "url("+currentPlaylist.images[0].url+")"}}></div>
    <header>
      <img src={currentPlaylist.images[0].url} alt="" className='playlist-pp'/>
      <div className="playlist-topper">
      <h1 className='playlist-title'>{currentPlaylist.name}</h1>
      <p>{currentPlaylist.description}</p>
      <p>Created by <button>{currentPlaylist.owner.display_name}</button></p>
      </div>
    </header>
    <div className='Playlist-content'></div>
  </div>
}

export default PlaylistView
