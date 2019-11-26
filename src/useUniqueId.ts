import { useRef } from "react";

let idCounter = 0;

export function useUniqueId() {
  idCounter += 1;
  return useRef("unique-id-" + idCounter).current;
}
