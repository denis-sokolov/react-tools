import { computeUrl } from "./computeUrl";

function detectReplace(url: URL) {
  return location.href === url.href;
}

export function navigate(
  pathOrUrl: string | URL,
  options: { replace?: boolean } = {}
) {
  const url = computeUrl(pathOrUrl);

  if (url.origin !== location.origin) {
    window.location.href = url.href;
    return;
  }

  const urlWithoutOrigin = url.href.substr(url.origin.length);
  const replace = options.replace ?? detectReplace(url);

  if (replace) window.history.replaceState(null, "", urlWithoutOrigin);
  else window.history.pushState(null, "", urlWithoutOrigin);

  window.dispatchEvent(new PopStateEvent("popstate"));
}
