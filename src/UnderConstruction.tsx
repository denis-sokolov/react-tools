import React from "react";
import { scopedStyles } from "./lib";

const className = scopedStyles("UnderConstruction", {
  cursor: "not-allowed",
  opacity: "0.3",
  pointerEvents: "none",
  "&:active": {
    outline: "2px solid red !important"
  }
});

type Props = {
  children: React.ReactNode;
};

export function UnderConstruction(props: Props) {
  const { children } = props;
  return <div className={className}>{children}</div>;
}
