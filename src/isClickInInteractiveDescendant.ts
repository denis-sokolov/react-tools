import type { MouseEvent } from "react";
import { findClosestParentIgnoringPortals, isInteractive } from "./lib";

/**
 * When managing custom combinations of nested interactive elements
 * avoid double click handling in the container with:
 *   if (isClickInInteractiveDescendant(e)) return;
 */
export function isClickInInteractiveDescendant(e: MouseEvent) {
  const container = e.currentTarget;
  const actualClickLocation = e.target;
  if (!(actualClickLocation instanceof Element)) return false;

  const interactiveClickLocationIgnoringPortals = isInteractive(
    actualClickLocation
  )
    ? actualClickLocation
    : findClosestParentIgnoringPortals(actualClickLocation, isInteractive);
  if (!interactiveClickLocationIgnoringPortals) return false;

  if (interactiveClickLocationIgnoringPortals === container) return false;

  return container.contains(interactiveClickLocationIgnoringPortals);
}
