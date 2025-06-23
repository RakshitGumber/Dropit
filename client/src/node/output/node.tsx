import { NodeTemplate } from "@/components/base";
import { useHandleConnections, useNodesData } from "@xyflow/react";
import showdown from "showdown";

const GeminiRender = ({ response }: { response?: any }) => {
  let converter = new showdown.Converter();
  let text = response?.data?.summary;
  let html = converter.makeHtml(text);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export const OutputNode: React.FC<{ id: string }> = ({ id }) => {
  const summaryConnections = useHandleConnections({
    type: "target",
    id: `${id}-value`,
  });
  const response = useNodesData(summaryConnections?.[0]?.source);

  return (
    <NodeTemplate
      title="Output"
      content={<OutputResponse response={response} />}
      target={[{ id: `${id}-value` }]}
    />
  );
};

const OutputResponse = ({ response }: { response: any }) => {
  return (
    <div>
      {response &&
      response?.type &&
      ["gemini", "summarize"].includes(response.type) ? (
        <GeminiRender response={response} />
      ) : (
        response?.type === "text" ||
        (response?.type === "concat" && (
          <div
            dangerouslySetInnerHTML={{ __html: response.data.renderValue }}
          />
        ))
      )}
    </div>
  );
};
