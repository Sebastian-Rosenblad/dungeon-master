import React, { useCallback, useEffect, useRef } from "react";
import "./PopupWrapper.scss";

export interface PopupWrapperPropsM {
  x: number;
  y: number;
  children: React.ReactNode;
  onClose: () => void;
}

export function PopupWrapperC({ x, y, children, onClose }: PopupWrapperPropsM) {
  const popupRef = useRef<HTMLDivElement>(null);

  const adjustPosition = useCallback(() => {
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
    adjustPosition();
    const observer = new ResizeObserver(() => {
      adjustPosition();
    });

    if (popupRef.current) {
      observer.observe(popupRef.current);
    }

    return () => {
      if (popupRef.current) {
        observer.unobserve(popupRef.current);
      }
    };
  }, [adjustPosition]);

  return (
    <div className="popup-wrapper" ref={popupRef} style={{ top: y, left: x }}>
      {children}
    </div>
  );
};
