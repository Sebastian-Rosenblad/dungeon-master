import React, { useRef, useState } from "react";
import "./InputDropdown.scss";
import { IconC } from "../Icon";
import { PopupWrapperC } from "../PopupWrapper";

interface InputDropdownItemM {
  icon?: string;
  label: string;
  textColor?: string;
  iconFill?: string;
  iconBackground?: string;
  value: string;
}
interface InputDropdownPropsM {
  label?: string;
  value: string;
  options: InputDropdownItemM[];
  onChange: (value: string) => void;
}

export function InputDropdownC({ label, value, options, onChange }: InputDropdownPropsM): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItem = options.find(option => option.value === value);

  function handleToggle() {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setMenuPosition({ x: rect.left, y: rect.bottom + 1 });
    }
    setIsOpen(!isOpen);
  }
  function handleSelect(optionValue: string) {
    onChange(optionValue);
    setIsOpen(false);
  }
  function handleCloseMenu() {
    setIsOpen(false);
  }

  return (
    <div className="input-dropdown">
      {label && <label><b>{label}</b></label>}
      <div className="input-dropdown--header" ref={dropdownRef} onClick={handleToggle}>
        {selectedItem?.icon && <IconC name={selectedItem.icon} />}
        <p>{selectedItem?.label}</p>
        <IconC name="cheveron-down" />
      </div>
      {isOpen && (
        <PopupWrapperC x={menuPosition.x} y={menuPosition.y} onClose={handleCloseMenu}>
          <div className="input-dropdown--menu">
            {options.map(option => (
              <div
                key={option.value}
                className="input-dropdown--menu--item"
                onClick={() => handleSelect(option.value)}
              >
                {option.icon && (
                  <div className="input-dropdown--menu--item--icon" style={{ backgroundColor: option.iconBackground }}>
                    <IconC name={option.icon} fill={option.iconFill} />
                  </div>
                )}
                <p style={{ color: option.textColor }}>{option.label}</p>
              </div>
            ))}
          </div>
        </PopupWrapperC>
      )}
    </div>
  );
}
