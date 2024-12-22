import { render as libRender } from "@testing-library/react";
import { JSDOM } from "jsdom";
import { type ReactElement } from "react";

export function render(input: ReactElement) {
  const dom = new JSDOM();
  global.window = dom.window as any;
  global.document = dom.window.document;
  const result = libRender(input);
  const area = result.container.firstChild as HTMLElement;
  return {
    attr: (name: string): unknown => area.getAttribute(name) ?? undefined,
    is: (element: string) => area.tagName.toLowerCase() === element,
    prop: (name: keyof HTMLElement) => area[name] ?? undefined,
    text: () => area.innerHTML,
  };
}
