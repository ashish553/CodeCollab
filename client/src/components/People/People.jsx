import React, { useContext, useEffect } from 'react'
import '../../assets/scss/People.scss'
import { Socket } from '../../context/SocketContext'
import { useNavigate } from 'react-router-dom'

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
      <button onClick={leaveRoom}>Leave</button>
    </div>
    </>
  )
}

export default People