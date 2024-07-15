import { globalCss } from "./lib";

const globalWindow = typeof window === "undefined" ? undefined : window;

export function smartOutline(win?: Window) {
  const w = win || globalWindow;
  if (!w) return;
  const doc = w.document;
  globalCss(
    w,
    `
    body.pointer-interaction *,
    body.pointer-interaction *::before,
    body.pointer-interaction *::after {
      outline: 0 !important
    }
  `,
  );
  window.addEventListener("keydown", (e) => {
    const body = doc.querySelector("body");
    if (!body) return;
    if (e.key !== "Tab") return;
    body.classList.remove("pointer-interaction");
  });
  window.addEventListener("mousedown", () => {
    const body = doc.querySelector("body");
    if (!body) return;
    body.classList.add("pointer-interaction");
  });
}
