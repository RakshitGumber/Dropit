import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowStore } from "@/store/store";

const FlowLayout = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowStore();

  return (
    <div
      className="dashboard-container"
      style={{ width: "100vw", height: "calc(100vh - 70px)" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        {
          // @ts-ignore
          <Background variant="dots" gap={16} size={1} />
        }
      </ReactFlow>
    </div>
  );
};

export default FlowLayout;
