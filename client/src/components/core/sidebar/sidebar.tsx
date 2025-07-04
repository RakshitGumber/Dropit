interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  return (
    <div>
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
