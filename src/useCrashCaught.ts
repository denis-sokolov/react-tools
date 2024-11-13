import { caught } from "./caught";
import { useCrash } from "./useCrash";

export function useCrashCaught() {
  const crash = useCrash();
  return (value: unknown) => crash(caught(value));
}
