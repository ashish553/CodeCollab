import React,{useEffect} from 'react'
import {io} from 'socket.io-client';
import ChatBox from '../Chat/ChatBox';
import Files from '../Files/Files';
import Settings from '../Settings/Settings';
import People from '../People/People';
import Chat from '../Chat/Chat';
// import { useContext } from 'react';
// import { Socket } from '../../context/SocketContext';
// import './App.css';Login
// const socket = io('http://localhost:4000')
// console.log('socket',socket);



function Slidenav({title,visibility,setthemeFunc}) {
  // const {socket} = useContext(Socket)
  // // console.log(socket);
  // useEffect(() => {
  //   socket.on('messageJoining',(data)=>{
  //     console.log('data',data.name);
  //   })
  // },)
    console.log('slidee', title, visibility);
    // const sendMessage = () => {
    //   socket.emit('message',{
    //     msg: `Hey, i am ${socket.id}`,
    //     id: socket.id
    //   })
    //   console.log('sne');
    // }
    const tabToComponentMapping = {
      'Files': <Files />,
      'Settings': <Settings setTheme={setthemeFunc}/>,
      'Chat': <ChatBox />,
      'People': <People />,
    }
  return (
    <div className={`slideNav ${!visibility && 'd-none'}`}>
        {/* <h3>{title}</h3> */}
        {/* <button onClick={sendMessage}>
          SendMessage
        </button> */}
        {tabToComponentMapping[title]}
    </div>
  )
}

export default Slidenav