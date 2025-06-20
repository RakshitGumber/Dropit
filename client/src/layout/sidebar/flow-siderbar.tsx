import { useRef, useState } from "react";
import { getAllKeys, getRegistration } from "@/registry";
import "./flow-sidebar.scss";

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      ref={sidebarRef}
      className={`toolbar-sidebar ${isClosed ? "closed" : ""}`}
    >
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
                {registration.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
