import { sort } from ".";

/**
 * Fail when trying to sort non-simple values without a key function
 */
// @ts-expect-error
sort([true, "foo"]);
// @ts-expect-error
sort([true, "foo"], {});
// @ts-expect-error
sort([null, "foo"]);
// @ts-expect-error
sort([null, "foo"], {});
// @ts-expect-error
sort([undefined, "foo"]);
// @ts-expect-error
sort([undefined, "foo"], {});
// @ts-expect-error
sort([{}, "foo"]);
// @ts-expect-error
sort([{}, "foo"], {});
// @ts-expect-error
sort([[], "foo"]);
// @ts-expect-error
sort([[], "foo"], {});
// @ts-expect-error
sort([() => {}, "foo"]);
// @ts-expect-error
sort([() => {}, "foo"], {});
// Allow tuples as key arrays
sort([], () => [1, 2] as const);
