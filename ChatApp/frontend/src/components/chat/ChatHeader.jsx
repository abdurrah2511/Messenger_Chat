import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../common/Avatar";
import getSender from "../../utils/getSender";

const ChatHeader = () => {
  const { selectedChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  if (!selectedChat) return null;

  const name = selectedChat.isGroupChat
    ? selectedChat.chatName
    : getSender(user, selectedChat.users);

  return (
    <div className="chat-header">
      <div className="chat-header-inner">
        <Avatar name={name} />
        <div className="chat-header-info">
          <h2 className="chat-title">{name}</h2>
          <p className="chat-sub">{selectedChat.isGroupChat ? `${selectedChat.users.length} members` : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
