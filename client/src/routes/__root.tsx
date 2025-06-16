import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/core";
import { ThemeController } from "@/components/controller";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Header />
      <ThemeController />
      <Outlet />
    </>
  );
}
