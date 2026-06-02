const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button onClick={onClose} className="modal-close">×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
