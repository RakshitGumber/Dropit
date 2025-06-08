import { Toolbar, Canvas } from ".";
import { ReactFlowProvider } from "@xyflow/react";

const FlowEditor = () => {
  return (
    <ReactFlowProvider>
      <Toolbar />
      <Canvas />
    </ReactFlowProvider>
  );
};
export default FlowEditor;
