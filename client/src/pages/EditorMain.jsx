import React, { useContext, useEffect } from 'react'
import Editor from "../components/Editor/Editor";
import SlideContextProvider from "../context/SlideContext";
import TabContextProvider from "../context/TabContext";
import ChatProvider from '../context/ChatContext';
import FileContextProvider from '../context/FileContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SettingContextProvider from "../context/SettingContext";
import { Socket } from '../context/SocketContext';
import Loading from '../components/Loading/Loading';

function EditorMain() {
  const {socket} = useContext(Socket)
  console.log('s:',socket);
  const state = useLocation().state
  const { roomID } = useParams()
  console.log(roomID);
  const navigate = useNavigate()
  useEffect(() => {
    if (!state?.homepage || !socket) {
      navigate('/', {
        state: { roomID }
      })
    }
  }, [socket])

  return (
    // <SocketProvider>Chats
    socket?.connected ? <FileContextProvider>
      <SettingContextProvider>
        <ChatProvider>
          <TabContextProvider>
            <SlideContextProvider>
              {/* <FileContextProvider> */}
              <Editor />
              {/* </FileContextProvider> */}
            </SlideContextProvider>
          </TabContextProvider>
        </ChatProvider>
      </SettingContextProvider>
    </FileContextProvider> : <Loading />
    // {/* // </SocketProvider> */}
  )
}

export default EditorMain