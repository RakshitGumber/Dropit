import { useCallback, useState, useEffect } from "react";
import {
  Background,
  Controls,
  Node,
  Connection,
  ReactFlowInstance,
  ReactFlow,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import { useFlowStore } from "@/store/flowStore";

import "@xyflow/react/dist/style.css";

import { getNodetypes } from "@/registry";

const gridSize = 25;
const proOptions = { hideAttribution: true };

interface NodeData {
  id: string;
  nodeType: string;
  [key: string]: any;
}

const nodeTypes: any = Object.fromEntries(getNodetypes());

const Canvas = () => {
  const { screenToFlowPosition } = useReactFlow();
  const [_, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  // Get initial data from store
  const { nodes: storeNodes, edges: storeEdges } = useFlowStore();

  // Use ReactFlow's local state for reactivity
  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const dataTransfer = event.dataTransfer?.getData("application/reactflow");
      if (!dataTransfer) return;

      try {
        // Try to parse as JSON first
        let type;
        try {
          const appData = JSON.parse(dataTransfer);
          type = appData?.nodeType;
        } catch {
          // Fallback to string-based approach
          type = dataTransfer;
        }

        if (!type) return;

        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const id = `${type}-${Date.now()}`;
        const newNode: Node<NodeData> = {
          id,
          type,
          position,
          data:
            type === "text"
              ? {
                  id,
                  nodeType: type,
                  value: "",
                  onChange: (val: string) => {
                    setNodes((nds) =>
                      nds.map((n) =>
                        n.id === id
                          ? { ...n, data: { ...n.data, value: val } }
                          : n
                      )
                    );
                  },
                }
              : {
                  id,
                  nodeType: type,
                  inputValue: "Connect input",
                },
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        console.error("Error parsing drag data:", error);
      }
    },
    [screenToFlowPosition, setNodes]
  );

  const { setNodes: setStoreNodes, setEdges: setStoreEdges } = useFlowStore();

  useEffect(() => {
    setStoreNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    setStoreEdges(edges);
  }, [edges]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "calc(100vh - 70px)" }}>
        <button onClick={() => useFlowStore.getState().saveFlow("My Flow")}>
          Save Flow
        </button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          fitView
        >
          <Background gap={gridSize} />
          <Controls
            position="top-right"
            orientation="horizontal"
            className="text-black border-4 border-card shadow-lg shadow-black/50"
          />
        </ReactFlow>
      </div>
    </>
  );
};

export default Canvas;
