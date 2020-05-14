import { useEffect, useRef } from "react";
import { useCallback } from "./useCallback";

type RefFunction = (el: HTMLElement | null) => void;
type ClickOutsideControls = RefFunction & {
  additionalArea: (name: string) => (el: HTMLElement | null) => void;
};

export function useClickOutside(f: () => unknown): ClickOutsideControls {
  const ref = useRef<{ [name: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleExternalClick = (event: MouseEvent) => {
      const el = event.target as HTMLElement;
      const areas = ref.current;
      const isInAreas = Object.keys(areas).some((k) => {
        const area = areas[k];
        return area?.contains(el);
      });
      if (!isInAreas) f();
    };

    document.addEventListener("click", handleExternalClick);
    return () => document.removeEventListener("click", handleExternalClick);
  }, [f, ref]);

  const additionalArea = useCallback(
    (name: string) => (el: HTMLElement | null) => {
      ref.current[name] = el;
    },
    [ref]
  );

  const main: RefFunction = useCallback((el) => additionalArea("main")(el), [
    additionalArea,
  ]);

  const res = main as ClickOutsideControls;
  res.additionalArea = additionalArea;
  return res;
}
