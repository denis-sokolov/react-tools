import { caught } from "./caught";
import { useCallback } from "./useCallback";
import { useCrash } from "./useCrash";

export function useCrashCaught() {
  const crash = useCrash();
  return useCallback((value: unknown) => crash(caught(value)), [crash]);
}
