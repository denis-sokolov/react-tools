import type { MouseEvent } from "react";
import { findClosestParentIgnoringPortals, isInteractive } from "./lib";

/**
 * When managing custom combinations of nested interactive elements
 * avoid double click handling in the container with:
 *   if (isClickInInteractiveDescendant(e)) return;
 * @warning Has false negatives with portals
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

  if (interactiveClickLocationIgnoringPortals) {
    if (interactiveClickLocationIgnoringPortals === container) return false;
    if (interactiveClickLocationIgnoringPortals.contains(container))
      return false;

    // False positive in case interactiveClickLocationIgnoringPortals
    // is above the container through a portal
    // This should be exceedingly rare in real apps
    return true;
  }

  // False negative in case real interactive element is a descendant of the container,
  // but there’s a portal between it and actualClickLocation
  // This can be relatively common
  return false;
}
