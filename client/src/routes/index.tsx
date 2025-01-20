import { Library } from "@/components/Library";
import { Header } from "@/components/Header";
import { PipelineUI } from "@/ui";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

export const Route = createFileRoute("/")({
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
