import { useEffect, useReducer } from "react";

export function useRerender() {
  const [, rerender] = useReducer((i) => i + 1, 0);
  return rerender;
}

export function useRerenderEvery(ms: number) {
  const rerender = useRerender();
  useEffect(() => {
    const i = setTimeout(rerender, ms);
    return () => clearTimeout(i);
  });
}
