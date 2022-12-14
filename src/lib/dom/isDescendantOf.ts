export function isDescendantOf(
  element: Element,
  predicate: (el: Element) => boolean
): boolean {
  if (!element.parentElement) return false;
  if (predicate(element.parentElement)) return true;
  return isDescendantOf(element.parentElement, predicate);
}
