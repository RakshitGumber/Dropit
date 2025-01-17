import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Handle, NodeResizer, Position } from "@xyflow/react";

// Define the handle interface
interface HandleData {
  id: string;
  style?: React.CSSProperties;
}
// Define interface for components that can receive dimensions
interface WithDimensions {
  dimensions?: Dimensions;
}
// Define Node props interface
interface NodeProps {
  children: React.ReactNode;
  className?: string;
  target?: HandleData[];
  source?: HandleData[];
  style?: React.CSSProperties;
  resizable?: boolean;
  selected?: boolean;
}

// Define dimensions interface
interface Dimensions {
  width: number;
  height: number;
}

export const Node: React.FC<NodeProps> = ({
  children,
  className,
  target,
  source,
  style,
  resizable = false,
  selected = false,
}) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 200,
    height: 100,
  });
  const [display] = useState(true);

  return (
    <div
      className={cn("w-full h-full bg-card border rounded-lg", className)}
      style={style}
    >
      {resizable && (
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={100}
          minHeight={107}
          onResize={(_, { width, height }) => {
            setDimensions({ width, height });
          }}
        />
      )}
      {target &&
        target.map(({ id, style }, i) => (
          <Handle
            type="target"
            position={Position.Left}
            id={id}
            key={id}
            style={{
              top: `${
                target.length > 1 ? ((i + 1) * 100) / (target.length + 1) : "50"
              }%`,
              ...style,
            }}
          />
        ))}
      {display &&
        React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<WithDimensions>, {
                dimensions,
              })
            : child
        )}
      {source &&
        source.map(({ id, style }, i) => (
          <Handle
            type="source" // Fixed typo from "taget" to "source"
            position={Position.Right}
            id={id}
            key={id}
            style={{
              top: `${
                source.length > 1
                  ? ((i + 1) * 100) / (source.length + 1) // Fixed from target.length to source.length
                  : "50"
              }%`,
              ...style,
            }}
          />
        ))}
    </div>
  );
};

// Define NodeHeader props interface
interface NodeHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const NodeHeader: React.FC<NodeHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 px-6 py-3 font-semibold relative",
        className
      )}
    >
      {children}
    </div>
  );
};

// Define NodeContent props interface
interface NodeContentProps {
  children?: React.ReactNode;
  className?: string;
}

export const NodeContent: React.FC<NodeContentProps> = ({
  children,
  className,
}) => {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
};

// Define NodeTemplate props interface
interface NodeTemplateProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  target?: HandleData[];
  source?: HandleData[];
  id?: string;
}

export const NodeTemplate: React.FC<NodeTemplateProps> = (props) => {
  return (
    <Node
      className={cn(props.className)}
      target={props.target}
      source={props.source}
    >
      <NodeHeader>{props.title}</NodeHeader>
      <NodeContent>{props.content}</NodeContent>
    </Node>
  );
};
