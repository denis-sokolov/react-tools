import type { CSSProperties, ReactNode } from "react";
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
  children: ReactNode;
  className?: string;
  currentPath?: string;
  title?: string;
  style?: CSSProperties;
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
  // Must explicitly change the cursor to default. Otherwise, when "pointer-events: none"
  // is applied on click, the cursor will not return to default until the mouse is moved.
  cursor: "default",
});

export function ActionArea(props: Props) {
  const { action, children, title, style } = props;
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
        title={title}
        style={style}
      >
        {children}
      </button>
    );
  };

  const span = function (extraClassName = "") {
    return (
      <span
        className={`${baseStyles} ${disabledStyles} ${className} ${extraClassName}`}
        title={title}
        style={style}
      >
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

    if (url === currentPath && !download) return span("current");

    return (
      <a
        className={`${baseStyles} ${className}`}
        download={download}
        href={url}
        rel={newWindow ? "noopener" : undefined}
        target={newWindow ? "_blank" : undefined}
        title={title}
        style={style}
      >
        {children}
      </a>
    );
  };

  if (action === "disabled") return span();
  if (action === "submit") return button({ type: "submit" });

  if (typeof action === "function") return button({ onClick: action });
  if (typeof action === "string") return link(action);

  if ("download" in action)
    return link(action.url, { download: action.download });
  if ("mousedown" in action) return button({ onMouseDown: action.mousedown });
  if ("newWindow" in action) return link(action.newWindow, { newWindow: true });

  throw new Error("Unexpected action");
}
