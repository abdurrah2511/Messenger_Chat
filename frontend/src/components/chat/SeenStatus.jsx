const SeenStatus = ({ message }) => {
  if (!message.seenBy || message.seenBy.length === 0) {
    return <span className="seen-status unseen">?</span>;
  }

  return <span className="seen-status seen">✓✓</span>;
};

export default SeenStatus;
