import React from "react";
import "./EditableText.scss";
import { ButtonIconC } from "./ButtonIcon";
import { IconC } from "./Icon";

export interface EditableTextProps {
  text: string;
  tag: "h1" | "h2" | "h3" | "p";
  onSave: (text: string) => void;
}

export function EditableTextC({ text, tag, onSave }: EditableTextProps): JSX.Element {
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

  const Tag = tag;

  return <div className="editable-text">
    {isEditing ? (
      <div className={"editable-text--editing"}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} className={`editable-text--${tag}`} />
        <ButtonIconC icon="edit-save" onClick={handleSave} />
        <ButtonIconC icon="edit-cancel" onClick={handleCancel} />
      </div>
    ) : (
      <div className="editable-text--display" onClick={() => setIsEditing(true)}>
        <Tag>{value}</Tag>
        <IconC name="edit-start" />
      </div>
    )}
  </div>;
}
