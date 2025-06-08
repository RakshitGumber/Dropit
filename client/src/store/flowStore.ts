import { createWithEqualityFn } from "zustand/traditional";
import {
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  Node,
  MarkerType,
  addEdge,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import * as api from "@/api";

type NodeData = {
  [key: string]: any;
};

type NodeIDs = {
  [key: string]: number;
};

interface FlowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  nodeIDs: NodeIDs;
  getNodeID: (type: string) => string;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (edge: EdgeChange[]) => void;
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
    nodeIDs: {},
    getNodeID: (type: string) => {
      const newIDs = { ...get().nodeIDs };
      if (newIDs[type] === undefined) {
        newIDs[type] = 0;
      }
      newIDs[type] += 1;
      set({ nodeIDs: newIDs });
      return `${type}-${newIDs[type]}`;
    },
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    onNodesChange: (changes) =>
      set({ nodes: applyNodeChanges(changes, get().nodes) }),

    onEdgesChange: (changes) =>
      set({ edges: applyEdgeChanges(changes, get().edges) }),

    onConnect: (connection) =>
      set({
        edges: addEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
          },
          get().edges
        ),
      }),

    getNodeData: (nodeId: string) => {
      const node = get().nodes.find((node) => node.id === nodeId);
      return node?.data;
    },

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

    updateNodeField: (nodeId: string, fieldName: string, fieldValue: any) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, [fieldName]: fieldValue },
            };
          }
          return node;
        }),
      });
    },

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
