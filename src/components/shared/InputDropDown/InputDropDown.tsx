import React from "react";
import "./InputDropDown.scss";

interface InputDropDownPropsM {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function InputDropDownC({ label, value, options, onChange }: InputDropDownPropsM): JSX.Element {
  return (
    <div className="input-drop-down">
      <label>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
