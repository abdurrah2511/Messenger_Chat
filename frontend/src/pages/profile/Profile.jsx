import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import Avatar from "../../components/common/Avatar";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { chats } = useContext(ChatContext);
  const navigate = useNavigate();

  const groupChats = chats.filter((chat) => chat.isGroupChat).length;
  const directChats = chats.filter((chat) => !chat.isGroupChat).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-card">
          <div className="profile-head">
            <div className="profile-left">
              <Avatar name={user?.name} />
              <div>
                <h1 className="profile-title">{user?.name || "Your Profile"}</h1>
                <p className="muted">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "soon"}</p>
              </div>
            </div>

            <div className="profile-actions">
              <button onClick={() => navigate('/')} className="btn btn-ghost">Back to Chats</button>
              <button onClick={handleLogout} className="btn btn-accent">Logout</button>
            </div>
          </div>

          <div className="profile-grid">
            <div className="stat-card">
              <h2 className="font-semibold">Account</h2>
              <p className="muted">Your personal information and login details.</p>
              <div className="profile-info">
                <div>
                  <p className="muted">Full name</p>
                  <p className="font-medium">{user?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="muted">Email</p>
                  <p className="font-medium">{user?.email || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <h2 className="font-semibold">Activity</h2>
              <div className="profile-stats">
                <div>
                  <p className="muted">Direct chats</p>
                  <p className="stat-value">{directChats}</p>
                </div>
                <div>
                  <p className="muted">Group chats</p>
                  <p className="stat-value">{groupChats}</p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <h2 className="font-semibold">Security</h2>
              <p className="muted">Your session is secured using token-based authentication and encrypted transports.</p>
              <div className="status-pill">
                <span className="status-dot"></span>
                Active now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
