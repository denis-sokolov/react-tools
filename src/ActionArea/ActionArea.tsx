import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { type Action } from "./Action";
import { baseStyles, disabledStyles } from "./styles";

export type ActionAreaProps = {
  /**
   * Possible values for an Action:
   * - "submit"
   * - string with a URL to make a link
   * - { newWindow: string } to make a link that opens in a new window
   * - { download: string, url: string } to make a link that downloads a file with a given filename
   * - () => void to make a click handler
   * - { mousedown: () => void } to make a mousedown handler, but the click handler above is preferred for UX
   * - { disabledReason: "To continue, please fill in all the fields above" } to disable a button and provide an explanation to the user
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
  renderButton?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode },
  ) => ReactNode;
  /**
   * Override how the ActionArea renders inactive areas
   */
  renderDiv?: (
    props: HTMLAttributes<HTMLDivElement> & { children: ReactNode },
  ) => ReactNode;
  /**
   * Override how the ActionArea renders links
   */
  renderLink?: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & {
      children: ReactNode;
      href: string;
    },
  ) => ReactNode;
  style?: CSSProperties;
  title?: string;
};

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
          style,
          title,
          type: type || "button",
        })}
      </>
    );
  };

  const div = function (
    opts: { extraClassName?: string; title?: string } = {},
  ) {
    const { extraClassName = "" } = opts;
    const renderDiv =
      props.renderDiv || ((p) => <div {...p}>{p.children}</div>);
    return (
      <>
        {renderDiv({
          children,
          className: `${baseStyles} ${disabledStyles} ${className} ${extraClassName}`,
          style,
          title: opts.title || title,
        })}
      </>
    );
  };

  const link = function (
    url: string,
    opts: { download?: string; newWindow?: boolean } = {},
  ) {
    const currentPath =
      props.currentPath ||
      (typeof location !== "undefined" ? location.pathname : "");
    const { download, newWindow } = opts;
    const renderLink = props.renderLink || ((p) => <a {...p}>{p.children}</a>);

    if (url === currentPath && !download && !newWindow)
      return div({ extraClassName: "current" });

    return (
      <>
        {renderLink({
          children: children,
          className: `${baseStyles} ${className}`,
          download: download,
          href: url,
          referrerPolicy: "strict-origin-when-cross-origin",
          rel: newWindow ? "noopener" : undefined,
          style: style,
          target: newWindow ? "_blank" : undefined,
          title: title,
        })}
      </>
    );
  };

  if (action === "disabled") {
    console.log(
      'action="disabled" is deprecated, please use action={{ disabledReason: "Explanation to the user" }}',
    );
    return div();
  }
  if (action === "submit") return button({ type: "submit" });

  if (typeof action === "function") return button({ onClick: action });
  if (typeof action === "string") return link(action);

  if (action) {
    if ("download" in action)
      return link(action.url, { download: action.download });
    if ("mousedown" in action) return button({ onMouseDown: action.mousedown });
    if ("newWindow" in action)
      return link(action.newWindow, { newWindow: true });
    if ("disabledReason" in action)
      return div({ title: action.disabledReason });
  }

  console.error("Props for the last ActionArea:", props);
  throw new Error("ActionArea received an invalid action: " + action);
}
