import React, { useEffect, useState } from "react";
import "./IconSelect.scss";
import { IconButtonC } from "../IconButton";
import { PopupWrapperC } from "../PopupWrapper";

export interface IconSelectPropsM {
  value: string;
  fill?: string;
  background?: string;
  onChange: (value: string) => void;
}

export function IconSelectC({ value, fill, background, onChange }: IconSelectPropsM): JSX.Element {
  const [icons, setIcons] = useState<string[]>([]);
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    fetch('/symbol-defs.svg')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, 'image/svg+xml');
        const symbols = svgDoc.getElementsByTagName('symbol');
        const iconNames = Array.from(symbols).map(symbol => symbol.id.slice(5)).sort((a, b) => a.localeCompare(b));
        setIcons(iconNames);
      })
      .catch(error => console.error('Error loading SVG symbols:', error));
  }, []);
  
  function handleOpenMenu(evt: React.MouseEvent) {
    setMenuPosition({ x: evt.clientX, y: evt.clientY });
  }

  return <div className="icon-select">
    <IconButtonC icon={value} fill={fill} background={background} onClick={(evt) => handleOpenMenu(evt)} />
    {menuPosition !== null && (
      <PopupWrapperC x={menuPosition.x} y={menuPosition.y} onClose={() => setMenuPosition(null)}>
        {icons.map(icon => (
          <IconButtonC key={icon} icon={icon} fill={fill} background={background} onClick={() => { onChange(icon); setMenuPosition(null); }} />
        ))}
      </PopupWrapperC>
    )}
  </div>;
}
