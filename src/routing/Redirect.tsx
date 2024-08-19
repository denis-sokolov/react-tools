import { useLayoutEffect } from "react";

import { navigate } from "./navigate";

export function Redirect(props: { to: string }) {
  const { to } = props;
  // useLayoutEffect avoids a blank paint that blinks the screen
  useLayoutEffect(() => navigate(to, { replace: true }), [to]);
  return null;
}
