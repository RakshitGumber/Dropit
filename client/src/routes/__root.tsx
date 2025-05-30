import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useStore } from "@/store";
import { LoadingScreen } from "@/components/Loading";
import { useEffect, useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { loading, setLoading } = useStore();
  const [animationCompleted, setAnimationCompleted] = useState(false);
  useEffect(() => {
    const fetchResources = async () => {
      try {
        if (animationCompleted) {
          setTimeout(() => setLoading(false), 1000);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchResources();
  }, [setLoading, animationCompleted]);

  if (loading)
    return <LoadingScreen setAnimationCompleted={setAnimationCompleted} />;
  return <Outlet />;
}
