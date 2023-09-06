import React, { useEffect, useState } from 'react'
import Topbar from './Topbar';
import Home from './Home';
import Footer from './Footer';
import Search from './Search';
import Library from './Library';
import Account from './Account';
import PlaylistView from './PlaylistView';

function Mainmenu({token}){
    const [currentView,setCurrentView] =  useState('home')
    const [queue,setQueue]= useState([])
    const [toptracks,setToptracks]=useState([])
    const [reader,setReader]=useState('Top songs')
    const [tracks,setTracks]=useState([])
    const [currentPlaylist,setCurrentPlaylist]=useState({})
    return (<>
    <Topbar currentView={currentView} token={token} setCurrentView={setCurrentView}/>
    {currentView=="home"&& <Home currentview={currentView} setCurrentView={setCurrentView} token={token} queue={queue} setQueue={setQueue} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} reader={reader} tracks={tracks} setTracks={setTracks} currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist}/>}
    {currentView=="search"&& <Search currentview={currentView} setCurrentView={setCurrentView} token={token} toptracks={toptracks} setToptracks={setToptracks}
    setReader={setReader} reader={reader}/>}
    {currentView=="library" && <Library token={token} currentview={currentView} setCurrentView={setCurrentView} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} reader={reader} tracks={tracks} setTracks={setTracks}/>}
    {currentView=="account" && <Account token={token} currentview={currentView} setCurrentView={setCurrentView} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} reader={reader} tracks={tracks} setTracks={setTracks}/>}
    {currentView=="playlist" && <PlaylistView token={token} currentPlaylist={currentPlaylist}/>}
    <Footer queue={queue} setQueue={setQueue} token={token} tracks={tracks} setTracks={setTracks}/>
    </>)
}

export default Mainmenu;
