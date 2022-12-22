import { sort } from ".";

/**
 * Fail when a key function can return arrays and non-arrays at the same time
 */
// @ts-expect-error
sort(["foo"], (v) => (v === "foo" ? [1] : 0));
