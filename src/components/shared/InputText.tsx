import React from "react";

interface InputTextPropsM {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function InputTextC({ label, placeholder, value, onChange }: InputTextPropsM): JSX.Element {
  return <div className="input-text">
    {label && <label>{label}</label>}
    <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
  </div>;
}
