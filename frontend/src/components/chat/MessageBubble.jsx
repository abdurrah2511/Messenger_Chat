import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import Avatar from "../common/Avatar";
import SeenStatus from "./SeenStatus";

const MessageBubble = ({ message }) => {
  const { user } = useContext(AuthContext);
  const isMine = message.sender._id === user._id;

  return (
    <div className={`message-row ${isMine ? 'mine' : 'other'}`}>
      {!isMine && (
        <div className="message-avatar">
          <Avatar name={message.sender.name} />
        </div>
      )}

      <div className={`message-bubble ${isMine ? 'bubble-mine' : 'bubble-other'}`}>
        {message.sender?.name && !isMine && (
          <p className="bubble-sender">{message.sender.name}</p>
        )}

        <p className="bubble-content">{message.content}</p>

        <div className="bubble-meta">
          <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {isMine && <SeenStatus message={message} />}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
