export function computeUrl(input: string | URL, baseUrl?: URL): URL {
  if (typeof input !== "string") return input;

  const base = baseUrl || new URL(location.href);

  if (input.match(/^\/(?!\/)/)) {
    const path = input;
    return new URL(base.origin + path);
  }

  throw new Error(`Invalid path ${input}`);
}
