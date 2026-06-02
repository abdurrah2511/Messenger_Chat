import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import Avatar from "../../components/common/Avatar";
import CreateGroupModal from "../../components/group/CreateGroupModal";

const GroupPage = () => {
  const { user } = useContext(AuthContext);
  const { chats } = useContext(ChatContext);

  const groups = chats.filter((chat) => chat.isGroupChat);
  const directChats = chats.filter((chat) => !chat.isGroupChat);

  return (
    <div className="groups-page">
      <div className="container">
        <div className="groups-card">
          <div className="groups-head">
            <div>
              <p className="muted small">Groups</p>
              <h1 className="page-title">Your communities</h1>
              <p className="muted">Manage group chats, invite members, and keep the conversation flowing.</p>
            </div>
            <CreateGroupModal />
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="muted small">Total groups</p>
              <p className="stat-value">{groups.length}</p>
            </div>
            <div className="stat-card">
              <p className="muted small">Direct chats</p>
              <p className="stat-value">{directChats.length}</p>
            </div>
            <div className="stat-card">
              <p className="muted small">Active user</p>
              <p className="stat-value">{user?.name || "Me"}</p>
            </div>
          </div>
        </div>

        <div className="groups-list">
          {groups.length === 0 ? (
            <div className="empty-card">
              <p className="page-sub">No groups yet</p>
              <p className="muted">Create a group to start chatting with multiple contacts in one place.</p>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group._id} className="group-card">
                <div className="group-top">
                  <Avatar name={group.chatName} />
                  <div>
                    <h2 className="group-title">{group.chatName}</h2>
                    <p className="muted small">{group.users.length} members</p>
                  </div>
                </div>

                <div className="group-grid">
                  <div className="stat-card">
                    <p className="muted small">Group admin</p>
                    <p className="muted">{group.groupAdmin?.name || user.name}</p>
                  </div>
                  <div className="stat-card">
                    <p className="muted small">Last activity</p>
                    <p className="muted">{group.latestMessage ? `${group.latestMessage.sender.name}: ${group.latestMessage.content}` : "No recent messages"}</p>
                  </div>
                </div>

                <div className="group-foot muted">
                  <span>Created by {group.groupAdmin?.name || user.name}</span>
                  <span>{group._id ? group.users.length + " members" : ""}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
