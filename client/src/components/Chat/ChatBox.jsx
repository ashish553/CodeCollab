// Now, context has been setup for common socket in the app when user join room, we have to 
// send, 
// get and 
// show chat messages here

import React, { useContext, useEffect, useState } from 'react'
import '../../assets/scss/ChatBox.scss'
import sendIcon from '../../assets/images/send.svg'
import {Socket} from '../../context/SocketContext'
import Chat from './Chat'
import {Chats} from '../../context/ChatContext'

function ChatBox() {

  const {socket} = useContext(Socket)
  const {messages, setmessages} = useContext(Chats)
  const [message, setmessage] = useState('')
  
  
  const sendMessage = (msg) => {
    const msgData = {
      self: true,
      msg,
      sendTime: new Date().toLocaleTimeString(),
      sendDate: new Date().toLocaleDateString()
    }
    socket.emit('message',msgData)
    console.log('MessageList from context after send', messages);
    setmessages(prev=>{
      return [...prev,msgData]
    })
    setmessage('')
  }
  // const receiveMessage = () => {
  //   socket.on('messageResponse',(messageData)=>{
  //     console.log('messageData from Server',messageData);
  //     messageData.self = false
  //     // setMessageReceived(messageData)
  //     setChatList([...chatList,messageData])
  //   })
  // }
  useEffect(() => {
    console.log('asdasd');
    const reveiveMessage = (messageData)=>{
      messageData.self = false
      // const dataF = [...messagesFromContext,messageData]
      console.log('MessageList from context after Received', messages);
      setmessages([...messages,messageData])
    }
    socket.on('messageResponse',reveiveMessage)
    return ()=>{
      console.log('off...');
      socket.off('messageResonse',reveiveMessage)
    }
  }, [messages])
  // console.log(messageReceived);
  

  return (
    <div className="chatbox">
        <div className="chats custom-scroll">
          {/* Chatsss... */}
          {
            messages?.map((msg,index)=>{
              return(
                <Chat key={index} {...msg}/>
              )
            })
          }
          {/* <div className="msg usermsg">
            <div className="msgDetails d-flex justify-content-between">
              <p className="userName mb-0"><strong>Ashish</strong></p>
              <p className="time mb-0">11:30</p>
            </div>
            <p className='msgContent mb-0'>Hi i am User</p>
          </div>
          <div className="msg selfmsg">
            <div className="msgDetails d-flex justify-content-between">
              <p className="userName mb-0"><strong>Ashish</strong></p>
              <p className="time mb-0">11:30</p>
            </div>
            <p className='msgContent mb-0'>Hi i am User</p>
          </div> */}
        </div>
        <div className="chatinput d-flex justify-content-space-between">
          <input type="text" onChange={(e)=>{
            setmessage(e.target.value)
          }} value={message} />
          <button onClick={()=>{
            sendMessage(message)
          }}>
            <img src={sendIcon} alt="Message send icon " />
          </button>
        </div>
    </div>
  )
}

export default ChatBox  