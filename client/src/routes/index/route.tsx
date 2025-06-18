import { createFileRoute } from "@tanstack/react-router";
import "./style.scss";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,

  beforeLoad: () => {
    throw redirect({
      to: "/waitlist",
    });
  },
});

function RouteComponent() {
  return (
    <>
      <div className="hero">Hello! Welcome to the Landing Page.</div>
    </>
  );
}
