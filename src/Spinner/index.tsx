import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useRerender, useRerenderEvery } from "../useRerender";

type Props = {
  children: ReactNode;
  fullScreen?: boolean;
  timeoutMs?: number;
} & (
  | {
      /**
       * Hide the spinner briefly in case the loading state is very short
       */
      delayed?: boolean;
      delayedMs?: never;
    }
  | { delayed?: never; delayedMs?: number }
);

export function Spinner(props: Props) {
  const { children, fullScreen, timeoutMs } = props;
  const contents = children;
  const delayed = Boolean(props.delayedMs) || (props.delayed ?? false);
  const delayedTimeout = props.delayedMs ?? 1000;

  useRerenderEvery(1000);
  const rerender = useRerender();
  const [mountedAt] = useState(Date.now());

  useEffect(
    function () {
      const timer = setTimeout(rerender, delayedTimeout + 1);
      return () => clearTimeout(timer);
    },
    [delayedTimeout, rerender]
  );

  const timeout = timeoutMs ?? 60000;
  if (mountedAt + timeout < Date.now())
    throw new Error("Spinner is taking too long");

  const hiddenDueToDelay = delayed && Date.now() < mountedAt + delayedTimeout;
  const delayedStyles: CSSProperties = hiddenDueToDelay ? { opacity: 0 } : {};

  const fullScreenStyles: CSSProperties = fullScreen
    ? {
        alignItems: "center",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 2,
      }
    : {};

  return (
    <div
      style={{
        ...fullScreenStyles,
        ...delayedStyles,
      }}
    >
      {contents}
    </div>
  );
}
