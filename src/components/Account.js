import React, { useEffect, useState } from 'react'

function Account({token, queue, setQueue, toptracks, setToptracks, reader, setReader, tracks, setTracks, currentView, setCurrentView}){
    const[user,setUser]=useState()
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
    },[token])
    return (<>
            <div className='banner'>
                <img src={user && user.images[1].url}></img>
                <h1>{user && user.display_name}</h1>
            </div>
        <div className='Account-container'>
            Due to security & privacy reasons this app isn't registered with enough permissions to edit your user profile.
        </div>
        </>
    )
}
export default Account
