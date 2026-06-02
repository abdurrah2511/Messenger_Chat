const MainLayout = ({ children }) => {
  return (
    <div className="app-root">
      <div className="app-content">{children}</div>
    </div>
  );
};

export default MainLayout;
