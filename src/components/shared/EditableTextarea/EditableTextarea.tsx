import React, { useState } from "react";
import "./EditableTextarea.scss";
import { IconC } from "../Icon";
import { IconButtonC } from "../IconButton";

interface EditableTextareaProps {
  text: string;
  label?: string;
  placeholder?: string;
  onSave: (text: string) => void;
}

export function EditableTextareaC({ text, label, placeholder, onSave }: EditableTextareaProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);

  function handleSave(): void {
    setIsEditing(false);
    onSave(value);
  }
  function handleCancel(): void {
    setIsEditing(false);
    setValue(text);
  }

  return (
    <div className="editable-textarea">
      {label && <label><b>{label}</b></label>}
      {isEditing ? (
        <div className="editable-textarea--editing">
          <textarea value={value} onChange={evt => setValue(evt.target.value)} className="editable-text--p" />
          <div className="editable-textarea--editing--buttons">
            <IconButtonC icon="edit-save" onClick={handleSave} />
            <IconButtonC icon="edit-cancel" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        <div className="editable-textarea--display" onClick={() => setIsEditing(true)}>
          {value && <p>{value}</p>}
          {!value && <p className="placeholder">{placeholder}</p>}
          <IconC name="edit-start" />
        </div>
      )}
    </div>
  );
}
