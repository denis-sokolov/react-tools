import { globalCss } from "./lib";

export function smartOutline(win?: Window) {
  const w = win || window;
  const doc = w.document;
  globalCss(w, `body.pointer-interaction * { outline: 0 !important }`);
  window.addEventListener("keydown", e => {
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
