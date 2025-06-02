import React from "react";

interface OutputNodeProps {
  data: {
    inputValue: string;
  };
}

const OutputNode: React.FC<OutputNodeProps> = ({ data }) => {
  return <div>Output: {data.inputValue}</div>;
};

export default OutputNode;
