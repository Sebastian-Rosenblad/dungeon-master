import React, { useState } from "react";
import "./EditableText.scss";
import { IconC } from "../Icon";
import { IconButtonC } from "../IconButton";

export interface EditableTextProps {
  text: string;
  tag: "h1" | "h2" | "h3" | "p";
  onSave: (text: string) => void;
}

export function EditableTextC({ text, tag, onSave }: EditableTextProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);
  const Tag = tag;

  function handleSave(): void {
    setIsEditing(false);
    onSave(value);
  }
  function handleCancel(): void {
    setIsEditing(false);
    setValue(text);
  }

  return (
    <div className="editable-text">
      {isEditing ? (
        <div className="editable-text--editing">
          <input type="text" value={value} onChange={evt => setValue(evt.target.value)} className={`editable-text--${tag}`} />
          <IconButtonC icon="edit-save" onClick={handleSave} />
          <IconButtonC icon="edit-cancel" onClick={handleCancel} />
        </div>
      ) : (
        <div className="editable-text--display" onClick={() => setIsEditing(true)}>
          <Tag>{value}</Tag>
          <IconC name="edit-start" />
        </div>
      )}
    </div>
  );
}
