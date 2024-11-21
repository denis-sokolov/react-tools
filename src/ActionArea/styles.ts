import { scopedStyles } from "../lib";

export const baseStyles = scopedStyles("ActionArea-base", {
  alignItems: "center",
  background: "none",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  display: "inline-flex",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  justifyContent: "center",
  margin: 0,
  padding: 0,
  textDecoration: "none",
});

export const disabledStyles = scopedStyles("ActionArea-disabled", {
  cursor: "default",
});
