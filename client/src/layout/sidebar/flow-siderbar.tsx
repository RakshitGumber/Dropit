import { useEffect, useRef, useState } from "react";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { getAllKeys, getRegistration } from "@/registry";
import "./flow-sidebar.scss";

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [width, setWidth] = useState(240);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      ref={sidebarRef}
      className={`toolbar-sidebar ${isClosed ? "closed" : ""}`}
      style={{ width: isClosed ? 40 : width }}
    >
      <div
        className="resize-handle"
        onMouseDown={() => (isResizingRef.current = true)}
      />

      {!isClosed && (
        <div className="toolbar-content">
          {getAllKeys().map((key) => {
            const registration = getRegistration(key)!;
            return (
              <div
                key={key}
                className="toolbar-card"
                draggable
                onDragStart={(e) => onDragStart(e, registration.nodeType)}
              >
                <strong>{registration.label}</strong>
              </div>
            );
          })}
        </div>
      )}

      <button
        className="collapse-toggle"
        onClick={() => setIsClosed(!isClosed)}
      >
        {isClosed ? <RiArrowRightWideLine /> : <RiArrowLeftWideLine />}
      </button>
    </div>
  );
};

export default Sidebar;
