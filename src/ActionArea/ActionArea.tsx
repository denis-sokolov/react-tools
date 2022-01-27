import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";
import { scopedStyles } from "../lib";

export type Action =
  | "submit"
  | string
  | { newWindow: string }
  | { download: string; url: string }
  | (() => void)
  | { mousedown: () => void }
  | "disabled";

export type ActionAreaProps = {
  /**
   * Possible values for an Action:
   * - "submit"
   * - string with a URL to make a link
   * - { newWindow: string } to make a link that opens in a new window
   * - { download: string, url: string } to make a link that downloads a file with a given filename
   * - () => void to make a click handler
   * - { mousedown: () => void } to make a mousedown handler, but the click handler above is preferred for UX
   * - "disabled", but avoid it, as inactive UI elements are not preferred for UX
   */
  action: Action;
  children: ReactNode;
  className?: string;
  /**
   * Override how the ActionArea detects which links are pointing to the current page
   */
  currentPath?: string;
  /**
   * Override how the ActionArea renders buttons
   */
  renderButton?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode;
  /**
   * Override how the ActionArea renders links
   */
  renderLink?: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
  ) => ReactNode;
  /**
   * Override how the ActionArea renders inactive areas
   */
  renderSpan?: (props: HTMLAttributes<HTMLSpanElement>) => ReactNode;
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

/**
 * An area that acts as a button or link, and is devoid of styling
 */
export function ActionArea(props: ActionAreaProps) {
  const { children, title, style } = props;
  const className = props.className || "";

  // Make sure we handle a common error well
  const action = props.action as typeof props.action | null | undefined;

  const button = function (opts: {
    onClick?: () => void;
    onMouseDown?: () => void;
    type?: "submit";
  }) {
    const { onClick, onMouseDown, type } = opts;
    const renderButton =
      props.renderButton || ((p) => <button {...p}>{p.children}</button>);
    return (
      <>
        {renderButton({
          children,
          className: `${baseStyles} ${className}`,
          onClick,
          onMouseDown,
          type: type || "button",
          title,
          style,
        })}
      </>
    );
  };

  const span = function (extraClassName = "") {
    const renderSpan =
      props.renderSpan || ((p) => <span {...p}>{p.children}</span>);
    return (
      <>
        {renderSpan({
          children,
          className: `${baseStyles} ${disabledStyles} ${className} ${extraClassName}`,
          title,
          style,
        })}
      </>
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
    const renderLink = props.renderLink || ((p) => <a {...p}>{p.children}</a>);

    if (url === currentPath && !download) return span("current");

    return (
      <>
        {renderLink({
          className: `${baseStyles} ${className}`,
          children: children,
          download: download,
          href: url,
          rel: newWindow ? "noopener" : undefined,
          referrerPolicy: "strict-origin-when-cross-origin",
          target: newWindow ? "_blank" : undefined,
          title: title,
          style: style,
        })}
      </>
    );
  };

  if (action === "disabled") return span();
  if (action === "submit") return button({ type: "submit" });

  if (typeof action === "function") return button({ onClick: action });
  if (typeof action === "string") return link(action);

  if (action) {
    if ("download" in action)
      return link(action.url, { download: action.download });
    if ("mousedown" in action) return button({ onMouseDown: action.mousedown });
    if ("newWindow" in action)
      return link(action.newWindow, { newWindow: true });
  }

  console.error("Props for the last ActionArea:", props);
  throw new Error("ActionArea received an invalid action: " + action);
}
