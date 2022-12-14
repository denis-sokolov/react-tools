import { findClosestParent } from "./findClosestParent";

export function isDescendantOf(
  element: Element,
  predicate: (el: Element) => boolean
): boolean {
  return Boolean(findClosestParent(element, predicate));
}
