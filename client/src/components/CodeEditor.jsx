import React, { useContext } from 'react'
// import { UnControlled as CodeMirror } from "react-codemirror2";
import CodeMirror from '@uiw/react-codemirror';
// import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { aura } from '@uiw/codemirror-themes-all'
import { langs } from '@uiw/codemirror-extensions-langs';
import {FileContext} from '../context/FileContext';

function CodeEditor() {

    const {filesData,setfilesData} = useContext(FileContext)
    console.log('filesData',filesData);

    
    const onChange = (value) => {
        setfilesData(
            {
                ...filesData,
                filesList: {...filesData.filesList,[filesData.currentFile.fileId]: {value: value}},
                currentFile:{
                    ...filesData.currentFile,
                    value: value
                  }
            }
        )
    }

    return <CodeMirror
                value={filesData.currentFile.value}
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