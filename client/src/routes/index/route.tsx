import { createFileRoute } from "@tanstack/react-router";
import "./style.scss";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="hero">
        <h1>Dropit</h1>
      </div>
    </>
  );
}
