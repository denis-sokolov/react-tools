import { useEffect, useRef } from "react";
import { useCallback } from "./useCallback";

export function useClickOutside(f: () => unknown) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleExternalClick = (event: MouseEvent) => {
      const el = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(el)) f();
    };

    document.addEventListener("mousedown", handleExternalClick);
    return () => document.removeEventListener("mousedown", handleExternalClick);
  }, [f, ref]);

  return useCallback(
    (el: HTMLElement | null) => {
      ref.current = el;
    },
    [ref]
  );
}
