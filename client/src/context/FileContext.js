import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { Socket } from "./SocketContext";
// import { Socket } from "./SocketContext";

const FileContext = createContext()

function FileContextProvider({children}) {
    const [filesData, setfilesData] = useState({})
    // const {socket} = useContext(Socket)
    // const {socket} = useContext(Socket)

    // useEffect(() => {
    //   if(socket){
    //     console.log('sahdkhqwoiudhqwiodhoqiwhdioqwhdoiwh');
    //     socket.emit('reqFetchFilesData',(data)=>{})
    //   }
    // }, [
    //   socket
    // ])
    
  return (
    <FileContext.Provider value={{filesData, setfilesData}}>
        {children}
    </FileContext.Provider>
  )
}

export default FileContextProvider
export {FileContext}