import { useContext, useEffect, useState } from 'react';
import '../assets/scss/Login.scss';
import { io } from 'socket.io-client';
import { Socket } from '../context/SocketContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer,toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FileContext } from '../context/FileContext';



const Login = (props) => {

    const {socket,setsocket,clientList,setClientList,setCurrentUser} = useContext(Socket)
    // const {filesData, setfilesData} = useContext(FileContext)
    const [username, setusername] = useState(null)
    const [roomId, setroomId] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        setroomId(location?.state?.roomID)
    }, [])
    useEffect(()=>{
        if(socket){
            let socketID = ''

            socket.on('connect', () => {
                socketID = socket.id
                console.log('socketID---',socket);
            });
            socket.emit('join',{
                username,
                roomId
            })
            setCurrentUser({...{
                username,
                socketID: 'randomshit'
            }})
            let clients = ''
            socket.on('newClientJoined',(data)=>{
                console.log(data);
                clients = data.connectedClientList.length
                setClientList([...data.connectedClientList])
            })
            // socketLocal.on('currentFilesData',(data)=>{
            //     console.log('clietnsnumber', clients);
            //     console.log('files data after joined', data);
            //     setfilesData({...data})
            // })
            // setsocket(socketLocal)
            console.log('join');
            navigate(`/editor/${roomId}`, {state: {
                homepage: true
            }})
        }
    },[socket])
    
    
    const joinRoom = async () => {
        if(!roomId || roomId.length<5) {
            toast.error('ROOM Id must be at least 5 characters long', {
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
        } else {
            // let socketID = ''
            // console.log(process.env.REACT_APP_SOCKET);
            const socketLocal = io(process.env.REACT_APP_SOCKET)
            
            setsocket(socketLocal)
            // console.log('join');
            // navigate(`/editor/${roomId}`, {state: {
            //     homepage: true
            // }})
        }
    }

    return(
        <>
            <div className="d-flex flex-column loginContainer align-items-center">
                <h1 className='display-4 titillium-web-extralight'>CodeCollab</h1>
                <p className='mb-3 tagLine'>Code, Chat, Collaborate.</p>
                <div className="inputFields mt-4">
                    <div className="inputRoomId">
                        <input value={roomId||''} type="text" placeholder="ROOM ID" onChange={(e)=>{
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
            <ToastContainer />
        </>
    )
}

export default Login