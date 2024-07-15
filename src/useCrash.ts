import { useState } from "react";
import { useCallback } from "./useCallback";

/**
 * Create a function that crashes in the context of the current component, for use in async context
 * const crash = useCrash();
 */
export function useCrash() {
  // https://github.com/facebook/react/issues/14981#issuecomment-468460187
  const [, setState] = useState(null);
  return useCallback(
    (err: Error | { message: string }) =>
      setState(() => {
        throw err instanceof Error ? err : Error(err.message);
      }),
    [setState]
  );
}
