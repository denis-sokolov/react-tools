import React from "react";

export function useCheckStableIdentity(params: { [k: string]: any }) {
  const prev = React.useRef<typeof params>({});
  Object.keys(params).forEach(function(key) {
    if (params[key] !== prev.current[key]) {
      console.log("%cChange", "color:red", "in", key);
      console.log("Prev", prev.current[key]);
      console.log("New", params[key]);
    } else console.log("Same", key);
  });
  Object.assign(prev.current, params);
}
