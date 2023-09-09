import React, { useEffect, useState, useRef} from 'react'

function Footer({token}){
    const play = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>'
    const pause = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>'

    const [playingStatus,setPlayingStatus]=useState(false)
    const [lastplayed, setLastplayed]= useState(null)
    const ref = useRef()
    useEffect(()=>{
        if(playingStatus){
            ref.current.innerHTML = pause
        }else{
            ref.current.innerHTML = play
        }
        setInterval(()=>{
            fetchData('/me/player',token,'playing')
        },400)// WARNING: TODO: find the best interval to not reach the API rate limit
    },[playingStatus])
    return (
        <div className='Footer-container'>
            <div className='flexbox'>
            <span className='previous' onClick={()=>{
                fetch('https://api.spotify.com/v1/me/player/previous', {
                    method: 'POST',
                    headers: {
                        'Authorization':'Bearer '+token,
                        'Content-Type': 'application/json'
                    },
                })
            }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/></svg></span>
            <span className='toggleplay' ref={ref} onClick={()=>{
                setPlayingStatus(!playingStatus);
                if(playingStatus){
                    changePlayingStatus('/me/player/pause',token,'pause')
                }else{
                    changePlayingStatus('/me/player/play',token,'play')
                }
            }}></span>
            <span className='next' onClick={()=>{
                fetch('https://api.spotify.com/v1/me/player/next', {
                    method: 'POST',
                    headers: {
                        'Authorization':'Bearer '+token,
                        'Content-Type': 'application/json'
                    },
                })
            }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"/></svg></span>
            {lastplayed!=null  && <div className='prod-info played'><span className='song'>{lastplayed.name}</span><span className='artist'>{lastplayed.artists[0].name}</span></div>}</div>
            <div className='volume'>
            </div>
        </div>
    )
    function fetchData(url,token,target){
        fetch('https://api.spotify.com/v1'+url, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token,
            'Content-Type': 'application/json'
        },
    })
    .then(response =>{
      if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
    .then(json =>{
        if(target=='playlists'){
            setTracks(json.items)
        }
        if (target=='favartists'){
            setFavartists(json.items)
        }
        if (target=='tracks'){
            setToptracks(json.items)
        }
        if(target=='playing'){
            setLastplayed(json.item)
            if (json.is_playing){
                setPlayingStatus(true)
            }else{
                setPlayingStatus(false)
            }
        }
    }).catch(error => {
      console.error('Fetch error:', error);
    });
    }

    function changePlayingStatus(url, token,action){
        fetch('https://api.spotify.com/v1'+url, {
        method: 'PUT',
        headers: {
            'Authorization':'Bearer '+token,
            'Content-Type': 'application/json'
        }
    })
    }
}
export default Footer
