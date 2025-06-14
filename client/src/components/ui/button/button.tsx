import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant: "icon" | "default" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, variant }) => {
  return <div className={`btn-${variant}`}>{children}</div>;
};

export default Button;
