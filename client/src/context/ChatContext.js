import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket } from './SocketContext'

const Chats = createContext({})
function ChatProvider({children}) {
    const {socket} = useContext(Socket)
    
    const [messages, setmessages] = useState([])
    useEffect(() => {
        // console.log('asdasd');
        const reveiveMessage = (messageData)=>{
          messageData.self = false
          // const dataF = [...messagesFromContext,messageData]
          // console.log('MessageList from context after Received', messages);
          setmessages([...messages,messageData])
        }
        console.log('messages in uft ctx',messages);
        socket.on('messageResponse',reveiveMessage)
        return ()=>{
          // console.log('off...');
          socket.off('messageResonse',reveiveMessage)
        }
    }, [messages])
    return (
        <Chats.Provider value={{messages,setmessages}}>
            {children}
        </Chats.Provider>
    )
}

export default ChatProvider
export {Chats}