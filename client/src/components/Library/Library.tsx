import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { cn } from "../../lib/utils";
import { DraggableNode } from "../DraggableNode";
import { getAllKeys, getRegistration } from "@/registry/registry";

export const Library = () => {
  const [isClosed, setIsClosed] = useState(false);
  return (
    <div>
      <div
        className={cn(
          "absolute w-[17rem] top-14 left-0 p-4 bottom-0 bg-background z-50 border-r overflow-y-auto transition-all",
          isClosed ? "-translate-x-[17rem]" : "translate-x-0"
        )}
      >
        {getAllKeys().map((key) => {
          const registration = getRegistration(key)!;
          return (
            <DraggableNode
              key={key}
              type={registration.nodeType}
              label={registration.label}
            />
          );
        })}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute z-50 top-1/2 -translate-y-1/2 opacity-20 hover:opacity-100 transition-all",
          !isClosed ? "left-[17rem]" : "left-0"
        )}
        onClick={() => setIsClosed(!isClosed)}
      >
        {isClosed ? <RiArrowRightWideLine /> : <RiArrowLeftWideLine />}
      </Button>
    </div>
  );
};
