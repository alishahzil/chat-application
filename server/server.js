const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io= socketIO(server);

app.use(express.static(publicpath));


io.on('connection',(socket)=>{
    console.log("New user is connected");

    socket.emit('newMessage',{
        from : 'Admin',
        text:'Welcome to chat app',
        createAt:new Date().getTime()
    });
    socket.broadcast.emit('newMessage',{
        from :'Admin',
        text:'New user join',
        createdAt: new Date().getTime()
    });


     socket.on('newMessage',(message)=>{
         console.log('createMessage',message);
         io.emit('newMessage',{
             from:message.from,
             text:message.text,
             createAt:new Date().getTime()
         })

     })

    socket.emit('newMessage',{
        from:'server',
        text:'hello from server ',
        createAt:123
    });
    socket.on('disconnect',()=>{
        console.log('User was disconnect');
       });
 
});

server.listen(port,()=>{
    console.log('app is running');
});