const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
app.use(cors())
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "https://chat-app-test-kappa.vercel.app/",
      methods: ["GET", "POST"],
    },
  });
app.get("/",(req,res)=>{
    res.json({succes:true})
})
io.on("connection",(socket)=>{
    console.log("New connection-"+socket.id)
    socket.on("join-room",room=>{
        socket.join(room)
    })
    socket.on("send-message",message=>{
        console.log(message)
        socket.to(message.room).emit("receive-message",message)
        })
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
})
server.listen(3001, () => {
    console.log("SERVER RUNNING");
  });
