import FlowLayout from "@/layout/flow-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <FlowLayout />
    </>
  );
}
