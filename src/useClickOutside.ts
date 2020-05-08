import { useEffect, useRef } from "react";
import { useCallback } from "./useCallback";

export function useClickOutside(f: () => unknown) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleExternalClick = (event: MouseEvent) => {
      const el = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(el)) f();
    };

    document.addEventListener("click", handleExternalClick);
    return () => document.removeEventListener("click", handleExternalClick);
  }, [f, ref]);

  return useCallback(
    (el: HTMLElement | null) => {
      ref.current = el;
    },
    [ref]
  );
}
