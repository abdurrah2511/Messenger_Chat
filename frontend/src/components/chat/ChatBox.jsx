import { useEffect, useState, useContext } from "react";

import { ChatContext } from "../../context/ChatContext";
import { SocketContext } from "../../context/SocketContext";

import { fetchMessages, sendMessage } from "../../api/chatApi";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatBox = () => {
  const { selectedChat } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedChat) return;

      try {
        setLoading(true);
        const { data } = await fetchMessages(selectedChat._id);
        setMessages(data);
        setLoading(false);
        if (socket) {
          socket.emit("join chat", selectedChat._id);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedChat, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message received", (newMessage) => {
      if (!selectedChat || selectedChat._id !== newMessage.chat._id) return;
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));

    return () => {
      socket.off("message received");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [socket, selectedChat]);

  const handleSendMessage = async (text) => {
    try {
      const { data } = await sendMessage({
        content: text,
        chatId: selectedChat._id,
      });
      setMessages((prev) => [...prev, data]);
      socket.emit("new message", data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedChat) {
    return (
      <div className="chat-empty">Select a chat to start messaging</div>
    );
  }

  return (
    <div className="chat-box">
      <ChatHeader />

      <div style={{ flex: 1, overflow: 'hidden' }}>
        {loading ? (
          <div className="chat-empty">Loading messages...</div>
        ) : (
          <MessageList messages={messages} typing={typing} />
        )}
      </div>

      <MessageInput sendMessage={handleSendMessage} socket={socket} />
    </div>
  );
};

export default ChatBox;
