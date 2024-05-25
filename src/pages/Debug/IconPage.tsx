import React, { useEffect, useState } from "react";
import "./IconPage.scss";
import { IconC } from "../../components/shared/Icon";

export function IconPageP(): JSX.Element {
  const [icons, setIcons] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    fetch('/symbol-defs.svg')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, 'image/svg+xml');
        const symbols = svgDoc.getElementsByTagName('symbol');
        const iconNames = Array.from(symbols).map(symbol => symbol.id.slice(5)).sort((a, b) => a.localeCompare(b));
        setIcons(iconNames);
      })
      .catch(error => console.error('Error loading SVG symbols:', error));
  }, []);

  function handleClick(name: string) {
    navigator.clipboard.writeText(name);
    setCopied(Date.now());
    setTimeout(() => {
      setCopied(null);
    }, 1000);
  }

  return (
    <div className="page">
      <h1>Icons</h1>
      <div className="icons">
        {icons.map(icon => (
          <div className="icons--icon" onClick={() => handleClick(icon)}>
            <IconC key={icon} name={icon} size="large" />
            <p>{icon}</p>
          </div>
        ))}
      </div>
      {copied && (
        <p className="copied">
          <IconC name="copy" />
          <span>Copied to clipboard!</span>
        </p>
      )}
    </div>
  );
}
