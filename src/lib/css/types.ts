import type { CSSProperties } from "react";

export type StyleObject = CSSProperties & {
  [k: string]: string | number | CSSProperties;
};
