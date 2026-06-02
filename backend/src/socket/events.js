
export const handleSetup = (
  io,
  socket,
  userId,
  onlineUsers
)=>{

  onlineUsers.set(userId,socket.id);

  socket.join(userId);

  io.emit(
    "getOnlineUsers",
    Array.from(onlineUsers.keys())
  );

};

export const handleJoinChat = (
  socket,
  room
)=>{

  socket.join(room);

};

export const handleTyping = (
  socket,
  room
)=>{

  socket.to(room).emit("typing");

};

export const handleStopTyping = (
  socket,
  room
)=>{

  socket.to(room).emit("stop typing");

};

export const handleNewMessage = (
  io,
  socket,
  message,
  onlineUsers
)=>{

  const chat = message.chat;

  if(!chat.users) return;

  chat.users.forEach((user)=>{

    const userId = user._id?.toString ? user._id.toString() : user._id;
    const senderId = message.sender?._id?.toString ? message.sender._id.toString() : message.sender._id;

    if (userId === senderId) return;

    const socketId = onlineUsers.get(userId);

    if (socketId) {
      io.to(socketId).emit("message received", message);
    }

  });

};

export const handleDisconnect = (
  io,
  socket,
  onlineUsers
)=>{

  for(const [userId,socketId]
    of onlineUsers.entries()){

    if(socketId===socket.id){

      onlineUsers.delete(userId);

      break;
    }

  }

  io.emit(
    "getOnlineUsers",
    Array.from(onlineUsers.keys())
  );

};