import { NodeTemplate } from "@/components/base";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import toast from "react-hot-toast";

export const SummarizeNode = ({ id }: { id: string }) => {
  const textConnections = useHandleConnections({
    type: "target",
    id: `${id}-input`,
  });
  const textData = useNodesData(textConnections?.[0]?.source);
  const { updateNodeData } = useReactFlow();

  const handleButtonClick = async () => {
    await toast.promise(FetchSummary(), {
      loading: "Generating summary...",
      success: "Summary generated successfully",
      error: "Error generating summary",
    });
  };

  const FetchSummary = async () => {
    try {
      let response;
      if (textData?.type === "text") {
        response = await fetch(
          "https://dropit-er31.onrender.com/pipelines/summarize",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `pipeline=${textData?.data?.value}`,
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
      } else if (textData?.type === "gemini") {
        response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/pipelines/summarize",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `pipeline=${textData?.data?.summary}`,
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const res = await response.json();
        updateNodeData(id, { ...res });
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <NodeTemplate
      className="w-fit"
      title="Summarize"
      source={[{ id: `${id}-output` }]}
      target={[{ id: `${id}-input` }]}
      content={<Summarize handleButtonClick={handleButtonClick} />}
    />
  );
};

const Summarize = ({
  handleButtonClick,
}: {
  handleButtonClick: () => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <button onClick={handleButtonClick}>
        <Icon icon="fa:magic" />
      </button>
    </div>
  );
};
