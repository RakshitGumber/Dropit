import { useState } from "react";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { getAllKeys, getRegistration } from "@/registry";

const toolbar = () => {
  const [isClosed, setIsClosed] = useState(false);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <div>
        {getAllKeys().map((key) => {
          const registration = getRegistration(key)!;
          return (
            <div
              key={key}
              className="toolbar-item cursor-grab active:cursor-grabbing p-2 mb-2 border rounded hover:bg-gray-50 transition-colors"
              draggable
              onDragStart={(event) => onDragStart(event, registration.nodeType)}
            >
              {registration.label}
            </div>
          );
        })}
      </div>
      <button onClick={() => setIsClosed(!isClosed)}>
        {isClosed ? <RiArrowRightWideLine /> : <RiArrowLeftWideLine />}
      </button>
    </div>
  );
};

export default toolbar;
