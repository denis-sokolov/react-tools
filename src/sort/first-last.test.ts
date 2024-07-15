import avaTest from "ava";
import { sort } from ".";

function test(name: string, getActual: () => unknown, expected: unknown) {
  avaTest(name, (t) => t.deepEqual(getActual(), expected));
}

test(
  "firstKeys option",
  () =>
    sort(["aaa", "aaa", "bbb", "bbb", "ccc"], {
      firstKeys: ["aaa", "ccc"],
    }),
  ["aaa", "aaa", "ccc", "bbb", "bbb"],
);
test(
  "lastKeys option",
  () =>
    sort(["aaa", "aaa", "bbb", "bbb", "ccc"], {
      lastKeys: ["aaa", "ccc"],
    }),
  ["bbb", "bbb", "aaa", "aaa", "ccc"],
);
avaTest("firstKeys and lastKeys conflict throws", (t) =>
  t.throws(() =>
    sort([], {
      firstKeys: ["aaa"],
      lastKeys: ["bbb", "aaa", "ccc"],
    }),
  ),
);

test(
  "returned first key feature",
  () =>
    sort(["aaa", "aaa", "bbb", "bbb", "ccc"], {
      key: (val) =>
        val === "ccc" ? { first: 1 } : val === "bbb" ? { first: 2 } : val,
    }),
  ["ccc", "bbb", "bbb", "aaa", "aaa"],
);
test(
  "returned first key feature interacts with firstKeys option when returned is first",
  () =>
    sort(["aaa", "aaa", "bbb", "bbb", "ccc"], {
      firstKeys: ["zzz", "ccc"],
      key: (val) => (val === "bbb" ? { first: 1 } : val),
    }),
  ["bbb", "bbb", "ccc", "aaa", "aaa"],
);
test(
  "returned first key feature interacts with firstKeys option when firstKeys is first",
  () =>
    sort(["aaa", "aaa", "bbb", "bbb", "ccc"], {
      firstKeys: ["ccc"],
      key: (val) => (val === "bbb" ? { first: 2 } : val),
    }),
  ["ccc", "bbb", "bbb", "aaa", "aaa"],
);

test(
  "returned last key feature",
  () =>
    sort(["aaa", "aaa", "bbb", "bbb", "ccc"], {
      key: (val) =>
        val === "bbb" ? { last: 1 } : val === "ccc" ? { last: 2 } : val,
    }),
  ["aaa", "aaa", "ccc", "bbb", "bbb"],
);
test(
  "returned last key feature interacts with lastKeys option when returned is first",
  () =>
    sort(["aaa", "aaa", "bbb", "bbb", "ccc"], {
      key: (val) => (val === "bbb" ? { last: 1 } : val),
      lastKeys: ["ccc", "zzz"],
    }),
  ["aaa", "aaa", "ccc", "bbb", "bbb"],
);
test(
  "returned last key feature interacts with lastKeys option when firstKeys is first",
  () =>
    sort(["aaa", "aaa", "bbb", "bbb", "ccc"], {
      key: (val) => (val === "bbb" ? { last: 2 } : val),
      lastKeys: ["ccc"],
    }),
  ["aaa", "aaa", "bbb", "bbb", "ccc"],
);
