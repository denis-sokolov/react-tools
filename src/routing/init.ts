import { handleLinkClicks } from "./clicks";
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
  handleLinkClicks(navigate);
}

export function initRouting(
  options: {
    handleCleaning?: boolean;
    handleClicks?: boolean;
    handleScrolling?: boolean;
  } = {}
) {
  const {
    handleCleaning = true,
    handleClicks = true,
    handleScrolling = true,
  } = options;

  if (handleCleaning) initClean();
  if (handleClicks) initClicks();
  if (handleScrolling) initScrolling();
}

function initScrolling() {
  function getTargetElement() {
    const hash = location.hash;
    if (!hash) return;
    return document.querySelector(hash);
  }
  window.addEventListener("popstate", function () {
    const el = getTargetElement();
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  });
}
