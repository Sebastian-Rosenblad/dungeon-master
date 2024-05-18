import React from "react";

interface InputTextPropsM {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function InputTextC(props: InputTextPropsM): JSX.Element {
  const { label, placeholder, value, onChange } = props;

  return <div className="input-text">
    {label && <label>{label}</label>}
    <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
  </div>;
}
