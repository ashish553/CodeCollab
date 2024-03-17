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
    // console.log('onchanges',filesData);

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