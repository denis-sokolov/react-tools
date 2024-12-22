import { useCallback } from "react";

import { caught } from "./caught";
import { useCrash } from "./useCrash";

export function useCrashCaught() {
  const crash = useCrash();
  return useCallback((value: unknown) => crash(caught(value)), [crash]);
}
