const express = require('express');
const app = express();
const PORT = 4000;
const http = require('http').createServer(app);
const cors = require('cors');

app.use(cors())

const {Server} = require('socket.io')
const socketIO = new Server(http,{
    cors: '*'
})
let roomClients = {}
let currentFilesData = {}
const initialData = {
  filesList: {
    'initialFile': {
      "value": "asdasd",
      "fileName": "Initial"
    },
  }, //{fileId: {fieldata}}
  currentFile: {
    fileId: 'initialFile',
    value: "asdasd",
    fileName: "Initial"
  }, //{filedata}
}
let roomIdList = []

socketIO.on('connection',async (socket)=>{
    // console.log('Connected with Socket', socket.id);
    
    const userSocketId = socket.id
    let roomId = ''
    let username = ''
    socket.on('join',async(data)=>{
      
      // // console.log('Socket join listen: ',data);
      username = data.username
      roomId = data.roomId
      socket.join(data.roomId)
      if(!Object.keys(roomClients).includes(roomId)) {
        // console.log(Object.keys(roomClients));
        Object.assign(roomClients, {[roomId]: []})
      }
      roomClients[roomId].push({userSocketId,username})
      // console.log(roomClients);
      socketIO.to(roomId).emit('newClientJoined',{
        connectedClientList: roomClients[roomId]
      })

      // roomIdList = Object.keys(roomClients)
      
      if(roomIdList.includes(roomId)){
        console.log('inside alredy exist room');
        console.log('emmiting current files data', currentFilesData[roomId]);
        socketIO.to(roomId).emit('currentFilesData',currentFilesData[roomId])

      } else {
        currentFilesData[roomId] = initialData
        
        console.log('currentFilesData from server', currentFilesData);
        socketIO.to(roomId).emit('currentFilesData',currentFilesData[roomId])
      }

      roomIdList.push(roomId)

    })

    socket.on('message',(message)=>{
      // console.log('messageData from client',message);
      // console.log('roomId',roomId);
      message.senderName = username
      socket.to(roomId).emit('messageResponse',message)
    })

    socket.on('leaveRoom',(data)=>{
      roomClients[roomId] = roomClients[roomId]?.filter(eachUser=>eachUser.userSocketId!=data.socketID)
      socket.to(roomId).emit('clientListUpdate',{connectedClientList: roomClients[roomId]})
    })
    socket.on('disconnect',()=>{
      // console.log('Disconnected',socket.id);
      roomClients[roomId] = roomClients[roomId]?.filter(eachUser=>eachUser.userSocketId!=socket.id)
      // console.log(roomClients);
      socket.to(roomId).emit('clientListUpdate',{connectedClientList: roomClients[roomId]})
    })
    socket.on('filesUpdate',(filesData)=>{
      // console.log(filesData);
      currentFilesData[roomId] = filesData
      socket.to(roomId).emit('filesUpdate',filesData)
    }) //fileDataUpdate
    socket.on('filesUpdateDelete',(filesData)=>{
      // console.log(filesData);
      currentFilesData[roomId] = filesData
      socket.to(roomId).emit('filesUpdateDelete',filesData)
    }) //fileDataUpdate
    socket.on('fileDelete',(filesData)=>{
      // console.log(filesData);
      currentFilesData[roomId] = filesData
      socket.to(roomId).emit('fileDelete',filesData)
    }) //fileDataUpdate
    socket.on('fileDataUpdate',(filesData)=>{
      // console.log(filesData);
      currentFilesData[roomId] = filesData
      socket.to(roomId).emit('fileDataUpdate',filesData)
    }) //fileDataUpdate
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  // console.log(`Server listening on ${PORT}`);
});