import { makeClickHandler } from "./clicks";
import { clean } from "./clean";
import { navigate } from "./navigate";

function initClean() {
  function cleanIfNeeded() {
    const hrefWithoutOrigin = location.href.substr(location.origin.length);
    if (hrefWithoutOrigin !== clean(hrefWithoutOrigin))
      navigate(clean(hrefWithoutOrigin), { replace: true });
  }
  cleanIfNeeded();
  window.addEventListener("popstate", cleanIfNeeded);
}

function initClicks() {
  document.addEventListener("click", makeClickHandler());
}

export function initRouting() {
  initClean();
  initClicks();
  initScrolling();
}

function initScrolling() {
  window.addEventListener("popstate", function () {
    const hash = location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView();
  });
}
