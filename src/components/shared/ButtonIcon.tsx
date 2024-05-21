import React from "react";
import "./ButtonIcon.scss";

interface ButtonIconPropsM {
  icon: string;
  small?: boolean;
  onClick: () => void;
}

export function ButtonIconC({ icon, small, onClick }: ButtonIconPropsM): JSX.Element {
  return <button className={["button-icon", small ? "small" : ""].join(" ")} onClick={onClick}>
    {icon && <svg className="icon">
      <use xlinkHref={`#icon-${icon}`} />
    </svg>}
  </button>;
}
