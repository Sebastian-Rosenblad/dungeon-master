import React from "react";
import "./Button.scss";
import { IconC } from "../Icon";

interface ButtonPropsM {
  icon?: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

export function ButtonC({ icon, label, active, onClick }: ButtonPropsM): JSX.Element {
  return (
    <button className={`button ${active && "active"}`} onClick={onClick}>
      {icon && <IconC name={icon} size="small" />}
      <span>{label}</span>
    </button>
  );
}
