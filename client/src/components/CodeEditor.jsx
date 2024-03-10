import React, { useContext } from 'react'
// import { UnControlled as CodeMirror } from "react-codemirror2";
import CodeMirror from '@uiw/react-codemirror';
// import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { aura } from '@uiw/codemirror-themes-all'
import { langs } from '@uiw/codemirror-extensions-langs';
import {FileContext} from '../context/FileContext';
import { Socket } from '../context/SocketContext';
import { useEffect } from 'react';

function CodeEditor() {
    const {socket} = useContext(Socket)
    const {filesData,setfilesData} = useContext(FileContext)

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

    console.log('filesData after',filesData);

    
    
    const onChange = (value) => {
        const data1 = {
            ...filesData,
            filesList: {...filesData.filesList,[filesData.currentFile.fileId]:  {...filesData.filesList[filesData.currentFile.fileId], value: value}},
            currentFile: {...filesData.currentFile, value}
        }
        setfilesData(
            data1
        )
        socket.emit('fileDataUpdate',data1)
    }
    console.log('onchanges',filesData);

    return filesData?.currentFile && <CodeMirror
                value={filesData?.currentFile?.value}
                minHeight="100vh"
                minWidth="100%"
                onChange={onChange}
                extensions={[langs.javascript()]}
                theme={aura}
                style={{
                    fontSize: 16 + "px",
                }} 
            />;
}

export default CodeEditor