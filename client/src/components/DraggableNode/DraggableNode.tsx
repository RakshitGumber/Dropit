import { cn } from "../../lib/utils";

export const DraggableNode = ({
  type,
  label,
  icon,
}: {
  type: string;
  label: string;
  icon?: JSX.Element;
}) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    const appData = { nodeType };
    if (event.target instanceof HTMLElement)
      event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={cn(
        type,
        "flex flex-col items-center gap-1 hover:bg-card hover:text-primary h-fit py-4 rounded-xl"
      )}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        if (event.target instanceof HTMLElement)
          event.target.style.cursor = "grab";
      }}
      draggable
    >
      <div
        className={
          "cursor-grab, w-16 h-16 flex items-center justify-center bg-primary rounded-md"
        }
      >
        {icon ? (
          <icon.type className="text-primary-foreground" size={50} />
        ) : (
          <span className="text-primary-foreground">{label}</span>
        )}
      </div>
      <span>{label}</span>
    </div>
  );
};
