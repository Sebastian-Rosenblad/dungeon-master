import React from "react";

interface InputDropDownPropsM {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function InputDropDownC({ label, options, value, onChange }: InputDropDownPropsM): JSX.Element {
  return <div className="input-drop-down">
    <label>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>;
}
