import React, { useEffect, useState } from 'react'

function Login({url}){
    return (
        <div className='login-container'>
            <img src="https://cdn.discordapp.com/avatars/538010355192954895/af09c3d4889c6e636fcfbcc310fb3208.png?size=4096" alt="" draggable="false"/>
            <h2>Tutelfy</h2>
            <p>We need you to connect to your Spotify account in order to play music and display your information.</p>
            <a href={url} className="login-btn">Login to Spotify</a>
        </div>
    )
}
export default Login