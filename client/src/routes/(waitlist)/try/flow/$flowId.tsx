import FlowEditor from "@/layout/editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(waitlist)/try/flow/$flowId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FlowEditor />;
}
