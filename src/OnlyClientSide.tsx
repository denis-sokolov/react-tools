import { type ReactNode, useEffect, useState } from "react";

type Props = {
  butNotIf?: boolean;
  children: ReactNode;
};

export function OnlyClientSide(props: Props) {
  const [isClient, setClient] = useState(false);
  useEffect(() => setClient(true), []);
  return isClient && !props.butNotIf ? <>{props.children}</> : null;
}
