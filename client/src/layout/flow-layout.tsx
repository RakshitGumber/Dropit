import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { shallow } from "zustand/shallow";

import TextNode from "@/node/text-node";

import { useFlowStore } from "@/store/store";
// @ts-ignore

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

const nodeTypes = {
  text: TextNode,
};

const FlowLayout = () => {
  const store = useFlowStore(selector, shallow);

  return (
    <div
      className="dashboard-container"
      style={{ width: "100vw", height: "calc(100vh - 70px)" }}
    >
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        nodeTypes={nodeTypes}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
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
