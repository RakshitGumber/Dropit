import { NodeTemplate } from "@/components/base";
import { Icon } from "@iconify/react";
import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import toast from "react-hot-toast";

export const GeminiNode = ({ id }: { id: string }) => {
  const textConnections = useHandleConnections({
    type: "target",
    id: `${id}-input`,
  });
  const textData = useNodesData(textConnections?.[0]?.source);
  const { updateNodeData } = useReactFlow();

  const FetchSummary = async () => {
    try {
      const response = await fetch(
        "https://dropit-er31.onrender.com/pipelines/ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `pipeline=${textData?.data?.value}`,
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const res = await response.json();
      updateNodeData(id, { ...res });
    } catch (error) {}
  };

  const handleButtonClick = async () => {
    await toast.promise(FetchSummary(), {
      loading: "Generating Response...",
      success: "Summary generated successfully",
      error: "Error generating summary",
    });
  };

  return (
    <NodeTemplate
      className="w-fit"
      title="Gemini"
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
        <Icon icon="fa:google" />
      </button>
    </div>
  );
};
