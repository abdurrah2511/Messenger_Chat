import { useState } from "react";
import { searchUsers } from "../../api/userApi";
import Avatar from "../common/Avatar";
import Loader from "../common/Loader";
import { createChat } from "../../api/chatApi";

const UserSearch = ({ onChatCreated }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = async (text) => {
    setQuery(text);

    if (!text) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const { data } = await searchUsers(text);
      setResults(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const startChat = async (userId) => {
    try {
      const { data } = await createChat(userId);
      if (onChatCreated) onChatCreated(data);
    } catch (err) {
      console.error("Create chat failed", err);
    }
  };

  return (
    <div className="search-card">
      <input value={query} onChange={(e) => handleSearch(e.target.value)} placeholder="Search users..." className="input" />

      {loading && <Loader />}

      <div className="results-list">
        {results.map((u) => (
          <button key={u._id} onClick={() => startChat(u._id)} className="list-item">
            <Avatar name={u.name} />
            <p className="list-item-title">{u.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
