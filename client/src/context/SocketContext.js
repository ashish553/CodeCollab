import React, { createContext, useEffect, useState } from 'react'

const Socket = createContext(null)

function SocketContext({children}) {

    
    const [socket, setsocket] = useState(null)
    const [clientList,setClientList] = useState([])
    const [currentUser,setCurrentUser] = useState({})
    useEffect(() => {
        if(socket){
            const listUpdate = (data) => {
                console.log('dataupdate list',data);
                setClientList([...data.connectedClientList])
              }
              socket.on('clientListUpdate',listUpdate)
              return ()=>{
                socket.off('clientListUpdate',listUpdate)
              }
        }
      },[socket])
    return (
        <Socket.Provider value={{socket,setsocket,clientList,setClientList,currentUser,setCurrentUser}}>
            {children}
        </Socket.Provider>
  )
}

export default SocketContext
export {Socket}