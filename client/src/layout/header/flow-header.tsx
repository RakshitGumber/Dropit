import { ThemeController } from "@/components/controller";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./flow-header.scss";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useFlowStore } from "@/store/flowStore";
import { useParams } from "@tanstack/react-router";

const FlowHeader = ({ onInteraction }: { onInteraction: () => void }) => {
  const [flowName, setFlowName] = useState(() => {
    return sessionStorage.getItem("name") ?? "Untitled";
  });

  useEffect(() => {
    sessionStorage.setItem("name", flowName);
  }, [flowName]);

  const [editName, setEditName] = useState(false);
  const updateFlow = useFlowStore((s) => s.updateFlow);
  const { flowId } = useParams({ strict: false });

  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if (editName) {
      setEditName(false);
      // @ts-ignore
      updateFlow(flowId, flowName);
    }
  });

  return (
    <header className="flow-header">
      <div className="flux-actions">
        <div
          onClick={() => {
            setEditName(true);
            onInteraction();
          }}
          ref={ref}
          className="edit-name"
        >
          {!editName ? (
            <h1>{flowName}</h1>
          ) : (
            <input
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditName(false);
                  // @ts-ignore
                  updateFlow(flowId, flowName);
                }
              }}
            />
          )}
        </div>
        {!editName && (
          <>
            <button onClick={() => setEditName(!editName)}>
              <Icon icon="hugeicons:edit-02" />
            </button>
            <button
              onClick={() => {
                // @ts-ignore
                updateFlow(flowId);
              }}
            >
              <Icon icon="qlementine-icons:save-24" />
            </button>
          </>
        )}
      </div>
      <div className="action-buttons">
        <ThemeController />
        <button className="create-button">Create New</button>
      </div>
    </header>
  );
};
export default FlowHeader;
