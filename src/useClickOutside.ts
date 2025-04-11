import { useCallback, useEffect, useRef } from "react";

type RefFunction = (el: HTMLElement | null) => void;
type ClickOutsideControls = RefFunction & {
  additionalArea: (name: string) => (el: HTMLElement | null) => void;
};

/**
 * Detect clicks outside of the element
 * const ref = useClickOutside(() => console.log("Clicked outside"));
 * return <div ref={ref} />;
 */
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
    return () => {
      document.removeEventListener("click", handleExternalClick);
    };
  }, [f, ref]);

  const additionalArea: (name: string) => RefFunction = useCallback(
    (name) => (el) => {
      ref.current[name] = el;
    },
    [ref],
  );

  const main: RefFunction = useCallback(
    (el) => additionalArea("main")(el),
    [additionalArea],
  );

  const res = main as ClickOutsideControls;
  res.additionalArea = additionalArea;
  return res;
}
