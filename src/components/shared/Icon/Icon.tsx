import React from "react";
import "./Icon.scss";

interface IconPropsM {
  name: string;
  fill?: string;
  size?: "small" | "medium" | "large";
}

export function IconC({ name, fill, size = "medium" }: IconPropsM): JSX.Element {
  return (
    <svg className={`icon icon--${size}`} style={{ fill: fill }}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
}
