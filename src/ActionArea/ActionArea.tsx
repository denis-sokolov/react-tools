import React from "react";
import { scopedStyles } from "../lib";

export type Action =
  | "submit"
  // URL
  | string
  // URL in new window
  | { newWindow: string }
  // URL downloaded
  | { download: string; url: string }
  // JavaScript callback
  | (() => void)
  // Avoid using mousedown, regular click above is preferred
  | { mousedown: () => void }
  // Avoid using disabled, inactive UI elements are bad UX
  | "disabled";

type Props = {
  action: Action;
  children: React.ReactNode;
  className?: string;
  currentPath?: string;
};

const baseStyles = scopedStyles("ActionArea-base", {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "inherit",
  fontSize: "inherit",
  margin: 0,
  padding: 0,
  color: "inherit",
  fontWeight: "inherit",
  textDecoration: "none",
});

const disabledStyles = scopedStyles("ActionArea-disabled", {
  pointerEvents: "none" as const,
  // Must explicitly change the cursor to defualt. Otherwise, when "pointer-events: none"
  // is applied on click, the cursor will not return to default until the mouse is moved.
  cursor: "default",
});

export function ActionArea(props: Props) {
  const { action, children } = props;
  const className = props.className || "";

  const button = function (opts: {
    onClick?: () => void;
    onMouseDown?: () => void;
    type?: "submit";
  }) {
    const { onClick, onMouseDown, type } = opts;
    return (
      <button
        className={`${baseStyles} ${className}`}
        onClick={onClick}
        onMouseDown={onMouseDown}
        type={type || "button"}
      >
        {children}
      </button>
    );
  };

  const span = function (className: string) {
    return (
      <span className={`${baseStyles} ${disabledStyles} ${className}`}>
        {children}
      </span>
    );
  };

  const link = function (
    url: string,
    opts: { download?: string; newWindow?: boolean } = {}
  ) {
    const currentPath =
      props.currentPath ||
      (typeof location !== "undefined" ? location.pathname : "");
    const { download, newWindow } = opts;

    if (url === currentPath && !download) return span(`${className} current`);

    return (
      <a
        className={`${baseStyles} ${className}`}
        download={download}
        href={url}
        target={newWindow ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  };

  if (action === "disabled") return span(className);
  if (action === "submit") return button({ type: "submit" });

  if (typeof action === "function") return button({ onClick: action });
  if (typeof action === "string") return link(action);

  if ("download" in action)
    return link(action.url, { download: action.download });
  if ("mousedown" in action) return button({ onMouseDown: action.mousedown });
  if ("newWindow" in action) return link(action.newWindow, { newWindow: true });

  throw new Error("Unexpected action");
}
