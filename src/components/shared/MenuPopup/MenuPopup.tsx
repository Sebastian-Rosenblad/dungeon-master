import React from "react";
import "./MenuPopup.scss";
import { IconC } from "../Icon";
import { PopupWrapperC } from "../PopupWrapper";

interface MenuItemM {
  label: string;
  icon?: string;
  onClick: () => void;
}
interface MenuPopupPropsM {
  x: number;
  y: number;
  items: MenuItemM[];
  onClose: () => void;
}

export function MenuPopupC({ x, y, items, onClose }: MenuPopupPropsM): JSX.Element {
  return (
    <PopupWrapperC x={x} y={y} onClose={onClose}>
      <div className="menu-popup">
        {items.map((item, index) => (
          <button key={`menu-item-${index}`} className="menu-popup--item" onClick={item.onClick}>
            {item.icon && <IconC name={item.icon} size="small" />}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </PopupWrapperC>
  );
}
