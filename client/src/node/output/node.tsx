import { Node, NodeContent, NodeHeader } from "@/components/base";
import { useHandleConnections, useNodesData } from "@xyflow/react";
import showdown from "showdown";

const GeminiRender = ({ response }: { response?: any }) => {
  let converter = new showdown.Converter();
  let text = response?.data?.summary;
  let html = converter.makeHtml(text);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export const OutputNode = ({ id }: { id: string; selected: boolean }) => {
  const summaryConnections = useHandleConnections({
    type: "target",
    id: `${id}-value`,
  });
  const response = useNodesData(summaryConnections?.[0]?.source);

  return (
    <Node target={[{ id: `${id}-value` }]}>
      <NodeHeader>OutputNode</NodeHeader>
      <NodeContent>
        {response &&
        response?.type &&
        ["gemini", "summarize"].includes(response.type) ? (
          <GeminiRender response={response} />
        ) : (
          response?.type === "text" && (
            <p>{response.data.renderValue as string}</p>
          )
        )}
      </NodeContent>
    </Node>
  );
};
