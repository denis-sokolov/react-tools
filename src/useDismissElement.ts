import { useEffect } from "react";
import { useClickOutside } from "./useClickOutside";

/**
 * Dismiss a dropdown or a dialog with a click outside or Escape
 * const ref = useDismissElement(() => setOpen(false));
 * return <div ref={ref} />;
 */
export function useDismissElement(f: () => unknown) {
  useEffect(
    function () {
      const handleKeyUp = function (e: KeyboardEvent) {
        if (e.key === "Escape") f();
      };
      document.addEventListener("keyup", handleKeyUp);
      return () => document.removeEventListener("keyup", handleKeyUp);
    },
    [f],
  );

  return useClickOutside(f);
}
