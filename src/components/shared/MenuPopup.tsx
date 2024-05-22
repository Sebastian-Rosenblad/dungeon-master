import React, { useEffect, useRef } from "react";
import "./MenuPopup.scss";
import { IconC } from "./Icon";

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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  useEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        menu.style.left = `${window.innerWidth - rect.width}px`;
      }
      if (rect.bottom > window.innerHeight) {
        menu.style.top = `${window.innerHeight - rect.height}px`;
      }
    }
  }, [x, y]);

  return <div className="menu-popup" ref={menuRef} style={{ top: y, left: x }}>
    {items.map((item, index) => (
      <button key={`menu-item-${index}`} className="menu-popup--item" onClick={item.onClick}>
        {item.icon && <IconC name={item.icon} size="small" />}
        <span>{item.label}</span>
      </button>
    ))}
  </div>;
}
