import React from "react";
import "./EditableTextarea.scss";

interface EditableTextareaProps {
  text: string;
  label?: string;
  onSave: (text: string) => void;
}

export function EditableTextareaC({ text, label, onSave }: EditableTextareaProps): JSX.Element {
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
        {label && <label>{label}</label>}
        <textarea value={value} onChange={e => setValue(e.target.value)} />
        <svg className="icon" onClick={handleSave}>
          <use xlinkHref="#icon-edit-save" />
        </svg>
        <svg className="icon" onClick={handleCancel}>
          <use xlinkHref="#icon-edit-cancel" />
        </svg>
      </div>
    ) : (
      <div className="editable-textarea--display" onClick={() => setIsEditing(true)}>
        {value && <p>{value}</p>}
        {!value && <p className="placeholder">Click to add {label}</p>}
        <svg className="icon">
          <use xlinkHref="#icon-edit-start" />
        </svg>
      </div>
    )}
  </div>;
}
