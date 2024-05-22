import React, { useEffect, useRef } from "react";
import "./Lightbox.scss";
import { ButtonIconC } from "./ButtonIcon";
import { IconC } from "./Icon";

interface LightboxProps {
  title: string;
  icon?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function LightboxC({ title, icon, onClose, children }: LightboxProps) {
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (lightboxRef.current && !lightboxRef.current.contains(event.target as Node)) {
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
          <ButtonIconC icon="close" transparent onClick={onClose} />
        </div>
        <div className="lightbox--body">{children}</div>
      </div>
    </div>
  );
}
