export function findClosestParentIgnoringPortals(
  element: Element,
  predicate: (el: Element) => boolean,
): Element | undefined {
  if (!element.parentElement) return undefined;
  const parent = element.parentElement;
  if (predicate(parent)) return parent;
  return findClosestParentIgnoringPortals(parent, predicate);
}
