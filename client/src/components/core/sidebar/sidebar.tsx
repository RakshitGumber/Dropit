interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <div
      style={
        isSidebarOpen
          ? {
              float: "left",
              width: "270px",
              borderRight: "1px solid rgba(0, 0, 0, 0.2)",
              height: "100vh",
            }
          : {
              float: "left",
              width: "56px",
              borderRight: "1px solid rgba(0, 0, 0, 0.2)",
              height: "100vh",
            }
      }
    >
      {isSidebarOpen ? (
        <>
          Open <button onClick={() => setIsSidebarOpen(false)}>cls</button>
        </>
      ) : (
        <>
          Closed <button onClick={() => setIsSidebarOpen(true)}>opn</button>
        </>
      )}
    </div>
  );
};
export default Sidebar;
