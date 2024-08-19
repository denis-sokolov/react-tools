import avaTest from "ava";

import { sort } from ".";

function test(name: string, getActual: () => unknown, expected: unknown) {
  avaTest(name, (t) => t.deepEqual(getActual(), expected));
}

test("simple order", () => sort(["foo", "bar"], (val) => ["prefix", val]), [
  "bar",
  "foo",
]);
test(
  "respect first inside arrays",
  () =>
    sort(["foo", "bar"], (val) => [
      "prefix",
      val === "bar" ? { first: 1 } : val,
    ]),
  ["bar", "foo"],
);
