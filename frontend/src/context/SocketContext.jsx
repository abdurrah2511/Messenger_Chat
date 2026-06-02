/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket] = useState(() => io("http://localhost:5000"));
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    return () => {
      socket.off("getOnlineUsers");
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      socket.emit("setup", user._id);
    }

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
