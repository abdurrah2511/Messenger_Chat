import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../common/Avatar";
import AddUsersModal from "./AddUsersModal";

const GroupInfo = () => {
  const { selectedChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  if (!selectedChat?.isGroupChat) return null;

  const isAdmin = selectedChat.groupAdmin?._id === user._id;

  return (
    <div className="panel">
      <div className="panel-card">
        <div className="panel-head">
          <div className="panel-title">
            <Avatar name={selectedChat.chatName} />
            <div>
              <h2 className="title">{selectedChat.chatName}</h2>
              <p className="muted">Group chat with {selectedChat.users.length} members</p>
            </div>
          </div>

          <div className="tags">
            <span className="badge muted">{selectedChat.isGroupChat ? 'Group' : 'Direct'}</span>
            {isAdmin && <span className="badge muted">Admin</span>}
          </div>
        </div>

        <div className="members-card">
          <h3 className="muted small">Members</h3>
          <div className="members-list">
            {selectedChat.users.map((member) => (
              <div key={member._id} className="member-item">
                <Avatar name={member.name} />
                <div className="member-body">
                  <p className="member-name">{member.name}</p>
                  <p className="muted tiny">{member.email || 'No email'}</p>
                </div>
                {selectedChat.groupAdmin?._id === member._id && <span className="badge">Admin</span>}
              </div>
            ))}
          </div>
        </div>

        {isAdmin && <button onClick={() => setShow(true)} className="btn btn-accent">Add Members</button>}
      </div>

      {show && <AddUsersModal users={selectedChat.users} chatId={selectedChat._id} onClose={() => setShow(false)} />}
    </div>
  );
};

export default GroupInfo;
