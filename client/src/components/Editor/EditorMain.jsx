import React from 'react'
import Editor from "./Editor";
import SlideContextProvider from "../../context/SlideContext";
import TabContextProvider from "../../context/TabContext";
import ChatProvider from '../../context/ChatContext';


function EditorMain() {
  return (
    // <SocketProvider>Chats
    <ChatProvider>
      <TabContextProvider>
        <SlideContextProvider>
          <Editor />
        </SlideContextProvider>
      </TabContextProvider>
    </ChatProvider>
    // {/* // </SocketProvider> */}
  )
}

export default EditorMain