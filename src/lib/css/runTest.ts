import { scopedStyles } from ".";
import type { StyleObject } from "./types";

export function runTest(prefix: string, input: StyleObject) {
  const appendedChildren: HTMLElement[] = [];
  const head: Partial<Window["document"]["head"]> = {
    appendChild: (child) => {
      appendedChildren.push(child as any);
      return child;
    },
    get firstChild() {
      return appendedChildren[0] || null;
    },
    insertBefore: (newChild, targetChild) => {
      const index =
        targetChild === null
          ? appendedChildren.length
          : appendedChildren.findIndex((c) => c === targetChild);
      if (index === -1)
        throw new Error(
          "The node before which the new node is to be inserted is not a child of this node",
        );
      appendedChildren.splice(index, 0, newChild as any);
      return newChild;
    },
  };
  const document: Partial<Window["document"]> = {
    createElement: (tagName: string) => ({ tagName }) as any,
    head: head as any,
  };
  const w: Partial<Window> = {
    document: document as any,
  };
  const window = w as Window;

  scopedStyles(prefix, input, window);

  return appendedChildren[0]?.innerText || "";
}
