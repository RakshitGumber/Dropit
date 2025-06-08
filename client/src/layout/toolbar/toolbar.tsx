import "./toolbar.scss";

const nodeTypes = [
  { type: "text", label: "Text Node" },
  { type: "output", label: "Output Node" },
];

const Toolbar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="toolbar">
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="toolbar-item"
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
