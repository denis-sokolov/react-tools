import { type ActionAreaProps } from "./Props";
import { baseStyles, disabledStyles } from "./styles";

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
    opts: { download?: string; newWindow?: boolean; replace?: boolean } = {},
  ) {
    const currentPathAndQuery =
      props.currentPathAndQuery ||
      (typeof location !== "undefined"
        ? location.pathname + location.search
        : "");
    const { download, newWindow, replace = false } = opts;
    const renderLink =
      props.renderLink ||
      ((attrs, extra) => (
        <a
          {...attrs}
          onClick={
            extra.replace
              ? (e) => {
                  e.preventDefault();
                  window.location.replace(attrs.href);
                }
              : undefined
          }
        >
          {attrs.children}
        </a>
      ));

    const linkPointsToCurrentPage = (() => {
      const [targetPath = "", targetSearch = ""] = url.split("?");
      const [currentPath = "", currentSearch = ""] =
        currentPathAndQuery.split("?");
      if (targetPath !== currentPath) return false;

      const targetParams = new URLSearchParams(targetSearch);
      const currentParams = new URLSearchParams(currentSearch);
      const allKeys: string[] = [];
      targetParams.forEach((_value, key) => allKeys.push(key));
      for (const key of allKeys)
        if (targetParams.get(key) !== currentParams.get(key)) return false;

      return true;
    })();
    if (linkPointsToCurrentPage && !download && !newWindow)
      return div({ extraClassName: "current" });

    if (download && url.startsWith("http"))
      throw Error("download links only work with local, relative links");
    if (replace && url.startsWith("http"))
      throw Error("replace links only work with local, relative links");

    const linkPointsToAncestor = (() => {
      const [targetPath = ""] = url.split("?");
      const [currentPath = ""] = currentPathAndQuery.split("?");
      if (currentPath === targetPath) return false;
      if (targetPath === "/") return true;
      if (!currentPath.startsWith(targetPath + "/")) return false;
      return true;
    })();

    return (
      <>
        {renderLink(
          {
            children: children,
            className: `${baseStyles} ${className} ${linkPointsToAncestor ? "current-ancestor" : ""}`,
            download: download,
            href: url,
            referrerPolicy: "strict-origin-when-cross-origin",
            rel: newWindow ? "noopener" : undefined,
            style: style,
            target: newWindow ? "_blank" : undefined,
            title: title,
          },
          {
            replace,
          },
        )}
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
    if ("replace" in action) return link(action.replace, { replace: true });
    if ("disabledReason" in action)
      return div({ title: action.disabledReason });
  }

  console.error("Props for the last ActionArea:", props);
  throw new Error("ActionArea received an invalid action: " + action);
}
