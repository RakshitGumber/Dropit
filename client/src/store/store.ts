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
}

export const useFlowStore = createWithEqualityFn<FlowState>(
  (set, get) => ({
    nodes: [
      {
        id: "a",
        type: "text",
        data: { label: "text" },
        position: { x: 0, y: 0 },
      },
      { id: "b", data: { label: "text" }, position: { x: 50, y: 50 } },
      { id: "c", data: { label: "text" }, position: { x: -50, y: 100 } },
    ],
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
  }),
  Object.is
);
