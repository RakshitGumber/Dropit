import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(waitlist)/try/api")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/waitlist/try/api"!</div>;
}
