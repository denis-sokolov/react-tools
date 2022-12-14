import type { MouseEvent } from "react";

function isDescendantOf(
  element: Element,
  predicate: (el: Element) => boolean
): boolean {
  if (!element.parentElement) return false;
  if (predicate(element.parentElement)) return true;
  return isDescendantOf(element.parentElement, predicate);
}

function isInteractive(el: Element) {
  const isInteractiveTag =
    "a,audio,button,input,label,menu,menuitem,option,select,summary,textarea,video"
      .split(",")
      .includes(el.tagName.toLowerCase());
  if (isInteractiveTag) return true;
  const interactiveAriaRoles = "button,checkbox,listbox,switch,tab".split(",");
  const isInteractiveAriaRole =
    interactiveAriaRoles.includes(
      el.getAttribute("aria-role")?.toLowerCase() || ""
    ) ||
    interactiveAriaRoles.includes(el.getAttribute("role")?.toLowerCase() || "");
  if (isInteractiveAriaRole) return true;
  return false;
}

/**
 * forwardClick allows to emulate a <label> with more control.
 * In particular, this does not click on the first nested interactive element, but on the chosen one.
 */
export function forwardClick(
  e: MouseEvent,
  /**
   * CSS selector that starts from the current target of the event. Something like "h1 a" would work.
   */
  selector: string
) {
  const container = e.currentTarget;

  const forwardTarget = container.querySelector(selector);
  if (!forwardTarget)
    throw new Error(
      `The selector ${selector} failed to find an element, this is not supposed to happen, make sure your selector always find an element to forward clicks to.`
    );
  if (!(forwardTarget instanceof HTMLElement)) {
    console.log("Unexpected element", forwardTarget);
    throw new Error(`Found an unexpected element, what do I do with it?`);
  }
  if (
    !isInteractive(forwardTarget) &&
    !isDescendantOf(forwardTarget, isInteractive)
  )
    throw new Error(
      `Found a non-interactive element ${forwardTarget.tagName}, I can’t click on it, nor any of the ancestors.`
    );

  const actualClickLocation = e.target;

  if (!(actualClickLocation instanceof Element)) return;

  if (
    actualClickLocation === forwardTarget ||
    isDescendantOf(actualClickLocation, (el) => el === forwardTarget)
  )
    return;

  if (
    isInteractive(actualClickLocation) ||
    isDescendantOf(actualClickLocation, isInteractive)
  )
    return;

  // Simulated click does not bring focus
  forwardTarget.focus();

  // Copies modifiers and which mouse buttons used
  const eventCopy = new MouseEvent("click", e.nativeEvent);
  forwardTarget.dispatchEvent(eventCopy);
}
