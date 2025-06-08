import { createWithEqualityFn } from "zustand/traditional";
import {
  addEdge as reactFlowAddEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import * as api from "@/api";
import { useAuthStore } from "./authStore";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  addEdge: (data: Omit<Edge, "id">) => void;
  updateNode: (id: string, data: any) => void;
  addNode: (node: Node) => void;
  addTextNode: () => void;
  saveFlow: (name: string) => Promise<void>;
}

export const useFlowStore = createWithEqualityFn<FlowState>(
  (set, get) => ({
    nodes: [],
    edges: [],

    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    onNodesChange: (changes) =>
      set({ nodes: applyNodeChanges(changes, get().nodes) }),

    onEdgesChange: (changes) =>
      set({ edges: applyEdgeChanges(changes, get().edges) }),

    onConnect: (connection) =>
      set({ edges: reactFlowAddEdge(connection, get().edges) }),

    addEdge: (data) => {
      const id = nanoid();
      const edge: Edge = { id, ...data };
      set({ edges: [edge, ...get().edges] });
    },

    updateNode: (id, data) =>
      set({
        nodes: get().nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node
        ),
      }),

    addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),

    addTextNode: () =>
      set((state) => ({
        nodes: [
          ...state.nodes,
          {
            id: nanoid(),
            type: "default",
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { label: "Text Node" },
          },
        ],
      })),

    saveFlow: async (name) => {
      const { nodes, edges } = get();

      try {
        await api.saveFlow({
          name,
          nodes: JSON.stringify(nodes),
          edges: JSON.stringify(edges),
        });
        console.log("✅ Flow saved.");
      } catch (err) {
        console.error("❌ Save failed", err);
      }
    },
  }),
  Object.is
);
