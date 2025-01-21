import { Library } from "@/components/Library";
import { Header } from "@/components/Header";
import { PipelineUI } from "@/ui";
import { Toaster } from "react-hot-toast";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <Library />
      <PipelineUI />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
