import { useState } from "react";

let componentsMounted = 0;

export function useShowRenders(name?: string) {
  const [id] = useState(() => ++componentsMounted);
  console.log(`Rendering ${name || "component"} with id ${id}`);
}
