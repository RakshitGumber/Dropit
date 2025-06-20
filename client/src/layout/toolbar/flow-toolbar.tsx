import { Icon } from "@iconify/react/dist/iconify.js";
import "./flow-toolbar.scss";
import { useReactFlow } from "@xyflow/react";

const FlowToolbar = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="toolbar">
      <button onClick={() => zoomIn()}>
        <Icon icon="solar:magnifer-zoom-in-broken" />
      </button>
      <button onClick={() => zoomOut()}>
        <Icon icon="solar:minimalistic-magnifer-zoom-out-broken" />
      </button>
      <button onClick={() => fitView()}>
        <Icon icon="solar:maximize-square-minimalistic-broken" />
      </button>
      <button onClick={() => location.reload()}>
        <Icon icon="solar:restart-square-broken" />
      </button>
    </div>
  );
};
export default FlowToolbar;
