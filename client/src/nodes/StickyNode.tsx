import { useRef } from "react";
import { Node, NodeHeader, NodeContent } from "../components/Node";
import { cn } from "../lib/utils";

const colors = [
  "#f87171AA",
  "#fbbf24AA",
  "#38bdf8AA",
  "#2dd4bfAA",
  "#818cf8AA",
  "#f472b6AA",
  "#fb7185AA",
];

let colorIndex = 0;

export const StickyNode = ({ selected }: { selected: boolean }) => {
  const colorRef = useRef(colors[colorIndex % colors.length]);
  colorIndex++;

  return (
    <Node
      resizable
      selected={selected}
      className={cn("p-2 rounded-none border-2 h-full bg-opacity-50")}
      style={{
        backgroundColor: colorRef.current,
        borderColor: colorRef.current,
      }}
    >
      <NodeHeader>
        <input
          type="text"
          placeholder="Heading"
          className="bg-inherit text-foreground text-xl"
        />
      </NodeHeader>
      <NodeContent className="px-6 py-4 h-full">
        <textarea
          name="comment"
          className="resize-none select-none w-[calc(100%)] h-[calc(100%-3rem)] bg-inherit text-foreground placeholder:text-foreground/80 text-lg"
        ></textarea>
      </NodeContent>
    </Node>
  );
};
