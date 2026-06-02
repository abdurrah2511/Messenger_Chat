import {
  handleSetup,
  handleJoinChat,
  handleTyping,
  handleStopTyping,
  handleNewMessage,
  handleDisconnect,
} from "./events.js";

const onlineUsers = new Map();

const socketHandler = (io)=>{

  io.on("connection",(socket)=>{

    console.log("CONNECTED:",socket.id);

    socket.on(
      "setup",
      (userId)=>handleSetup(io,socket,userId,onlineUsers)
    );

    socket.on(
      "join chat",
      (room)=>handleJoinChat(socket,room)
    );

    socket.on(
      "typing",
      (room)=>handleTyping(socket,room)
    );

    socket.on(
      "stop typing",
      (room)=>handleStopTyping(socket,room)
    );

    socket.on(
      "new message",
      (message)=>
        handleNewMessage(io,socket,message,onlineUsers)
    );

    socket.on(
      "disconnect",
      ()=>handleDisconnect(io,socket,onlineUsers)
    );

  });

};

export default socketHandler;