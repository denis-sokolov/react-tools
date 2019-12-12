import { useEffect } from "react";
import { navigate } from "./navigate";

export function Redirect(props: { to: string }) {
  const { to } = props;
  useEffect(() => navigate(to, { replace: true }), [to]);
  return null;
}
