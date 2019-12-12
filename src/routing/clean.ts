export function clean(hrefWithoutOrigin: string) {
  const m = hrefWithoutOrigin.match(/^(\/[^?#]*)(.*)$/);
  if (!m) throw new Error(`Unexpected href ${hrefWithoutOrigin}`);
  const [, path, query] = m;
  return (
    path.replace(/\/{2,}/g, "/").replace(/(.)\/$/g, "$1") +
    query.replace(/[?#&=]+$/g, "")
  );
}
