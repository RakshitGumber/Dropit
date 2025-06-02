// import { useState, useRef, useCallback } from "react";
// import {
//   ReactFlow,
//   Controls,
//   Background,
//   useReactFlow,
//   Node,
//   OnNodesChange,
//   OnEdgesChange,
//   Connection,
//   Edge,
//   ReactFlowInstance,
// } from "@xyflow/react";
// import { shallow } from "zustand/shallow";

// import { getNodetypes } from "./registry/registry";

// import "@xyflow/react/dist/style.css";

// const gridSize = 25;
// const proOptions = { hideAttribution: true };

// interface NodeData {
//   id: string;
//   nodeType: string;
//   [key: string]: any;
// }

// const nodeTypes: any = Object.fromEntries(getNodetypes());

// interface StoreSelector {
//   nodes: Node<NodeData>[];
//   edges: Edge[];
//   getNodeID: (type: string) => string;
//   addNode: (node: Node<NodeData>) => void;
//   onNodesChange: OnNodesChange;
//   onEdgesChange: OnEdgesChange;
//   onConnect: (connection: Connection) => void;
// }

// const selector = (state: any): StoreSelector => ({
//   nodes: state.nodes,
//   edges: state.edges,
//   getNodeID: state.getNodeID,
//   addNode: state.addNode,
//   onNodesChange: state.onNodesChange,
//   onEdgesChange: state.onEdgesChange,
//   onConnect: state.onConnect,
// });

// export const PipelineUI = () => {
//   const reactFlowWrapper = useRef<HTMLDivElement>(null);
//   const { screenToFlowPosition } = useReactFlow();
//   const [_, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

//   // const {
//   //   nodes,
//   //   edges,
//   //   getNodeID,
//   //   addNode,
//   //   onNodesChange,
//   //   onEdgesChange,
//   //   onConnect,
//   // } = useStore(selector, shallow);

//   const getInitNodeData = (nodeID: string, type: string): NodeData => {
//     return { id: nodeID, nodeType: type };
//   };

//   const onDrop = useCallback(
//     (event: React.DragEvent<HTMLDivElement>) => {
//       event.preventDefault();

//       const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
//       if (!reactFlowBounds) return;

//       const dataTransfer = event.dataTransfer?.getData("application/reactflow");
//       if (!dataTransfer) return;

//       try {
//         const appData = JSON.parse(dataTransfer);
//         const type = appData?.nodeType;

//         // check if the dropped element is valid
//         if (typeof type === "undefined" || !type) {
//           return;
//         }

//         const position = screenToFlowPosition({
//           x: event.clientX,
//           y: event.clientY,
//         });

//         const nodeID = getNodeID(type);
//         const newNode: Node<NodeData> = {
//           id: nodeID,
//           type,
//           position,
//           data: getInitNodeData(nodeID, type),
//         };

//         addNode(newNode);
//       } catch (error) {
//         console.error("Error parsing drag data:", error);
//       }
//     },
//     [screenToFlowPosition, getNodeID, addNode]
//   );

//   const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   return (
//     <>
//       <div
//         ref={reactFlowWrapper}
//         className={"h-[calc(100vh-3.5rem)] relative top-[3.5rem] w-full"}
//       >
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onDrop={onDrop}
//           onDragOver={onDragOver}
//           onInit={setReactFlowInstance}
//           nodeTypes={nodeTypes}
//           proOptions={proOptions}
//           snapGrid={[gridSize, gridSize]}
//         >
//           <Background gap={gridSize} />
//           <Controls
//             position="top-right"
//             orientation="horizontal"
//             className="text-black border-4 border-card shadow-lg shadow-black/50"
//           />
//         </ReactFlow>
//       </div>
//     </>
//   );
// };
