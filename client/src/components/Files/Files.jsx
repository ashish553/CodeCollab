// ```
// Right now filename is hardcoded, it should be changes to state for persistent filename
// ```

import React, { useContext, useState } from 'react'
import '../../assets/scss/Files.scss'
import {FileContext} from '../../context/FileContext';
import trash from '../../assets/images/trash.svg'
import { Socket } from '../../context/SocketContext';
import { useEffect } from 'react';
import { getIconForFile } from 'vscode-icons-js';
import {Icon} from '@iconify/react'
import FileSaver, {saveAs} from 'file-saver'
import JSZip from "jszip"

function Files() {
  const {filesData, setfilesData} = useContext(FileContext)

  const {socket} = useContext(Socket)

  // const [fileName, setfileName] = useState('')
  const downloadAllFiles = (filesList) => {
    const zip = new JSZip()
    for (const fileId in filesList) {
      const blobFile = new Blob([filesList[fileId].value], {
        type: "text/plain;charset=utf-8",
      })
      // console.log(blobFile);
      zip.file(filesList[fileId].fileName, blobFile)
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "CodeCollab-Files.zip")
    })
}

  const downloadFile = ({value,fileName}) => {
    const file = new Blob([value], {type: "text/plain;charset=utf-8"})
    saveAs(file, fileName)
  }
  const getFileName = (filename) => 'vscode-icons:'+getIconForFile(filename).replace(/_/g,'-').split('.')[0]

  const fileSelect = (id) => {
      setfilesData(
        {
          ...filesData,
          currentFile:{
            fileId: id,
            value: filesData.filesList[id].value,
            fileName: filesData.filesList[id].fileName
          }
        }
      )

  }
  const createNewFile = () => {
    const fileIdGen = `${Date.now()}`

    setfilesData({
      ...filesData,
      filesList: {...filesData.filesList, [fileIdGen]: {value: '', fileName: 'Untitled'}},
      currentFile:{
        fileId: fileIdGen,
        value: '',
        fileName: 'Untitled',
      }
    })
    socket.emit('filesUpdate',{
      ...filesData,
      filesList: {...filesData.filesList, [fileIdGen]: {value: '', fileName: 'Untitled'}},
      currentFile:{
        fileId: fileIdGen,
        value: '',
        fileName: 'Untitled',
      }
    })
    console.log('filecreated',filesData);
    
  }
  const deleteFile = (fileId) => {
    if(filesData?.currentFile?.fileId===fileId){
      const tempFileData = filesData
      // console.log('files data in delte func', filesData);
      // console.log('before temp',tempFileData);
      delete tempFileData.filesList[fileId]
      const firstFileId = Object.keys(tempFileData.filesList)[0]
      // console.log('temp',tempFileData);
      setfilesData(
        {
          filesList: tempFileData.filesList,
          ...(tempFileData?.filesList[firstFileId]?.value && {currentFile:{
            fileId: firstFileId,
            value: tempFileData?.filesList[firstFileId]?.value,
            fileName: tempFileData?.filesList[firstFileId]?.fileName,
          }})
        }
      )
      socket.emit('filesUpdateDelete',{
        filesList: tempFileData.filesList,
        ...(tempFileData?.filesList[firstFileId]?.value && {currentFile:{
          fileId: firstFileId,
          value: tempFileData?.filesList[firstFileId]?.value,
          fileName: tempFileData?.filesList[firstFileId]?.fileName,
        }}),
      })
      console.log('fileDeleted',{
        filesList: tempFileData.filesList,
        ...(tempFileData?.filesList[firstFileId]?.value && {currentFile:{
          fileId: firstFileId,
          value: tempFileData?.filesList[firstFileId]?.value,
          fileName: tempFileData?.filesList[firstFileId]?.fileName,
        }}),
        isDeleted: true
      });
      // delete filesData.filesList[fileId]
    }else{
      const tempFileData = {...filesData}
      delete tempFileData.filesList[fileId]
      setfilesData(
        {
          ...tempFileData
        }
      )
      socket.emit('filesUpdate',{
        ...tempFileData
      })
      console.log('filedeleted',tempFileData);
    }
  }

  return (
    <div className='sidebarSectionContainer filesContainer d-flex justify-content-between'>
      <div className='fileDetails'>
        <div className="title">
          Files {filesData?.filesList && '('+Object.keys(filesData.filesList)?.length+')'}
        </div>
        <div className="filesList custom-scroll">
          {
            
            filesData?.filesList && Object.keys(filesData.filesList)?.map((eachFileId,index)=>{
              return(
                <div 
                  id={eachFileId}
                  key={eachFileId}
                  className={`d-flex align-items-center file ${filesData?.currentFile?.fileId===eachFileId ? 'file-active' : ''}`}
                  onClick={(e)=>{
                    // e.stopPropagation()
                    // console.log(e.target.id.split('-')[0]);
                    // console.log(e.target.id);
                    fileSelect(eachFileId)
                  }}
                >
                  <Icon
                    icon={getFileName(filesData.filesList[eachFileId].fileName) || 'mdi:file-outline'}
                    fontSize={25}
                    className='mr-2'
                    // onClick={(e)=>{
                    //   e.stopPropagation()
                    //   // console.log(e.target.id.split('-')[0]);
                    //   // console.log(e.target.id);
                    //   // fileSelect(e.target.id.split('-')[0])
                    // }}
                  />
                  <input
                    className="fileItem"
                    id={`${eachFileId}-fileID`}
                    onChange={(e)=>{
                      // e.stopPropagation()
                      // cosole.log(typeof e.stopPropagation())
                      // console.log('e.target.value',e.target.value);
                      const newFileData = {
                        filesList: {
                          ...filesData.filesList, 
                          [eachFileId]: {...filesData.filesList[eachFileId], fileName: e.target.value}
                        },
                        currentFile:{
                          ...filesData.currentFile,
                          fileName: e.target.value,
                        }
                      }
                      setfilesData({...newFileData})
                      socket.emit('filesUpdate',{...newFileData})
                    // setfileName(e.target.value)
                    }}
                    value={filesData.filesList[eachFileId].fileName}
                  />
                  {/* <button> */}
                    <img src={trash} alt="Delete icon" className="fileDelete" onClick={(e)=>{
                      e.stopPropagation()
                      deleteFile(eachFileId)
                    }}/>
                  {/* </button> */}
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
        <button className="newFile" onClick={()=>{
          downloadFile(filesData.currentFile)
        }}>
          Download File
        </button>
        <button className="newFile" onClick={()=>{
          downloadAllFiles(filesData.filesList)
        }}>
          Download all files
        </button>
      </div>
    </div>
  )
}

export default Files