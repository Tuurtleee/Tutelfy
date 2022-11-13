import React, { useEffect, useState } from 'react'
import Topbar from './Topbar';
import Home from './Home';
import Footer from './Footer';
import Search from './Search';

function Mainmenu({token}){
    const [currentView,setCurrentView] =  useState('home')
    const [queue,setQueue]= useState([])
    const [toptracks,setToptracks]=useState([])
    const [reader,setReader]=useState('Top songs')
    const [tracks,setTracks]=useState([])
    return (<>
    <Topbar currentView={currentView} token={token} setCurrentView={setCurrentView}/>
    {currentView=="home"&& <Home token={token} queue={queue} setQueue={setQueue} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} reader={reader} tracks={tracks} setTracks={setTracks}/>}
    {currentView=="search"&& <Search token={token} toptracks={toptracks} setToptracks={setToptracks} setReader={setReader} reader={reader}/>}
    <Footer queue={queue} setQueue={setQueue} token={token} tracks={tracks} setTracks={setTracks}/>
    </>)
}

export default Mainmenu;