import { createContext, useState } from "react";
import React from 'react'

const FileContext = createContext()

function FileContextProvider({children}) {
    const [filesData, setfilesData] = useState({
        filesList: {
          'initialFile': {
            "value": "asdasd",
            "fileName": "Initial"
          },
        }, //{fileId: {fieldata}}
        currentFile: {
          fileId: 'initialFile',
          value: "asdasd",
          fileName: "Initial"
        }, //{filedata}
    })
  return (
    <FileContext.Provider value={{filesData, setfilesData}}>
        {children}
    </FileContext.Provider>
  )
}

export default FileContextProvider
export {FileContext}