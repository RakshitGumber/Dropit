import React, { useState, useEffect } from "react";
import { Node, NodeHeader, NodeContent } from "@/components/base";
import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

interface Parameter {
  key: string;
  value: string;
}

export const TextNode: React.FC<{
  id: string;
  selected: boolean;
}> = ({ id, selected }): React.ReactElement => {
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
        <NodeContent>
          <textarea
            placeholder="Enter a Text"
            value={value}
            onChange={handleChange}
            onBlur={handleChange}
          />
        </NodeContent>
      </Node>
      <span>{renderValue}</span>
    </>
  );
};
