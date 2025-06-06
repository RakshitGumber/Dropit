import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header, Sidebar } from "@/components/core";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet />
    </>
  );
}
