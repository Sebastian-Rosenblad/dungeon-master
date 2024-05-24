import React from "react";
import "./IconButton.scss";
import { IconC } from "../Icon";

interface IconButtonPropsM {
  icon: string;
  size?: "small" | "medium" | "large";
  transparent?: boolean;
  onClick: (evt: React.MouseEvent) => void;
  onMouseEnter?: (evt: React.MouseEvent) => void;
  onMouseLeave?: (evt: React.MouseEvent) => void;
}

export function IconButtonC({ icon, size = "medium", transparent, onClick, onMouseEnter, onMouseLeave }: IconButtonPropsM): JSX.Element {
  return (
    <button
      className={["icon-button", size, transparent && "transparent"].join(" ")}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon && <IconC name={icon} size={size} />}
    </button>
  );
}
