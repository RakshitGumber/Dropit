import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import type { Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { TextNode } from "@/node/text";
import { OutputNode } from "@/node/output";

import { useFlowStore } from "@/store/flowStore";
import { useCallback } from "react";
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
  output: OutputNode,
};

const Sidebar: React.FC = () => {
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-4 bg-gray-200 w-48">
      <div
        onDragStart={(e) => handleDragStart(e, "text")}
        draggable
        className="p-2 bg-white rounded shadow mb-2 cursor-move"
      >
        Text Node
      </div>
      <div
        onDragStart={(e) => handleDragStart(e, "output")}
        draggable
        className="p-2 bg-white rounded shadow cursor-move"
      >
        Output Node
      </div>
    </aside>
  );
};

const FlowCanvas = () => {
  const { getZoom, getViewport } = useReactFlow();
  const { nodes, edges } = useFlowStore();
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (params: Edge) => setRfEdges((eds) => addEdge(params, eds)),
    [setRfEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const clientX = event.clientX - bounds.left;
      const clientY = event.clientY - bounds.top;

      const zoom = getZoom();
      const { x, y } = getViewport();

      const position = {
        x: (clientX - x) / zoom,
        y: (clientY - y) / zoom,
      };

      const id = `${+new Date()}`;
      const newNode = {
        id,
        type,
        position,
        data:
          type === "text"
            ? {
                value: "",
                onChange: (val: string) => {
                  setRfNodes((nds) =>
                    nds.map((n) =>
                      n.id === id
                        ? { ...n, data: { ...n.data, value: val } }
                        : n
                    )
                  );
                },
              }
            : {
                inputValue: "Connect input",
              },
      };

      setRfNodes((nds) => nds.concat(newNode));
    },
    [getZoom, getViewport, setRfNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div style={{ width: "100%", height: "calc(100vh - 70px)" }}>
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // @ts-ignore
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const FlowLayout = () => (
  <div className="flex">
    <Sidebar />
    <FlowCanvas />
  </div>
);

export default FlowLayout;
