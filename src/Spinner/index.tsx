import { CSSProperties, ReactNode, useEffect, useState } from "react";
import NanoSpinner from "react-nano-spinner";
import { useRerender, useRerenderEvery } from "../useRerender";

const delayedTimeout = 1000;

type Props = {
  children?: ReactNode;
  delayed?: boolean;
  fullScreen?: boolean;
  timeoutMs?: number;
};

export function Spinner(props: Props) {
  const { children, delayed, fullScreen, timeoutMs } = props;
  const contents = children || <NanoSpinner />;

  useRerenderEvery(1000);
  const rerender = useRerender();
  const [mountedAt] = useState(Date.now());

  useEffect(
    function () {
      const timer = setTimeout(rerender, delayedTimeout + 1);
      return () => clearTimeout(timer);
    },
    [rerender]
  );

  const timeout = timeoutMs ?? 60000;
  if (mountedAt + timeout < Date.now())
    throw new Error("Spinner is taking too long");

  const hiddenDueToDelay = delayed && Date.now() < mountedAt + delayedTimeout;
  const delayedStyles: CSSProperties = hiddenDueToDelay ? { opacity: 0 } : {};

  if (fullScreen) {
    return (
      <div
        style={{
          alignItems: "center",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 2,
          ...delayedStyles,
        }}
      >
        <div>{contents}</div>
      </div>
    );
  }

  return <div style={delayedStyles}>{contents}</div>;
}
