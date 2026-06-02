import { useContext } from "react";

import { ChatContext } from "../../context/ChatContext";

import { removeFromGroup } from "../../api/chatApi";

const GroupMember = ({ user, isAdmin }) => {

  const { selectedChat, setSelectedChat } =
    useContext(ChatContext);

  const handleRemove = async () => {
    const { data } = await removeFromGroup({
      chatId: selectedChat._id,
      userId: user._id,
    });

    setSelectedChat(data);
  };

  return (
    <div className="member-row">
      <span className="member-name">{user.name}</span>

      {isAdmin && (
        <button onClick={handleRemove} className="btn btn-ghost">Remove</button>
      )}

    </div>
  );
};

export default GroupMember;