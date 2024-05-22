import React from "react";
import "./ButtonIcon.scss";
import { IconC } from "./Icon";

interface ButtonIconPropsM {
  icon: string;
  small?: boolean;
  onClick: () => void;
}

export function ButtonIconC({ icon, small, onClick }: ButtonIconPropsM): JSX.Element {
  return <button className={["button-icon", small ? "small" : ""].join(" ")} onClick={onClick}>
    {icon && <IconC name={icon} />}
  </button>;
}
