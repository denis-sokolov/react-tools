import React from "react";
import { scopedStyles } from "./lib";

const outer = scopedStyles("UnderConstruction", {
  cursor: "not-allowed",
  "&:active": {
    outline: "2px solid red !important"
  }
});

const inner = scopedStyles("UnderConstruction", {
  pointerEvents: "none"
});

type Props = {
  children: React.ReactNode;
};

export function UnderConstruction(props: Props) {
  const { children } = props;
  return (
    <div className={outer}>
      <div className={inner}>{children}</div>
    </div>
  );
}
