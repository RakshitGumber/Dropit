import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import "./waitlist.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { Icon } from "@iconify/react/dist/iconify.js";

export const Route = createFileRoute("/waitlist")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <main className="hero">
      <nav className="waitlist-nav">
        <div className="nav-item">
          {/* <Link to="/try/api">
            <div>
              <h2>Try</h2>
              <h1>Connection</h1>
            </div>
            <Icon icon="ooui:link-external-ltr" className="icon"></Icon>
          </Link> */}
        </div>
        <div className="nav-item">
          <Link to="/try/flow">
            <div>
              <h2>Try</h2>
              <h1>Create Flow</h1>
            </div>
            <Icon icon="ooui:link-external-ltr" className="icon"></Icon>
          </Link>
        </div>
      </nav>
      <div className="text">
        <div className="logo">
          <h1>Fluxely</h1>
        </div>
        <div className="subheading">
          <span>
            You’re Drowning in Repetitive Work: Emails, Triggers, Follow-Ups.
          </span>
          <span>
            Fluxely Automates It All—So You Can Focus on What Matters.
          </span>
        </div>
      </div>
      <div className="iso-container">
        <button onClick={() => navigate({ to: "/preregister" })}>
          Join Waitlist
        </button>
        <span>Your freedom engine is coming.</span>
      </div>

      <footer>Created By Rakshit Gumber</footer>
    </main>
  );
}
