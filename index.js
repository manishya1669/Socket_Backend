const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
app.use(cors());

io.on("connection",(socket)=>{
    console.log("connnected easily",socket.id);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log("User JoinedRoom",socket.id,data);
    });
    socket.on("send_message",(data)=>{
        console.log(data.message);
        io.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect",()=>{
        console.log("User Disconected",socket.id);
    })

});




server.listen(3001,()=>{
    console.log("listenin on port",3001);
});


