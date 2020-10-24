export function is404OurFault() {
  if (typeof document === "undefined") return "maybe";
  if (
    document.referrer.length > 0 &&
    new URL(document.referrer).origin === location.origin
  )
    return "yes";
  return "no";
}
