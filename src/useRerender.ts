import { useReducer } from "react";

export function useRerender() {
  const [, rerender] = useReducer((i) => i + 1, 0);
  return rerender;
}
