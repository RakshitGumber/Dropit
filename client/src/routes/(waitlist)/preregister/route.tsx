import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "./preregister.scss";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Route = createFileRoute("/(waitlist)/preregister")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <main className="preregister">
      <button className="backbutton" onClick={() => navigate({ to: "/" })}>
        <Icon icon="fa:arrow-left" />
      </button>
      <div className="form-container">
        <h1>Join the Waitlist</h1>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="JohnDoe" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="jdoe@example.com" />
          </div>
          <span>Join waitlist to get future updates</span>
          <button>Join</button>
        </form>
      </div>
    </main>
  );
}
