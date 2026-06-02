import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";

import { fetchChats, resetUnread } from "../../api/chatApi";
import UserSearch from "./UserSearch";
import CreateGroupModal from "../group/CreateGroupModal";
import Avatar from "../common/Avatar";
import Loader from "../common/Loader";
import getSender from "../../utils/getSender";

const ChatSidebar = () => {
  const { chats, setChats, selectedChat, setSelectedChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const { socket, onlineUsers } = useContext(SocketContext);

  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    const loadChats = async () => {
      setLoading(true);

      try {
        const { data } = await fetchChats();
        setChats(data);
      } catch (error) {
        console.error("Failed to load chats", error);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [setChats]);

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);

    if (socket) {
      socket.emit("join chat", chat._id);
    }

    if (getUnreadCount(chat) > 0) {
      try {
        await resetUnread(chat._id);
      } catch (error) {
        console.error("Failed to reset unread count", error);
      }

      setChats((prev) =>
        prev.map((item) =>
          item._id === chat._id
            ? {
                ...item,
                unreadCount: {
                  ...item.unreadCount,
                  [user._id?.toString()]: 0,
                },
              }
            : item
        )
      );
    }
  };

  const handleChatCreated = (chat) => {
    setChats((prev) => [chat, ...prev.filter((item) => item._id !== chat._id)]);
    setSelectedChat(chat);

    if (socket) {
      socket.emit("join chat", chat._id);
    }

    setShowCreate(false);
  };

  const getUnreadCount = (chat) => {
    if (!chat?.unreadCount) return 0;
    return chat.unreadCount[user._id] || chat.unreadCount[user._id?.toString()] || 0;
  };

  const getChatLabel = (chat) =>
    chat.isGroupChat ? chat.chatName : getSender(user, chat.users);

  return (
    <div className="chat-sidebar">
      <div className="sidebar-top">
        <div className="sidebar-head">
          <div>
            <p className="muted small">Messaging</p>
            <h2 className="sidebar-title">Chats</h2>
          </div>
          <div className="profile-link">
            <Link to="/profile">
              <div className="profile-avatar">
                <p className="profile-name">{user?.name}</p>
              </div>
            </Link>
          </div>
        </div>
        <p className="muted help">Find friends, manage groups, and keep conversations flowing.</p>

        <div className="sidebar-actions">
          <Link to="/">
            <button className="btn btn-accent">Chats</button>
          </Link>
        </div>

        <div className="mt-4">
          <UserSearch onChatCreated={handleChatCreated} />
        </div>
      </div>

      <div className="sidebar-list">
        {loading ? (
          <div className="p-4">
            <Loader />
          </div>
        ) : chats.length === 0 ? (
          <div className="empty muted">No chats yet. Search users to start messaging.</div>
        ) : (
          chats.map((chat) => {
            const secondUser = chat.users.find((u) => u._id !== user._id);
            const isOnline = secondUser && onlineUsers.includes(secondUser._id);

            return (
              <button
                key={chat._id}
                onClick={() => handleSelectChat(chat)}
                className={`chat-item ${selectedChat?._id === chat._id ? 'selected' : ''}`}
              >
                <div className="chat-item-inner">
                  <Avatar name={getChatLabel(chat)} />
                  <div className="chat-item-body">
                    <div className="chat-item-top">
                      <p className="chat-item-title">{getChatLabel(chat)}</p>
                      {getUnreadCount(chat) > 0 && (
                        <span className="badge">{getUnreadCount(chat)}</span>
                      )}
                    </div>
                    <p className="chat-item-sub muted">
                      {chat.latestMessage
                        ? `${chat.latestMessage.sender?.name || "Someone"}: ${chat.latestMessage.content}`
                        : "No messages yet"}
                    </p>
                  </div>
                </div>
                <div className="chat-item-meta muted">
                  <span>{chat.isGroupChat ? `${chat.users.length} members` : isOnline ? "Online" : "Offline"}</span>
                  <span>{chat.latestMessage ? new Date(chat.latestMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</span>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="sidebar-bottom">
        <button onClick={() => setShowCreate(true)} className="btn btn-block btn-accent">+ Create Group</button>
      </div>

      {showCreate && (
        <CreateGroupModal onCreated={handleChatCreated} onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
};

export default ChatSidebar;
