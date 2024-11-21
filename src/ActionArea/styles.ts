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
  // Must explicitly change the cursor to default. Otherwise, when "pointer-events: none"
  // is applied on click, the cursor will not return to default until the mouse is moved.
  cursor: "default",

  pointerEvents: "none" as const,
});
