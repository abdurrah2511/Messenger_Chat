import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const MessageList = ({ messages, typing }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div key={msg._id} ref={scrollRef} className="message-row">
          <MessageBubble message={msg} />
        </div>
      ))}

      {typing && <TypingIndicator />}
    </div>
  );
};

export default MessageList;
