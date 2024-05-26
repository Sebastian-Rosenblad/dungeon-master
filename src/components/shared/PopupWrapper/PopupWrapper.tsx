import React, { useEffect, useRef } from "react";
import "./PopupWrapper.scss";

export interface PopupWrapperPropsM {
  x: number;
  y: number;
  children: React.ReactNode;
  onClose: () => void;
}

export function PopupWrapperC({ x, y, children, onClose }: PopupWrapperPropsM) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(evt: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(evt.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (popupRef.current) {
      const popup = popupRef.current;
      const rect = popup.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        popup.style.left = `${window.innerWidth - rect.width}px`;
      } else {
        popup.style.left = `${x}px`;
      }
      if (rect.bottom > window.innerHeight) {
        popup.style.top = `${window.innerHeight - rect.height}px`;
      } else {
        popup.style.top = `${y}px`;
      }
    }
  }, [x, y]);

  return (
    <div className="popup-wrapper" ref={popupRef}>
      {children}
    </div>
  );
};
