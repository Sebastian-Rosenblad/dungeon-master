import React from "react";
import "./Button.scss";

interface ButtonPropsM {
  icon?: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}

export function ButtonC({ icon, label, onClick, active }: ButtonPropsM): JSX.Element {
  return <button className="button" onClick={onClick}>
    {icon && <svg className="icon-small">
      <use xlinkHref={`#icon-${icon}`} />
    </svg>}
    <span>{label}</span>
  </button>;
}
