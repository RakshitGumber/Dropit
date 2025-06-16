import { Icon } from "@iconify/react";
import "./header.scss";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";

const header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <header className="header">
      <div className="header-content">
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
            {user ? (
              <div />
            ) : (
              <button
                className="signup-button"
                onClick={() => navigate({ to: "/auth/signup" })}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default header;
