import test from "ava";
import { sort } from ".";

test("does not mutate the array", (t) => {
  const input = ["foo", "bar"];
  sort(input);
  t.deepEqual(input, ["foo", "bar"]);
});

test("does not mutate the objects in the array", (t) => {
  const foo = { name: "foo" };
  const input = [foo, { name: "bar" }];
  const result = sort(input, (o) => o.name);
  t.is(result[1], foo);
});
