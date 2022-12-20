import type { Key, Options, OptionsWithRequiredKey, Simple } from "./types";

import { compareSimpleValues } from "./compareSimple";

function getKeyFirstIndex(key: Key, options: Options): number | "no" {
  const { firstKeys } = options;
  if (typeof key === "object") return key.first ?? "no";
  if (!firstKeys) return "no";
  const val = firstKeys.indexOf(key);
  if (val === -1) return "no";
  return val;
}

function getKeyLastIndex(key: Key, options: Options): number | "no" {
  const { lastKeys } = options;
  if (typeof key === "object") return key.last ?? "no";
  if (!lastKeys) return "no";
  const val = lastKeys.indexOf(key);
  if (val === -1) return "no";
  return lastKeys.length - val;
}

function compareKeys(a: Key, b: Key, options: Options) {
  const aInFirst = getKeyFirstIndex(a, options);
  const bInFirst = getKeyFirstIndex(b, options);
  if (aInFirst !== "no" && bInFirst !== "no") return aInFirst - bInFirst;
  if (aInFirst !== "no") return -1;
  if (bInFirst !== "no") return 1;

  const aInLast = getKeyLastIndex(a, options);
  const bInLast = getKeyLastIndex(b, options);
  if (aInLast !== "no" && bInLast !== "no") return bInLast - aInLast;
  if (aInLast !== "no") return 1;
  if (bInLast !== "no") return -1;

  if (typeof a === "object" || typeof b === "object")
    throw new Error("Unexpected non-simple value in compareKeys");

  return compareSimpleValues(a, b, options);
}

function hasSharedValues(a: Simple[], b: Simple[]) {
  const aSet = new Set(a);
  return b.some((val) => aSet.has(val));
}

export function sortInternal<Item>(
  input: readonly Item[],
  options: OptionsWithRequiredKey<Item>
): Item[] {
  const result = input.slice(0);
  const { key } = options;

  if (hasSharedValues(options.firstKeys ?? [], options.lastKeys ?? []))
    throw new Error(
      "firstKeys and lastKeys has some shared values. I don’t know how to make them both first and last at the same time"
    );

  result.sort((leftData, rightData) => {
    const leftKey = key(leftData);
    const rightKey = key(rightData);
    return compareKeys(leftKey, rightKey, options);
  });
  return result;
}
