import { createWithEqualityFn } from "zustand/traditional";
import {
  addEdge as reactFlowAddEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import { nanoid } from "nanoid";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  addEdge: (data: Omit<Edge, "id">) => void;
  updateNode: () => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  addTextNode: () => void;
}

export const useFlowStore = createWithEqualityFn<FlowState>(
  (set, get) => ({
    nodes: [],
    edges: [],
    onNodesChange: (changes) =>
      set({ nodes: applyNodeChanges(changes, get().nodes) }),
    onEdgesChange: (changes) =>
      set({ edges: applyEdgeChanges(changes, get().edges) }),
    onConnect: (connection) =>
      set({ edges: reactFlowAddEdge(connection, get().edges) }),
    addEdge: (data) => {
      const id = nanoid(6);
      const edge: Edge = { id, ...data };
      set({ edges: [edge, ...get().edges] });
    },
    // @ts-ignore
    updateNode(id, data) {
      set({
        nodes: get().nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node
        ),
      });
    },
    setNodes: (nodes: Node[]) => set({ nodes }),
    setEdges: (edges: Edge[]) => set({ edges }),
    addNode: (node: Node) =>
      set((state) => ({ nodes: [...state.nodes, node] })),
    addTextNode: () =>
      set((state) => ({
        nodes: [
          ...state.nodes,
          {
            id: nanoid(),
            type: "default",
            position: { x: Math.random() * 250, y: Math.random() * 250 },
            data: { label: "Text Node" },
          },
        ],
      })),
  }),

  Object.is
);
