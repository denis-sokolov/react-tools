function findLink(
  el: EventTarget | HTMLElement | null
): HTMLLinkElement | undefined {
  if (!el || !("tagName" in el)) return undefined;
  if (el.tagName === "A") return el as HTMLLinkElement;
  return findLink(el.parentElement);
}

export function handleLinkClicks(f: (url: URL) => void) {
  const handler = function (e: MouseEvent) {
    if (e.button !== 0) return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.defaultPrevented) return;

    const link = findLink(e.target);
    if (!link) return;

    const target = link.getAttribute("target");
    if (target && target !== "_self") return;

    if (link.hasAttribute("download")) return;

    const url = new URL(link.href);

    // External links including other procols like mailto
    if (url.origin !== location.origin) return;

    e.preventDefault();
    f(url);
  };
  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}
