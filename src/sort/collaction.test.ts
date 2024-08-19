import avaTest from "ava";

import { sort } from ".";

function test(name: string, getActual: () => unknown, expected: unknown) {
  avaTest(name, (t) => t.deepEqual(getActual(), expected));
}

test(
  "respect custom locale",
  () =>
    sort(["iii", "yyy", "kkk"], {
      key: (val) => val,
      locale: "lt",
    }),
  ["iii", "yyy", "kkk"],
);
test(
  "respect human-like numbers in strings by default",
  () => sort(["foo 1", "foo 2", "foo 11"]),
  ["foo 1", "foo 2", "foo 11"],
);
test(
  "allows custom collation options",
  () => sort(["foo 1", "foo 2", "foo 11"], { collator: { numeric: false } }),
  ["foo 1", "foo 11", "foo 2"],
);
