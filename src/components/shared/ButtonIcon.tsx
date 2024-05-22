import React from "react";
import "./ButtonIcon.scss";
import { IconC } from "./Icon";

interface ButtonIconPropsM {
  icon: string;
  size?: "small" | "medium" | "large";
  transparent?: boolean;
  onClick: (evt: React.MouseEvent) => void;
  onMouseEnter?: (evt: React.MouseEvent) => void;
  onMouseLeave?: (evt: React.MouseEvent) => void;
}

export function ButtonIconC({ icon, size = "medium", transparent, onClick, onMouseEnter, onMouseLeave }: ButtonIconPropsM): JSX.Element {
  return (
    <button
      className={["button-icon", size, transparent && "transparent"].join(" ")}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon && <IconC name={icon} size={size} />}
    </button>
  );
}
