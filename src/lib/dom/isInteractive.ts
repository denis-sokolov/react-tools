export function isInteractive(el: Element) {
  const isInteractiveTag =
    "a,audio,button,input,label,menu,menuitem,option,select,summary,textarea,video"
      .split(",")
      .includes(el.tagName.toLowerCase());
  if (isInteractiveTag) return true;
  const interactiveAriaRoles = "button,checkbox,listbox,switch,tab".split(",");
  const isInteractiveAriaRole =
    interactiveAriaRoles.includes(
      el.getAttribute("aria-role")?.toLowerCase() || "",
    ) ||
    interactiveAriaRoles.includes(el.getAttribute("role")?.toLowerCase() || "");
  if (isInteractiveAriaRole) return true;
  return false;
}
