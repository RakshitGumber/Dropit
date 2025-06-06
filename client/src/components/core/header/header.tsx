import { Icon } from "@iconify/react";
import "./header.scss";

const header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="nav-right">
          <div className="notifs">
            <button className="notif-button">
              <Icon icon="si:mail-line" />
            </button>
            <button className="notif-button highlight">
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
