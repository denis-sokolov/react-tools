import avaTest from "ava";
import { sort } from ".";

function test(name: string, getActual: () => unknown, expected: unknown) {
  avaTest(name, (t) => t.deepEqual(getActual(), expected));
}

test("empty array", () => sort([]), []);
test("simple", () => sort(["foo", "bar"]), ["bar", "foo"]);
test("numbers ahead of strings 1", () => sort(["foo", 1]), [1, "foo"]);
test("numbers ahead of strings 2", () => sort(["  ", 99]), [99, "  "]);

test(
  "simple key function 1",
  () => sort(["foo", "bar"], (val) => (val === "bar" ? 0 : 1)),
  ["bar", "foo"]
);
test(
  "simple key function 2",
  () => sort(["foo", "bar"], (val) => (val === "foo" ? 0 : 1)),
  ["foo", "bar"]
);
test(
  "key function keeps the original objects",
  () => sort([{ name: "foo" }, { name: "bar" }], (val) => val.name),
  [{ name: "bar" }, { name: "foo" }]
);
test(
  "key function option",
  () => sort(["foo", "bar"], { key: (val) => (val === "foo" ? 0 : 1) }),
  ["foo", "bar"]
);
test("key function optional", () => sort(["foo", "bar"], {}), ["bar", "foo"]);
