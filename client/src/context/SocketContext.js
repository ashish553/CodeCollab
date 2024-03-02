import React, { createContext, useState } from 'react'

const Socket = createContext(null)

function SocketContext({children}) {
    const [socket, setsocket] = useState(null)
    const [clientList,setClientList] = useState([])
    const [currentUser,setCurrentUser] = useState({})
    return (
        <Socket.Provider value={{socket,setsocket,clientList,setClientList,currentUser,setCurrentUser}}>
            {children}
        </Socket.Provider>
  )
}

export default SocketContext
export {Socket}