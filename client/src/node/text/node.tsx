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
    <div
      className="node"
      onDoubleClick={() => setEdit(true)}
      onBlur={() => setEdit(false)}
    >
      {edit ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
};
export default TextNode;
