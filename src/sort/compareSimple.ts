import type { Options, Simple } from "./types";

export function compareSimpleValues(
  a: Simple,
  b: Simple,
  options: Pick<Options, "collator" | "locale" | "numbersBehindStrings">
) {
  const { collator, locale, numbersBehindStrings = false } = options;

  if (typeof a !== typeof b) {
    if (typeof a === "number") return numbersBehindStrings ? 1 : -1;
    if (typeof b === "number") return numbersBehindStrings ? -1 : 1;
    throw new Error(
      `Unexpected combination of types for sorting: ${typeof a} and ${typeof b}`
    );
  }

  if (typeof a === "string" && typeof b === "string")
    return a.localeCompare(b, locale, {
      numeric: true,
      usage: "sort",
      ...collator,
    });

  if (typeof a === "number" && typeof b === "number") return a - b;

  throw new Error(
    `Unexpected combination of types for sorting: ${typeof a} and ${typeof b}`
  );
}
