import { useState, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const MessageInput = ({ sendMessage, socket }) => {
  const [text, setText] = useState("");
  const { selectedChat } = useContext(ChatContext);

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  const handleTyping = (e) => {
    setText(e.target.value);

    if (!selectedChat || !socket) return;

    socket.emit("typing", selectedChat._id);

    setTimeout(() => {
      socket.emit("stop typing", selectedChat._id);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input card">
      <div>
        <textarea
          value={text}
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          rows={1}
          className="input"
          placeholder="Type a message..."
        />

        <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
          <button onClick={handleSend} className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
