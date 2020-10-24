import { ReactNode, useState } from "react";
import NanoSpinner from "react-nano-spinner";
import { useRerenderEvery } from "../useRerender";

type Props = {
  children?: ReactNode;
  fullScreen?: boolean;
  timeoutMs?: number;
};

export function Spinner(props: Props) {
  const { children, fullScreen, timeoutMs } = props;
  const contents = children || <NanoSpinner />;

  useRerenderEvery(1000);

  const [mountedAt] = useState(Date.now());

  const timeout = timeoutMs ?? 60000;
  if (mountedAt + timeout < Date.now())
    throw new Error("Spinner is taking too long");

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
        }}
      >
        <div>{contents}</div>
      </div>
    );
  }

  return <>{contents}</>;
}
