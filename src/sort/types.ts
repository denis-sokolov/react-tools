export type Simple = string | number;

export type Key =
  | Simple
  | { first: number; last?: never }
  | { first?: never; last: number };
export type KeyFunction<Item> = (item: Item) => Key;

export type Options = {
  collator?: Intl.CollatorOptions;
  locale?: string | string[];
  firstKeys?: Simple[];
  lastKeys?: Simple[];
};
export type OptionsWithKey<Item> = Options & {
  key?: KeyFunction<Item>;
};
export type OptionsWithRequiredKey<Item> = OptionsWithKey<Item> &
  Required<Pick<OptionsWithKey<Item>, "key">>;
