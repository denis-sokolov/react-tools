import { sortInternal } from "./sort";
import {
  type KeyFunction,
  type OptionsWithKey,
  type OptionsWithRequiredKey,
  type Simple,
} from "./types";

/**
 * Sort an array with convenience features
 */
export function sort<Item extends Simple>(input: readonly Item[]): Item[];
export function sort<Item>(
  input: readonly Item[],
  key: KeyFunction<Item>,
): Item[];
export function sort<Item extends Simple>(
  input: readonly Item[],
  options: OptionsWithKey<Item>,
): Item[];
export function sort<Item>(
  input: readonly Item[],
  options: OptionsWithRequiredKey<Item>,
): Item[];
export function sort<Item>(
  input: readonly Item[],
  options?: KeyFunction<Item> | OptionsWithKey<Item>,
): Item[] {
  const optionsObj =
    typeof options === "function" ? { key: options } : (options ?? {});
  const fullOptions = {
    ...optionsObj,
    key: optionsObj.key ?? (((item: Item) => item) as KeyFunction<Item>),
  };
  return sortInternal(input, fullOptions);
}
