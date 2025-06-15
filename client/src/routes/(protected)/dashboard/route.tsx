import { useAuthStore } from "@/store/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/dashboard")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw redirect({ to: "/auth/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore((state) => state);

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <ul>
        <li>
          <a href={`./flow/${1}`}>{1}</a>
        </li>
      </ul>
    </div>
  );
}
