import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/core";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSidebarOpen, _] = useState(false);

  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} />
      <Outlet />
    </>
  );
}
