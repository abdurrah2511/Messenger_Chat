import { useEffect, useState } from "react";
import { createGroup } from "../../api/chatApi";
import { searchUsers } from "../../api/userApi";
import Modal from "../common/Modal";

const CreateGroupModal = ({ onCreated, onClose }) => {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleUser = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]));
  };

  useEffect(() => {
    const loadUsers = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const { data } = await searchUsers(query);
        setResults(data);
      } catch {
        setError("Failed to search users");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(loadUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Please enter a group name.");
      return;
    }

    if (selected.length < 2) {
      setError("Select at least 2 users to create a group.");
      return;
    }

    try {
      const { data } = await createGroup({ name, users: JSON.stringify(selected) });
      if (onCreated) onCreated(data);
    } catch (error) {
      console.error("Create group failed", error);
      setError(error.response?.data?.message || "Create group failed");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="modal-card">
        <div className="modal-head">
          <h2 className="modal-title">Create Group</h2>
          <p className="muted">Choose a name and add members to your new group.</p>
        </div>

        <div className="modal-body">
          <input placeholder="Group name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Search users to add" className="input" value={query} onChange={(e) => setQuery(e.target.value)} />

          <div className="search-results">
            {loading && <p className="muted">Searching...</p>}
            {error && <p className="alert-error">{error}</p>}
            {results.map((u) => (
              <button key={u._id} type="button" onClick={() => toggleUser(u._id)} className="list-item">{u.name}</button>
            ))}
          </div>

          <div className="selected-list">
            {selected.map((id) => (
              <span key={id} className="badge">{id}</span>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={handleCreate} className="btn btn-accent">Create Group</button>
          <button onClick={onClose} className="btn btn-ghost">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
