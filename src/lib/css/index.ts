import type { CSSProperties } from "react";

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
        (c) => "-" + c.toLowerCase()
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
        value
      );
    })
    .join("");

  return `${selector}{${body}}${nested}`;
}

function prependTo(parent: Element, child: Element) {
  parent.insertBefore(child, parent.firstChild);
}

export function globalCss(window: Window, css: string) {
  const doc = window.document;
  const s = doc.createElement("style");
  s.innerText = css;
  prependTo(doc.head, s);
}

export function scopedStyles(
  prefix: string,
  styles: StyleObject,
  win?: Window
) {
  counter += 1;
  const name = `${prefix}-${counter}uVdOIRB`;
  const w: Window | undefined =
    win || (typeof window === "undefined" ? undefined : window);
  if (typeof w !== "undefined") {
    const style = w.document.createElement("style");
    style.innerText = objectToString("." + name, styles);
    prependTo(w.document.head, style);
  }
  return name;
}
