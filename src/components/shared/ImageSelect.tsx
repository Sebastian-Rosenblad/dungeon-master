import React, { useRef } from "react";
import './ImageSelect.scss';
import { IconC } from "./Icon";

interface ImageSelectPropsM {
  value: string;
  onChange: (value: string) => void;
}

export function ImageSelectC({ value, onChange }: ImageSelectPropsM): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onChange(file.name);
    }
  }
  function handleImgError(event: React.SyntheticEvent<HTMLImageElement>): void {
    event.currentTarget.src = "/images/default-thumbnail.png";
  }

  return <div className="image-select">
    <img
      src={`/images/${value}`}
      alt="Project thumbnail"
      className="image-select--image"
      onError={handleImgError}
    />
    <div className="image-select--hover" onClick={handleImageClick}>
      <IconC name="image" />
    </div>
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: 'none' }}
      onChange={handleFileChange}
    />
  </div>;
}
