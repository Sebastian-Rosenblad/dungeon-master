import React from "react";
import "./Button.scss";
import { IconC } from "./Icon";

interface ButtonPropsM {
  icon?: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}

export function ButtonC({ icon, label, onClick, active }: ButtonPropsM): JSX.Element {
  return <button className="button" onClick={onClick}>
    {icon && <IconC name={icon} size="small" />}
    <span>{label}</span>
  </button>;
}
