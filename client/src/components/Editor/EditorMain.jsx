import React, { useEffect } from 'react'
import Editor from "./Editor";
import SlideContextProvider from "../../context/SlideContext";
import TabContextProvider from "../../context/TabContext";
import ChatProvider from '../../context/ChatContext';
import FileContextProvider from '../../context/FileContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


function EditorMain() {
  const state = useLocation().state
  const {roomID} = useParams()
  console.log(roomID);
  const navigate = useNavigate()
  useEffect(() => {
    if(!state?.homepage){
      navigate('/',{
        state: {roomID}
      })
    }
  }, [])
  
  return (
    // <SocketProvider>Chats
    <ChatProvider>
      <TabContextProvider>
        <SlideContextProvider>
          {/* <FileContextProvider> */}
            <Editor />
          {/* </FileContextProvider> */}
        </SlideContextProvider>
      </TabContextProvider>
    </ChatProvider>
    // {/* // </SocketProvider> */}
  )
}

export default EditorMain