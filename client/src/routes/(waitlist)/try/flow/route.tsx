import FlowEditor from "@/layout/editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(waitlist)/try/flow")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FlowEditor />;
}
