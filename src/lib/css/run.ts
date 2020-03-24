import { scopedStyles } from ".";
import type { StyleObject } from "./types";

export function run(prefix: string, input: StyleObject) {
  const appendedChildren: HTMLElement[] = [];
  const head: Partial<Window["document"]["head"]> = {
    appendChild: (child) => {
      appendedChildren.push(child as any);
      return child;
    },
  };
  const document: Partial<Window["document"]> = {
    createElement: (tagName: string) => ({ tagName } as any),
    head: head as any,
  };
  const w: Partial<Window> = {
    document: document as any,
  };
  const window = w as Window;

  scopedStyles(prefix, input, window);

  return appendedChildren[0]?.innerText;
}
