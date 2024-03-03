// ```
// Right now filename is hardcoded, it should be changes to state for persistent filename
// ```

import React, { useContext, useState } from 'react'
import '../../assets/scss/Files.scss'
import {FileContext} from '../../context/FileContext';

function Files() {
  const {filesData, setfilesData} = useContext(FileContext)
  const [fileListLocal, setfileListLocal] = useState([])

  const fileSelect = (id) => {
      setfilesData(
        {
          ...filesData,
          currentFile:{
            fileId: id,
            value: filesData.filesList[id].value
          }
        }
      )

  }
  const createNewFile = () => {
    const fileIdGen = `${Date.now()}`
    setfileListLocal([...fileListLocal,{
      fileName: 'Untitled',
      editable: true,
      fileId: fileIdGen

    }])
    setfilesData({
      ...filesData,
      filesList: {...filesData.filesList, [fileIdGen]: {value: ''}},
      currentFile:{
        fileId: fileIdGen,
        value: ''
      }
    })
  }

  return (
    <div className='filesContainer d-flex justify-content-between'>
      <div>
        <div className="title">
          Files
        </div>
        <div className="filesList">
          {
            
            Object.keys(filesData.filesList)?.map((eachFileId,index)=>{
              return(
                <div className="fileItem" id={eachFileId} onClick={(e)=>{
                  fileSelect(e.target.id)
                }} contentEditable={true} key={eachFileId}>
                  {'Untitled'}
                </div>  
              )
            })
          }
        </div>
      </div>
      <div className="fileOps">
        <button className="newFile" onClick={createNewFile}>
          New File
        </button>
      </div>
    </div>
  )
}

export default Files