import React from "react";
import "./Button.scss";
import { IconC } from "../Icon";

interface ButtonPropsM {
  icon?: string;
  label: string;
  size?: "small" | "medium";
  transparent?: boolean;
  onClick: () => void;
}

export function ButtonC({ icon, label, size = "medium", transparent, onClick }: ButtonPropsM): JSX.Element {
  return (
    <button className={`button ${size} ${transparent ? "transparent" : ""}`} onClick={onClick}>
      {icon && <IconC name={icon} size="small" />}
      <span>{label}</span>
    </button>
  );
}
