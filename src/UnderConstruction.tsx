import { type ReactNode } from "react";

import { scopedStyles } from "./lib";

const outer = scopedStyles("UnderConstruction", {
  "&:active": {
    outline: "2px solid red !important",
  },
  cursor: "not-allowed",
});

const inner = scopedStyles("UnderConstruction", {
  pointerEvents: "none",
});

type Props = {
  children: ReactNode;
  inline?: boolean;
  onlyWhen?: boolean;
};

export function UnderConstruction(props: Props) {
  const { children, inline, onlyWhen } = props;
  if (onlyWhen !== undefined && !onlyWhen) return <>{children}</>;
  return (
    <div
      className={outer}
      style={{ display: inline ? "inline-block" : undefined }}
    >
      <div className={inner}>{children}</div>
    </div>
  );
}
