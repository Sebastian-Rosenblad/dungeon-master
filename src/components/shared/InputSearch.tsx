import React, { useRef } from "react";
import "./InputSearch.scss";
import { IconC } from "./Icon";

interface InputSearchPropsM {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function InputSearchC({ label, placeholder, value, onChange }: InputSearchPropsM): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleWrapperClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return <div className="input-search">
    {label && <label>{label}</label>}
    <div className="input-search--wrapper" onClick={handleWrapperClick}>
      <IconC name="search" size="small" />
      <input ref={inputRef} type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  </div>;
}
