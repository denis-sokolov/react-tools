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
  textDecoration: "none"
});

const disabledStyles = scopedStyles("ActionArea-disabled", {
  pointerEvents: "none" as const,
  // Must explicitly change the cursor to defualt. Otherwise, when "pointer-events: none"
  // is applied on click, the cursor will not return to default until the mouse is moved.
  cursor: "default"
});

export function ActionArea(props: Props) {
  const { action, children } = props;
  const className = props.className || "";
  const currentPath =
    props.currentPath ||
    (typeof location !== "undefined" ? location.pathname : "");

  if (
    typeof action === "function" ||
    (typeof action === "object" && "mousedown" in action)
  ) {
    const [onClick, onMouseDown] =
      typeof action === "function"
        ? [action, undefined]
        : [undefined, action.mousedown];
    return (
      <button
        className={`${baseStyles} ${className}`}
        onClick={onClick}
        onMouseDown={onMouseDown}
        type="button"
      >
        {children}
      </button>
    );
  }

  if (action === "submit")
    return (
      <button className={`${baseStyles} ${className}`} type="submit">
        {children}
      </button>
    );

  if (action === "disabled")
    return (
      <span className={`${baseStyles} ${disabledStyles} ${className}`}>
        {children}
      </span>
    );

  if (
    typeof action === "string" ||
    (typeof action === "object" && "newWindow" in action) ||
    (typeof action === "object" && "download" in action)
  ) {
    const [url, newWindow, download] =
      typeof action === "string"
        ? [action, false, undefined]
        : "download" in action
        ? [action.url, false, action.download]
        : [action.newWindow, true, undefined];

    if (url === currentPath && !download) {
      return (
        <span
          className={`${baseStyles} ${disabledStyles} ${className} current`}
        >
          {children}
        </span>
      );
    }

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
  }

  throw new Error("Unexpected action");
}
