import React, { useEffect, useState } from 'react'

function Artist({item,token, setToptracks, setReader, currentView, setCurrentView}){
    return (
        <div className='Artist-container' onClick={()=>{
            setReader(item.name);
            fetch('https://api.spotify.com/v1/me/player/play', {
                    method: 'PUT',
                    headers: {
                        'Authorization':'Bearer '+token,
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        "context_uri": item.uri
                      })
                })
            fetch('https://api.spotify.com/v1/artists/'+item.id+'/top-tracks?country=US', {
                    method: 'GET',
                    headers: {
                        'Authorization':'Bearer '+token,
                        'Content-Type': 'application/json',
                    },
                }).then((response)=>response.json())
                .then((json)=>{
                    console.log(json)
                    setToptracks(json.tracks)
                    setCurrentView("home")
                })
        }}>
            <img src= {item.images[0].url} />
            <span>{item.name}</span>
        </div>
    )
}
export default Artist