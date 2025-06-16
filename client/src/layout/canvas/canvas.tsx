// @ts-nocheck
import { useCallback, useState, useEffect, useRef } from "react";
import {
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  ReactFlowInstance,
  ReactFlow,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import { useFlowStore } from "@/store/flowStore";
import { getNodetypes } from "@/registry";

import "@xyflow/react/dist/style.css";
import isEqual from "lodash.isequal";

const gridSize = 25;
const proOptions = { hideAttribution: true };

interface NodeData {
  id: string;
  nodeType: string;
  [key: string]: any;
}

const nodeTypes: any = Object.fromEntries(getNodetypes());

interface CanvasProps {
  id?: any;
}

const Canvas: React.FC<CanvasProps> = ({ id }) => {
  const { screenToFlowPosition } = useReactFlow();
  const [_, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const {
    nodes: storeNodes,
    edges: storeEdges,
    loadFlow,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
  } = useFlowStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const prevNodesRef = useRef<Node[]>([]);
  const prevEdgesRef = useRef<Edge[]>([]);

  // 🔄 Sync Zustand -> Local ReactFlow state when store updates
  useEffect(() => {
    if (!isEqual(prevNodesRef.current, storeNodes)) {
      prevNodesRef.current = storeNodes;
      setNodes(storeNodes);
    }
  }, [storeNodes, setNodes]);

  useEffect(() => {
    if (!isEqual(prevEdgesRef.current, storeEdges)) {
      prevEdgesRef.current = storeEdges;
      setEdges(storeEdges);
    }
  }, [storeEdges, setEdges]);

  // 🔄 Sync ReactFlow state -> Zustand store (when local state changes)
  useEffect(() => {
    if (!isEqual(storeNodes, nodes)) setStoreNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    if (!isEqual(storeEdges, edges)) setStoreEdges(edges);
  }, [edges]);

  // Load flow when id is passed
  useEffect(() => {
    if (id !== undefined) loadFlow(id);
  }, [id]);

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
        let type;
        try {
          const appData = JSON.parse(dataTransfer);
          type = appData?.nodeType;
        } catch {
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

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div style={{ width: "100%", height: "calc(100vh - 70px)" }}>
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
  );
};

export default Canvas;
