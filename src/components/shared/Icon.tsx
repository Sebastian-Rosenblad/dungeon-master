import React from "react";
import "./Icon.scss";

interface IconPropsM {
  name: string;
  size?: "small" | "medium" | "large";
}

export function IconC({ name, size = "medium" }: IconPropsM): JSX.Element {
  return <svg className={`icon icon--${size}`}>
    <use xlinkHref={`#icon-${name}`} />
  </svg>;
}
