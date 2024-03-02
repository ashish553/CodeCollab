import { useContext, useEffect, useState } from 'react';
import '../assets/scss/Login.scss';
import { io } from 'socket.io-client';
import { Socket } from '../context/SocketContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const {socket,setsocket,clientList,setClientList,setCurrentUser} = useContext(Socket)
    const [username, setusername] = useState(null)
    const [roomId, setroomId] = useState(null)
    const navigate = useNavigate()

    // const [sockett, setsockett] = useState(null)

    // useEffect(() => {
    //   console.log(socket)
    
    // //   return () => {
    // //     socket?.close()
    // //   }
    // }, [socket])
    
    const joinRoom = async () => {
        let socketID = ''
        const socketLocal = await io('http://localhost:4000')
        socketLocal.on('connect', () => {
            socketID = socketLocal.id
            console.log('socketID---',socketID);
        });
        // setsocket(socketLocal)
        socketLocal.emit('join',{
            username,
            roomId
        })
        setCurrentUser({...{
            username,
            socketID: 'randomshit'
        }})
        socketLocal.on('newClientJoined',(data)=>{
            console.log(data);
            setClientList([...data.connectedClientList])
        })
        setsocket(socketLocal)
        // setsockett(socket)
        console.log('join');
        navigate('/editor')
        
        
        
        // setRoomId(roomId)
    }

    return(
        <>
            <div className="d-flex flex-column loginContainer align-items-center">
                <h1 className='display-4 titillium-web-extralight'>CodeCollab</h1>
                <p className='mb-3 tagLine'>Code, Chat, Collaborate.</p>
                <div className="inputFields mt-4">
                    <div className="inputRoomId">
                        <input type="text" placeholder="ROOM ID" onChange={(e)=>{
                            setroomId(e.target.value)
                        }}/>
                    </div>
                    <div className="inputUsername mt-3">
                        <input type="text" placeholder="USERNAME" onChange={(e)=>{
                            setusername(e.target.value)
                        }}/>
                    </div>
                    <button className='mt-4' onClick={joinRoom}><strong>Join</strong></button>
                </div>
                    <a href="#" className='mt-3'>Generate Unique Room ID</a>
            </div>
        </>
    )
}

export default Login