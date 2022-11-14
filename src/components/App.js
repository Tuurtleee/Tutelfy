import React, { useEffect, useState } from 'react'
import '../assets/css/App.css'
const { ipcRenderer } = require('electron')
const ipc = ipcRenderer;
import hash from "./hash";
export const authEndpoint = 'https://accounts.spotify.com/authorize';
import Login from './Login'
import Mainmenu from './Mainmenu'

function App() {
  const client_id = "182e813031444454b16e04942e7aac6e";
  const redirect_uri = "http://0.0.0.0:8080/index.html";
  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email playlist-read-private user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played';
  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);



  const [token,setToken]=useState(hash.access_token)
  return (
    <div>
      {!token && (<Login url={url}/>)}
      {token &&(<Mainmenu token={token}/>)}
    </div>
  )
}


function generateRandomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default App
