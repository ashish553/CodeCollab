import React, { createContext, useState } from 'react'

const Chats = createContext({})

function ChatProvider({children}) {
    const [messages, setmessages] = useState([])
    return (
        <Chats.Provider value={{messages,setmessages}}>
            {children}
        </Chats.Provider>
    )
}

export default ChatProvider
export {Chats}