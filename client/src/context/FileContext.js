import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { Socket } from "./SocketContext";
// import { Socket } from "./SocketContext";

const FileContext = createContext()

function FileContextProvider({children}) {
    const {socket} = useContext(Socket)

    
    const [filesData, setfilesData] = useState({})
    // const {socket} = useContext(Socket)
    useEffect(()=>{
      socket.on('currentFilesData',(data)=>{
          // console.log('clietnsnumber', clients);
          console.log('files data after joined', data);
          setfilesData({...data})
      })
    },[socket])
    useEffect(() => {
      const fileUpdated = (data) => {
        // 
        console.log('filesdata from socket:', data);

          console.log('isupdated');
          setfilesData({
            ...filesData,
            filesList: data.filesList,
            currentFile: data.currentFile
          })
        // }
        // setfilesData()
      }
      socket.on('filesUpdate',fileUpdated)
    
      return () => {
        socket.off('filesUpdate',fileUpdated)
        console.log('filesUpdate off');
      }
    }, [socket])

    useEffect(() => {
      const fileUpdatedDeleted = (data) => {
        // 
        console.log('filesdata from socket:', data);
        // if(data.isDeleted){
          console.log('isdeleted',data);
          setfilesData({
            ...(Object.keys(data.filesList).length && filesData),
            filesList: data.filesList
          })
          console.log('deleted rendr',{
            ...(Object.keys(data.filesList).length && filesData),
            filesList: data.filesList
          });
      }
      console.log('filedata in deleted part',filesData);

      socket.on('filesUpdateDelete',fileUpdatedDeleted)
    
      return () => {
        socket.off('filesUpdateDelete',fileUpdatedDeleted)
        console.log('filesUpdate off');
      }
    }, [filesData])


    useEffect(() => {
      const fileUpdated = (data) => {
      //   console.log('filesdata from socket codeone:', data);
          console.log('filedata right now in editormirror', filesData);
          setfilesData({...filesData, filesList: data.filesList, currentFile: {
              ...filesData.currentFile,
              value: data.filesList[filesData.currentFile.fileId].value
          }})
        // setfilesData()
      }
      socket.on('fileDataUpdate',fileUpdated)
    
      return () => {
        socket.off('fileDataUpdate',fileUpdated)
      }
    }, [filesData])
    
  return (
    <FileContext.Provider value={{filesData, setfilesData}}>
        {children}
    </FileContext.Provider>
  )
}

export default FileContextProvider
export {FileContext}