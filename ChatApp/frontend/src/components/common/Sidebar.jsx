const Sidebar = ({ left, center, right }) => {
  return (
    <div className="layout">
      <div className="sidebar-left">
        {left}
      </div>
      <div className="main-center">
        {center}
      </div>
      <div className="sidebar-right hidden-xl">
        {right}
      </div>
    </div>
  );
};

export default Sidebar;
