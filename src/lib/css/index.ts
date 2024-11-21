import { type CSSProperties } from "react";

let counter = 0;

type StyleObject =
  | CSSProperties
  | (CSSProperties & {
      [k: string]: string | number | CSSProperties;
    });

function objectToString(selector: string, obj: StyleObject) {
  const body = Object.entries(obj)
    .map(([property, value]) => {
      if (typeof value === "object") return "";
      const cssProperty = property.replace(
        /[A-Z]/g,
        (c) => "-" + c.toLowerCase(),
      );
      const cssValue = typeof value === "number" ? `${value}px` : value;
      return `${cssProperty}:${cssValue}`;
    })
    .filter((row) => row)
    .join(";");
  const nested: string = Object.entries(obj)
    .map(([property, value]) => {
      if (typeof value !== "object") return "";
      return objectToString(
        property.includes("&")
          ? property.replace(/&/g, selector)
          : `selector ${property}`,
        value,
      );
    })
    .join("");

  return `${selector}{${body}}${nested}`;
}

function prependTo(parent: Element, child: Element) {
  parent.insertBefore(child, parent.firstChild);
}

const getOurContainer = (function () {
  const ourContainers = new WeakMap<Window, HTMLStyleElement>();
  return function (window: Window) {
    const found = ourContainers.get(window);
    if (found) return found;
    const doc = window.document;
    const container = doc.createElement("style");
    prependTo(doc.head, container);
    ourContainers.set(window, container);
    return container;
  };
})();

export function globalCss(window: Window, css: string) {
  getOurContainer(window).innerText += css;
}

export function scopedStyles(
  prefix: string,
  styles: StyleObject,
  win?: Window,
) {
  counter += 1;
  const name = `${prefix}-${counter}uVdOIRB`;
  const w: Window | undefined =
    win || (typeof window === "undefined" ? undefined : window);
  if (typeof w !== "undefined") {
    // :where for 0 specificity
    globalCss(w, objectToString(`:where(.${name})`, styles));
  }
  return name;
}
