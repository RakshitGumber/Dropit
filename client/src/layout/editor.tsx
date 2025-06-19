import { Toolbar, Canvas } from ".";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowHeader } from "./header";
import "./editor.scss";

const FlowEditor = ({ id }: { id?: string }) => {
  return (
    <div className="flow-editor">
      <FlowHeader />
      {/* <ReactFlowProvider>
        <Toolbar />
        <Canvas id={id} />
      </ReactFlowProvider> */}
    </div>
  );
};
export default FlowEditor;
