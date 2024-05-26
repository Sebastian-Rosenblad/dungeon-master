import React, { useEffect, useRef } from "react";
import "./Lightbox.scss";
import { IconC } from "../Icon";
import { IconButtonC } from "../IconButton";

interface LightboxProps {
  title: string;
  icon?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function LightboxC({ title, icon, onClose, children }: LightboxProps) {
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(evt: MouseEvent) {
      if (lightboxRef.current && !lightboxRef.current.contains(evt.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="lightbox">
      <div className="lightbox--content" ref={lightboxRef}>
        <div className="lightbox--header">
          {icon && <IconC name={icon} />}
          <h2 className="lightbox--title">{title}</h2>
          <IconButtonC icon="close" transparent onClick={onClose} />
        </div>
        <div className="lightbox--body">{children}</div>
      </div>
    </div>
  );
}
