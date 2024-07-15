import type { MouseEvent } from "react";
import { isClickInInteractiveDescendant } from "./isClickInInteractiveDescendant";
import { findClosestParentIgnoringPortals, isInteractive } from "./lib";

/**
 * forwardClick allows to emulate a <label> with more control.
 * In particular, this does not click on the first nested interactive element, but on the chosen one.
 */
export function forwardClick(
  e: MouseEvent,
  /**
   * CSS selector that starts from the current target of the event. Something like "h1 a" would work.
   */
  selector: string,
) {
  if ("handled" in e && e.handled) return;

  const container = e.currentTarget;

  const forwardTarget = container.querySelector(selector);
  if (!forwardTarget)
    throw new Error(
      `The selector ${selector} failed to find an element, this is not supposed to happen, make sure your selector always finds an element to forward clicks to.`,
    );
  if (!(forwardTarget instanceof HTMLElement)) {
    console.log("Unexpected element", forwardTarget);
    throw new Error(`Found an unexpected element, what do I do with it?`);
  }
  if (!isInteractive(forwardTarget)) {
    const interactiveForwardTarget = findClosestParentIgnoringPortals(
      forwardTarget,
      isInteractive,
    );
    if (!interactiveForwardTarget)
      throw new Error(
        `Found a non-interactive element ${forwardTarget.tagName}, I can’t click on it, nor any of the ancestors.`,
      );
    if (
      container === interactiveForwardTarget ||
      !container.contains(interactiveForwardTarget)
    )
      throw new Error(
        "Forward target is only interactive, because the container is interactive. It seems forwarding clicks is thus not needed.",
      );
  }

  if (isClickInInteractiveDescendant(e)) return;

  // Simulated click does not bring focus
  forwardTarget.focus();

  // Copies modifiers and which mouse buttons used
  const eventCopy = new MouseEvent("click", e.nativeEvent);
  forwardTarget.dispatchEvent(eventCopy);
}
