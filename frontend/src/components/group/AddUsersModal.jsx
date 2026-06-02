import { useState } from "react";

import Modal from "../common/Modal";
import Avatar from "../common/Avatar";

import { addToGroup } from "../../api/chatApi";

const AddUsersModal = ({ users, chatId, onClose }) => {

  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((u) => u !== id)
        : [...prev, id]
    );
  };

  const handleAdd = async () => {

    for (let id of selected) {
      await addToGroup({ chatId, userId: id });
    }

    onClose();

  };

  return (
    <Modal onClose={onClose}>

      <h2 className="modal-title">Add Users</h2>

      <div className="scroll-list">
        {users.map((u) => (
          <div key={u._id} onClick={() => toggle(u._id)} className="list-item">
            <Avatar name={u.name} />
            <span className="list-item-title">{u.name}</span>
          </div>
        ))}
      </div>

      <button onClick={handleAdd} className="btn btn-block btn-accent">Add Users</button>

    </Modal>
  );
};

export default AddUsersModal;