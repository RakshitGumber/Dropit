import { Toolbar, Canvas } from ".";
import { ReactFlowProvider } from "@xyflow/react";

const FlowEditor = ({ id }: { id: number }) => {
  return (
    <ReactFlowProvider>
      <Toolbar />
      <Canvas id={id} />
    </ReactFlowProvider>
  );
};
export default FlowEditor;
