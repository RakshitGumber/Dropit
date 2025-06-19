import { Toolbar, Canvas } from ".";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowHeader } from "./header";
import "./editor.scss";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { createFlow } from "@/api";

const FlowEditor = () => {
  const navigate = useNavigate();
  const { flowId } = useParams({ strict: false });

  const isCreatingRef = useRef(false);

  const handleInteraction = useCallback(async () => {
    if (flowId || isCreatingRef.current) return;

    isCreatingRef.current = true;
    try {
      const response = await createFlow({
        name: "Untitled Flow",
        nodes: "[]",
        edges: "[]",
      });
      const newId = response.data.id;

      navigate({
        to: "/try/flow/$flowId",
        params: { flowId: newId },
        replace: true,
      });
    } catch (err) {
      console.error("Flow creation failed:", err);
    } finally {
      isCreatingRef.current = false;
    }
  }, [flowId, navigate]);

  return (
    <div className="flow-editor" onClick={handleInteraction}>
      <FlowHeader onInteraction={handleInteraction} />
      <ReactFlowProvider>
        <Toolbar />
        <Canvas id={flowId} onUserEdit={handleInteraction} />
      </ReactFlowProvider>
    </div>
  );
};
export default FlowEditor;
