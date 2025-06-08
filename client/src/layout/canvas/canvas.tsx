import { OutputNode } from "@/node/output";
import { TextNode } from "@/node/text";
import { useFlowStore } from "@/store/flowStore";
import {
  addEdge,
  Background,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useCallback } from "react";

const nodeTypes = {
  text: TextNode,
  output: OutputNode,
};

const Canvas = () => {
  const { nodes, edges } = useFlowStore();
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);
  const { getZoom, getViewport } = useReactFlow(); // ✅ Will work now

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
      <button onClick={() => useFlowStore.getState().saveFlow("My Flow")}>
        Save Flow
      </button>
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

export default Canvas;
