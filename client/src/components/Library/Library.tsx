import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { cn } from "../../lib/utils";
import { DraggableNode } from "../DraggableNode";
import {
  IconAbc,
  IconCursorText,
  IconBrandDatabricks,
  IconStepOut,
  IconVariable,
  IconZodiacGemini,
  IconInvoice,
  IconSticker2,
  IconMail,
} from "@tabler/icons-react";

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
        <h1 className="text-xl font-medium">Inputs</h1>
        <div className="grid grid-cols-2">
          <DraggableNode type="text" label="Text" icon={<IconAbc />} />
          <DraggableNode
            type="customInput"
            label="Input"
            icon={<IconCursorText />}
          />
          <DraggableNode
            type="variables"
            label="Variables"
            icon={<IconVariable />}
          />
        </div>
        <h1 className="text-xl font-medium">Models</h1>
        <div className="grid grid-cols-2 gap-4 ">
          <DraggableNode
            type="llm"
            label="LLM"
            icon={<IconBrandDatabricks />}
          />
          <DraggableNode
            type="summarize"
            label="Summary"
            icon={<IconInvoice />}
          />
          <DraggableNode
            type="gemini"
            label="Gemini"
            icon={<IconZodiacGemini />}
          />
        </div>
        <h1 className="text-xl font-medium">Output</h1>
        <div className="grid grid-cols-2 gap-4 ">
          <DraggableNode
            type="customOutput"
            label="Output"
            icon={<IconStepOut />}
          />
          <DraggableNode
            type="sendMail"
            label="Send Mail"
            icon={<IconMail />}
          />
        </div>
        <h1 className="text-xl font-medium">Misc</h1>
        <div className="grid grid-cols-2 gap-4 ">
          <DraggableNode
            type="stickyNote"
            label="Sticky Note"
            icon={<IconSticker2 />}
          />
        </div>
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
