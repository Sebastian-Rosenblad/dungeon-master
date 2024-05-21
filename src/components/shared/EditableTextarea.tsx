import React from "react";
import "./EditableTextarea.scss";
import { ButtonIconC } from "./ButtonIcon";

interface EditableTextareaProps {
  text: string;
  placeholder?: string;
  onSave: (text: string) => void;
}

export function EditableTextareaC({ text, placeholder, onSave }: EditableTextareaProps): JSX.Element {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(text);

  function handleSave(): void {
    setIsEditing(false);
    onSave(value);
  }
  function handleCancel(): void {
    setIsEditing(false);
    setValue(text);
  }

  return <div className="editable-textarea">
    {isEditing ? (
      <div className="editable-textarea--editing">
        <textarea value={value} onChange={e => setValue(e.target.value)} className="editable-text--p" />
        <div className="editable-textarea--editing--buttons">
          <ButtonIconC icon="edit-save" onClick={handleSave} />
          <ButtonIconC icon="edit-cancel" onClick={handleCancel} />
        </div>
      </div>
    ) : (
      <div className="editable-textarea--display" onClick={() => setIsEditing(true)}>
        {value && <p>{value}</p>}
        {!value && <p className="placeholder">{placeholder}</p>}
        <svg className="icon">
          <use xlinkHref="#icon-edit-start" />
        </svg>
      </div>
    )}
  </div>;
}
