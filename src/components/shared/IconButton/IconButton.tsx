import React from "react";
import "./IconButton.scss";
import { IconC } from "../Icon";

interface IconButtonPropsM {
  icon: string;
  fill?: string;
  size?: "small" | "medium" | "large";
  background?: string;
  transparent?: boolean;
  onClick: (evt: React.MouseEvent) => void;
  onMouseEnter?: (evt: React.MouseEvent) => void;
  onMouseLeave?: (evt: React.MouseEvent) => void;
}

export function IconButtonC({ icon, fill, size = "medium", background, transparent, onClick, onMouseEnter, onMouseLeave }: IconButtonPropsM): JSX.Element {
  return (
    <button
      className={["icon-button", size, transparent ? "transparent" : "", background ? "has-background" : ""].join(" ")}
      style={{ backgroundColor: background }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon && <IconC name={icon} fill={fill} size={size} />}
    </button>
  );
}
