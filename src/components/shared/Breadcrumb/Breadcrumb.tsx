import React from "react";
import "./Breadcrumb.scss";
import { useNavigate } from "react-router-dom";
import { IconC } from "../Icon";
import { EditableTextC } from "../EditableText";

interface BreadcrumbItemM {
  label: string;
  link?: string;
  editable?: boolean;
  onSave?: (newText: string) => void;
}
interface BreadcrumbPropsM {
  items: BreadcrumbItemM[];
}

export function BreadcrumbC({ items }: BreadcrumbPropsM): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link ? (
            <h1 className="breadcrumb--link" onClick={() => item.link && navigate(item.link)}>{item.label}</h1>
          ) : item.editable && item.onSave ? (
            <EditableTextC text={item.label} tag="h1" onSave={item.onSave} />
          ) : (
            <h1>{item.label}</h1>
          )}
          {index < items.length - 1 && <IconC name="cheveron-right" size="large" />}
        </React.Fragment>
      ))}
    </div>
  );
}
