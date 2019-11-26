import React from "react";
import { css } from "./lib";

const className = css("UnderConstruction", {
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
