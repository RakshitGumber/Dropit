import React, { useState, useEffect } from "react";
import { Node, NodeHeader, NodeContent } from "../components/Node";
import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { cn } from "../lib/utils";

interface Parameter {
  key: string;
  value: string;
}

export const TextNode = ({
  id,
  selected,
}: {
  id: string;
  selected: boolean;
}) => {
  const [value, setValue] = useState("");
  const [renderValue, setRenderValue] = useState("");
  const variablesConnections = useHandleConnections({
    type: "target",
    id: `${id}-input`,
  });
  const variablesData = useNodesData(variablesConnections?.[0]?.source);
  const { updateNodeData } = useReactFlow();

  const addParameters = (template: string, parameters: Parameter[]) => {
    return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
      const param = parameters.find((param) => param.key === key);
      if (param) {
        // Fixed the logical expression that was using bitwise OR
        return param.value && param.value.length > 0
          ? param.value
          : `{{${key}}}`;
      }
      return match;
    });
  };

  useEffect(() => {
    const parameters = variablesData?.data?.value;
    if (Array.isArray(parameters)) {
      const newVal = addParameters(value, parameters);
      updateNodeData(id, { value, renderValue: newVal });
      setRenderValue(newVal);
    }
  }, [variablesData?.data?.value, value, id, updateNodeData]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const parameters = variablesData?.data?.value;
    const newVal = addParameters(
      e.target.value,
      Array.isArray(parameters) ? parameters : []
    );
    updateNodeData(id, { value: e.target.value, renderValue: newVal });
    setRenderValue(newVal);
    setValue(e.target.value);
  };

  return (
    <>
      <Node
        source={[{ id: `${id}-output` }]}
        target={[{ id: `${id}-input` }]}
        selected={selected}
        resizable
      >
        <NodeHeader>Text</NodeHeader>
        <NodeContent className="flex flex-col gap-2 h-[calc(100%-3rem)]">
          <textarea
            placeholder="Enter a Text"
            value={value}
            className={cn("input nodrag w-full h-full resize-none")}
            onChange={handleChange}
            onBlur={handleChange}
          />
        </NodeContent>
      </Node>
      <span>{renderValue}</span>
    </>
  );
};
