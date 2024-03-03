import { createContext, useState } from "react";
import React from 'react'

const FileContext = createContext()

function FileContextProvider({children}) {
    const [filesData, setfilesData] = useState({
        filesList: {}, //{fileId: {fieldata}}
        currentFile: {}, //{filedata}
    })
  return (
    <FileContext.Provider value={{filesData, setfilesData}}>
        {children}
    </FileContext.Provider>
  )
}

export default FileContextProvider
export {FileContext}