export type Simple = string | number;

export type IndividualKey =
  | Simple
  | { first: number; last?: never }
  | { first?: never; last: number };
export type ListOfIndividualKeys =
  | IndividualKey[]
  | readonly [...IndividualKey[]];
export type Key = IndividualKey | ListOfIndividualKeys;
export type KeyFunction<Item> =
  | ((item: Item) => IndividualKey)
  | ((item: Item) => ListOfIndividualKeys);

export type Options = {
  collator?: Intl.CollatorOptions;
  locale?: string | string[];
  numbersBehindStrings?: boolean;
  firstKeys?: Simple[];
  lastKeys?: Simple[];
};
export type OptionsWithKey<Item> = Options & {
  key?: KeyFunction<Item>;
};
export type OptionsWithRequiredKey<Item> = OptionsWithKey<Item> &
  Required<Pick<OptionsWithKey<Item>, "key">>;
