import { Sidebar, Canvas } from ".";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowHeader } from "./header";
import "./editor.scss";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { createFlow } from "@/api";
import { useFlowStore } from "@/store/flowStore";

const FlowEditor = () => {
  const navigate = useNavigate();
  const routeParams = useParams({ strict: false }); // avoid crash
  const [localFlowId, setLocalFlowId] = useState<string | null>(
    routeParams.flowId ?? null
  );
  const isCreatingRef = useRef(false);

  const { nodes } = useFlowStore((state) => state);

  useEffect(() => {
    if (!localFlowId && !isCreatingRef.current) {
      handleInteraction();
    }
  }, [localFlowId]);

  const handleInteraction = useCallback(async () => {
    if (localFlowId || isCreatingRef.current) return;

    isCreatingRef.current = true;
    try {
      const response = await createFlow({
        name: "Untitled",
        nodes: JSON.stringify(nodes),
        edges: "[]",
      });
      const newId = response.data.id;
      setLocalFlowId(newId);

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
  }, [localFlowId, navigate]);

  return (
    <div className="flow-editor" onClick={handleInteraction}>
      <FlowHeader onInteraction={handleInteraction} />
      <ReactFlowProvider>
        <div className="flow-container">
          <Sidebar />
          <Canvas
            id={localFlowId ?? routeParams.flowId}
            onUserEdit={handleInteraction}
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
};
export default FlowEditor;
