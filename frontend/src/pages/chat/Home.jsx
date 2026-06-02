import Sidebar from "../../components/common/Sidebar";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatBox from "../../components/chat/ChatBox";
import GroupInfo from "../../components/group/GroupInfo";

const Home = () => {
  return (
    <div className="page">
      <div className="app-container">
        <Sidebar
          left={<ChatSidebar />}
          center={<ChatBox />}
          right={<GroupInfo />}
        />
      </div>
    </div>
  );
};

export default Home;
