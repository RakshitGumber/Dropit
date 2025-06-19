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

type NodeData = { [key: string]: any };
type NodeIDs = { [key: string]: number };

interface FlowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  nodeIDs: NodeIDs;

  // Core methods
  getNodeID: (type: string) => string;
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  addEdge: (data: Omit<Edge, "id">) => void;
  addNode: (node: Node<NodeData>) => void;
  addTextNode: () => void;
  updateNode: (id: string, data: Partial<NodeData>) => void;
  updateNodeField: (nodeId: string, field: string, value: any) => void;
  getNodeData: (nodeId: string) => NodeData | undefined;

  createFlow: (name: string) => Promise<any>;
  loadFlow: (id: any) => Promise<void>;
  updateFlow: (id: string, name?: string) => Promise<void>;
}

export const useFlowStore = createWithEqualityFn<FlowState>(
  (set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},

    getNodeID: (type) => {
      const ids = { ...get().nodeIDs };
      ids[type] = (ids[type] || 0) + 1;
      set({ nodeIDs: ids });
      return `${type}-${ids[type]}`;
    },

    setNodes: (nodes) => {
      console.log("✅ setNodes:", nodes);
      set({ nodes });
    },

    setEdges: (edges) => {
      console.log("✅ setEdges:", edges);
      set({ edges });
    },

    onNodesChange: (changes) => {
      const updated = applyNodeChanges(changes, get().nodes);
      set({ nodes: updated });
    },

    onEdgesChange: (changes) => {
      const updated = applyEdgeChanges(changes, get().edges);
      set({ edges: updated });
    },

    onConnect: (connection) => {
      const newEdge: Edge = {
        ...connection,
        id: nanoid(),
        type: "smoothstep",
        animated: true,
        markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
      };
      set({ edges: addEdge(newEdge, get().edges) });
    },

    addEdge: (data) => {
      const edge: Edge = { id: nanoid(), ...data };
      set((state) => ({ edges: [...state.edges, edge] }));
    },

    addNode: (node) => {
      console.log("➕ Adding node:", node);
      set((state) => ({ nodes: [...state.nodes, node] }));
    },

    addTextNode: () => {
      const newNode: Node = {
        id: nanoid(),
        type: "default",
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: { label: "Text Node" },
      };
      console.log("➕ Adding text node:", newNode);
      set((state) => ({ nodes: [...state.nodes, newNode] }));
    },

    updateNode: (id, data) => {
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node
        ),
      }));
    },

    updateNodeField: (nodeId, field, value) => {
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, [field]: value } }
            : node
        ),
      }));
    },

    getNodeData: (nodeId) => {
      return get().nodes.find((n) => n.id === nodeId)?.data;
    },

    createFlow: async (name) => {
      const { nodes, edges } = get();

      console.log("📦 Saving flow:", { name, nodes, edges });

      if (!nodes.length) {
        console.warn("⚠️ No nodes to save.");
      }

      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const user_id = user?.user_id;

      try {
        const data = await api.createFlow({
          name,
          nodes: "[]",
          edges: "[]",
          user_id,
        });
        return data;
        console.log("✅ Flow saved to backend.");
      } catch (error) {
        console.error("❌ Error saving flow:", error);
      }
    },
    loadFlow: async (id: number) => {
      try {
        const res = await api.getFlow(id);
        sessionStorage.setItem("name", res.data.name);
        set({
          nodes: JSON.parse(res.data.nodes || "[]"),
          edges: JSON.parse(res.data.edges || "[]"),
        });
      } catch (err) {
        console.error("Error loading flow:", err);
      }
    },
    updateFlow: async (id: string, name?: string) => {
      const { nodes, edges } = get();
      const payload = {
        name,
        nodes: JSON.stringify(nodes),
        edges: JSON.stringify(edges),
      };

      try {
        await api.updateFlow(id, payload);
        console.log("✅ Flow updated successfully");
      } catch (err) {
        console.error("❌ Error updating flow:", err);
      }
    },
  }),
  Object.is
);
