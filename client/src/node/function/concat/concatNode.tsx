import { NodeTemplate } from "@/components/base";
import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { useEffect, useState } from "react";

const ConcatNode: React.FC<{ id: string }> = ({ id }) => {
  const inputHandles = [`${id}-input-text-0`, `${id}-input-text-1`];
  const [sep, setSep] = useState(" ");
  const { updateNodeData } = useReactFlow();

  const connections = inputHandles.map((handleId) => {
    const conns = useHandleConnections({ type: "target", id: handleId });
    return conns?.[0]?.source || null;
  });

  const nodeDataList = connections.map((sourceId) =>
    useNodesData(sourceId || "invalid-id")
  );

  const result = nodeDataList
    .filter((_, index) => connections[index])
    .map((data) => data?.data?.value || "")
    .join(sep);

  useEffect(() => {
    updateNodeData(id, {
      value: result,
      // @ts-ignore
      renderValue: result.replaceAll("\n", "<br/>"),
    });
  }, [result, sep, id, updateNodeData]);

  return (
    <NodeTemplate
      title={
        <>
          <div className="with-select">
            <h1>Concat</h1>
            <select
              name="sep"
              id="sep"
              value={sep}
              onChange={(e) => setSep(e.target.value)}
            >
              <option value=" ">space</option>
              <option value="<br/>">new line</option>
              <option value=", ">comma</option>
            </select>
          </div>
        </>
      }
      source={[{ id: `${id}-output` }]}
      target={inputHandles.map((id) => ({ id }))}
      content={
        <div
          // @ts-ignore
          dangerouslySetInnerHTML={{ __html: result.replaceAll("\n", "<br/>") }}
        />
      }
    />
  );
};

export default ConcatNode;
