import { Icon } from "@iconify/react";
import "./header.scss";

interface HeaderProps {
  isSidebarOpen: boolean;
}

const header: React.FC<HeaderProps> = ({ isSidebarOpen }) => {
  return (
    <header
      className="header"
      style={
        isSidebarOpen
          ? { width: "calc(100vw - 270px)" }
          : { width: "calc(100vw - 56px)" }
      }
    >
      <div className="header-content">
        {!isSidebarOpen && (
          <div className="logo">
            <h1>FlowPilot</h1>
          </div>
        )}
        <div className="nav-right">
          <div className="notifs">
            <button className="notif-button">
              <Icon icon="si:mail-line" />
            </button>
            <button className="notif-button">
              <Icon icon="si:notifications-thick-line" />
            </button>
          </div>
          <div className="account">
            {false ? (
              <div />
            ) : (
              <button className="signup-button">Sign Up</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default header;
