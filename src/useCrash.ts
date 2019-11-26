import { useState } from "react";
import { useCallback } from "./useCallback";

export function useCrash() {
  // https://github.com/facebook/react/issues/14981#issuecomment-468460187
  const [, setState] = useState(null);
  return useCallback(
    (err: Error) =>
      setState(() => {
        throw err;
      }),
    [setState]
  );
}
