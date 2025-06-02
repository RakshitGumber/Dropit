import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/core";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
