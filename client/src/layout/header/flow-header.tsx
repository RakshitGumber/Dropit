import { ThemeController } from "@/components/controller";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./flow-header.scss";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { createFlow } from "@/api";

const FlowHeader = () => {
  const [flowName, setFlowName] = useState("Untitled");
  const [editName, setEditName] = useState(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => setEditName(false));

  return (
    <header className="flow-header">
      <div className="flux-actions">
        <div
          onDoubleClick={() => setEditName(true)}
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
            <button onClick={() => createFlow}>
              <Icon icon="qlementine-icons:save-24" />
            </button>
          </>
        )}
      </div>
      <div className="action-buttons">
        <button className="create-button">Create New</button>
        <ThemeController />
      </div>
    </header>
  );
};
export default FlowHeader;
