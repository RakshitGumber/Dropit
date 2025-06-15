import FlowEditor from "@/layout/editor";
import { useAuthStore } from "@/store/authStore";
import { createFileRoute, redirect, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/flow/$id")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw redirect({ to: "/auth/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/(protected)/flow/$id" });

  return <FlowEditor id={id} />;
}
