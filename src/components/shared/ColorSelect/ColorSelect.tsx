import React, { useState } from "react";
import "./ColorSelect.scss";
import { PopupWrapperC } from "../PopupWrapper";
import { SketchPicker } from "react-color";

export interface ColorSelectPropsM {
  value: string
  onChange: (value: string) => void;
}

export function ColorSelectC({ value, onChange }: ColorSelectPropsM): JSX.Element {
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number } | null>(null);

  function handleCircleClick(evt: React.MouseEvent) {
    setMenuPosition({ x: evt.clientX, y: evt.clientY });
  }
  function handleChangeComplete(color: { hex: string }) {
    onChange(color.hex);
  }

  return (
    <div className="color-select">
      <div
        className="color-select--circle"
        style={{ backgroundColor: value }}
        onClick={handleCircleClick}
      />
      {menuPosition !== null && (
        <PopupWrapperC x={menuPosition.x} y={menuPosition.y} onClose={() => setMenuPosition(null)}>
          <div className="color-select--picker">
            <SketchPicker color={value} onChangeComplete={handleChangeComplete} />
          </div>
        </PopupWrapperC>
      )}
    </div>
  );
}
