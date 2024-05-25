import React from 'react';
import "./ToggleButton.scss";
import { IconC } from '../Icon';

interface ToggleButtonPropsM {
  left: { icon?: string; label: string; value: string; };
  right: { icon?: string; label: string; value: string; };
  value: string;
  onChange: (value: string) => void;
}

export function ToggleButtonC({ left, right, value, onChange }: ToggleButtonPropsM) {
  function handleClick(newValue: string) {
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <div className="toggle-button">
      <button
        className={`toggle-button--option ${value === left.value ? 'active' : ''}`}
        onClick={() => handleClick(left.value)}
      >
        {left.icon && <IconC name={left.icon} />}
        <span>{left.label}</span>
      </button>
      <button
        className={`toggle-button--option ${value === right.value ? 'active' : ''}`}
        onClick={() => handleClick(right.value)}
      >
        {right.icon && <IconC name={right.icon} />}
        <span>{right.label}</span>
      </button>
    </div>
  );
}
