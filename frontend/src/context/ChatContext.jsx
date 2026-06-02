/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
