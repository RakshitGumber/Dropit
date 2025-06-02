import { Link } from "@tanstack/react-router";
import "./header.scss";

const header = () => {
  return (
    <div className="header-container">
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/auth/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default header;
