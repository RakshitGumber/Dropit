import { Node, NodeContent } from "@/components/base";
import "./text.scss";

import { useState } from "react";

interface InputNodeProps {
  data: {
    value: string;
    onChange: (val: string) => void;
  };
}

const TextNode: React.FC<InputNodeProps> = ({ data }) => {
  const [value, setValue] = useState("Text");
  const [edit, setEdit] = useState(false);

  return (
    <Node source={[{ id: "s1" }]}>
      <NodeContent>
        {edit ? (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setEdit(false)}
          />
        ) : (
          <span onDoubleClick={() => setEdit(true)}>{value}</span>
        )}
      </NodeContent>
    </Node>
  );
};
export default TextNode;
