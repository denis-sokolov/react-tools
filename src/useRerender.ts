import { useEffect, useReducer } from "react";

export function useRerender() {
  const [, rerender] = useReducer((i) => i + 1, 0);
  return rerender;
}

export function useRerenderEvery(ms: number) {
  const rerender = useRerender();
  useEffect(() => {
    const i = setInterval(rerender, ms);
    return () => clearInterval(i);
  }, [ms, rerender]);
}
