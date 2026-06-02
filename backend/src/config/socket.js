import { Server } from "socket.io";
import socketHandler from "../socket/socketHandler.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  socketHandler(io);

  return io;
};