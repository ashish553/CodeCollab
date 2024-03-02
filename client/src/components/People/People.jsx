import React, { useContext, useEffect } from 'react'
import '../../assets/scss/People.scss'
import { Socket } from '../../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import {ToastContainer, toast, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function People() {
  const navigate = useNavigate()
  const {clientList,setClientList,currentUser,socket} = useContext(Socket)
  useEffect(() => {
    socket.on('clientListUpdate',(data)=>{
      console.log('dataupdate list',data);
      setClientList([...data.connectedClientList])
    })
    return ()=>{
      socket.off()
    }
  },[])
  
  const leaveRoom = () => {
    console.log('currentUser',socket.id);
    socket.emit('leaveRoom',{username: currentUser.username,socketID: socket.id})
    navigate('/')
  }
  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Copied to clipboard !",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  // console.log(clientList);
  return (
    <>
    <div className="people">
      <div className="title">Users</div>
      <div className='peopleContainer'>
        <div className="row">
        {
          clientList?.map((client,index)=>{
            return(
                <div className="col col-6" key={index}>
                  <div className="eachUserItem d-flex flex-column align-items-center">
                    <div className="userIcon d-flex justify-content-center align-items-center">
                      {client.username.substring(0,2)}
                      <div className="online" />
                    </div>
                    <p className='mt-2'>{client.username}</p>
                  </div>
                </div>
            )
          })
        }
        </div>
      </div>
      <div className="d-flex flex-column peopleButtonContainer">
        <button onClick={copyURL} className="copyButton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
          </svg>
        </button>
        <button onClick={leaveRoom} className="leaveButton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-down-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M7.364 12.5a.5.5 0 0 0 .5.5H14.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 14.5 0h-10A1.5 1.5 0 0 0 3 1.5v6.636a.5.5 0 1 0 1 0V1.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H7.864a.5.5 0 0 0-.5.5"/>
            <path fillRule="evenodd" d="M0 15.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H1.707l8.147-8.146a.5.5 0 0 0-.708-.708L1 14.293V10.5a.5.5 0 0 0-1 0z"/>
          </svg>
        </button>
        <ToastContainer />
      </div>
    </div>
    </>
  )
}

export default People