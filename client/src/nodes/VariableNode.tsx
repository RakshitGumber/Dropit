import { useState } from "react";
import { NodeTemplate } from "../components";
import { useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";

// Define types for variable objects
interface Variable {
  key?: string;
  value?: string;
}

// Define props for the VariableNode component
interface VariableNodeProps {
  id: string;
  data: {
    value: Variable[];
  };
}

// Define props for the Variable component
interface VariableProps {
  num: number;
  handleVariableChange: (
    index: number,
    type: "key" | "value",
    value: string
  ) => void;
}

// Define props for the VariableNodeComponent
interface VariableNodeComponentProps {
  handleAddVariable: () => void;
  handleVariableChange: (
    index: number,
    type: "key" | "value",
    value: string
  ) => void;
  variables: Variable[];
}

export const VariableNode = ({ id, data }: VariableNodeProps) => {
  const [variables, setTextVariables] = useState<Variable[]>(data?.value || []);
  const { updateNodeData } = useReactFlow();

  const handleAddVariable = () => {
    setTextVariables([...variables, {}]);
  };

  const handleVariableChange = (
    index: number,
    type: "key" | "value",
    value: string
  ) => {
    const updatedVariables = [...variables];
    updatedVariables[index][type] = value;
    setTextVariables(updatedVariables);
    updateNodeData(id, { value: updatedVariables });
  };

  return (
    <NodeTemplate
      title="Variables"
      id={id}
      content={
        <VariableNodeComponent
          handleAddVariable={handleAddVariable}
          handleVariableChange={handleVariableChange}
          variables={variables}
        />
      }
      source={[{ id: `${id}-value` }]}
    />
  );
};

export const Variable = ({ num, handleVariableChange }: VariableProps) => {
  return (
    <div className="grid grid-cols-[100px_200px] gap-4" key={num}>
      <input
        type="text"
        name="key"
        id={`key-${num}`}
        placeholder="Key"
        className="input"
        onChange={(e) => handleVariableChange(num, "key", e.target.value)}
        onBlur={(e) => handleVariableChange(num, "key", e.target.value)}
      />
      <input
        type="text"
        name="value"
        id={`value-${num}`}
        placeholder="Value"
        className="input"
        onChange={(e) => handleVariableChange(num, "value", e.target.value)}
        onBlur={(e) => handleVariableChange(num, "value", e.target.value)}
      />
    </div>
  );
};

const VariableNodeComponent = ({
  handleAddVariable,
  handleVariableChange,
  variables,
}: VariableNodeComponentProps) => {
  return (
    <div className="max-w-sm flex flex-col gap-5 items-center">
      {variables.map((_, index) => (
        <Variable
          num={index}
          key={index}
          handleVariableChange={handleVariableChange}
        />
      ))}
      <Button className="w-full" onClick={handleAddVariable}>
        + Add Variable
      </Button>
    </div>
  );
};
