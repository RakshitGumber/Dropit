import { OutputNode, TextNode } from "@/node";
import React from "react";

interface DraggableNodesRegistration<T extends Record<string, any>> {
  nodeType: string;
  icon?: React.ReactElement | any;
  label: string;
  group?: string;
  node: React.FC<T>;
}

const nodeRegistry = new Map<string, DraggableNodesRegistration<any>>();

const registerNode = <T extends Record<string, any>>(
  node: DraggableNodesRegistration<T>
) => {
  nodeRegistry.set(node.nodeType, node);
};

(() => {
  registerNode({ nodeType: "text", label: "Text", node: TextNode });
  registerNode({ nodeType: "output", label: "Output", node: OutputNode });
})();

const getRegistration = (nodeType: string) => {
  return nodeRegistry.get(nodeType);
};

const getAllKeys = () => {
  return Array.from(nodeRegistry.keys());
};

const getNodetypes = () =>
  getAllKeys().map((key) => {
    const registration = getRegistration(key)!;
    return [registration.nodeType, registration.node];
  });

export { getNodetypes, registerNode, getAllKeys, getRegistration };
