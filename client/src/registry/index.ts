import {
  OutputNode,
  TextNode,
  VariableNode,
  SummarizeNode,
  GeminiNode,
  SendMailNode,
  ConcatNode,
} from "@/node";
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
  registerNode({ nodeType: "text-output", label: "Output", node: OutputNode });
  registerNode({ nodeType: "variable", label: "Variable", node: VariableNode });
  registerNode({
    nodeType: "summarize",
    label: "Summarize",
    node: SummarizeNode,
  });
  registerNode({ nodeType: "gemini", label: "Gemini", node: GeminiNode });
  registerNode({ nodeType: "mail", label: "Mail", node: SendMailNode });
  registerNode({
    nodeType: "concat",
    label: "Concat",
    node: ConcatNode,
    group: "Function",
  });
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
