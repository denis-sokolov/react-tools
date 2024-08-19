import test from "ava";

import { clean } from "./clean";

(
  [
    ["/", "/"],
    ["//", "/"],
    ["/foo", "/foo"],
    ["/foo/", "/foo"],
    ["/foo//", "/foo"],
    ["/foo//?", "/foo"],
    ["/foo?path=/", "/foo?path=/"],
    ["/foo?bar", "/foo?bar"],
    ["/foo?bar&", "/foo?bar"],
    ["/foo?bar=", "/foo?bar"],
    ["/foo/bar//quux/?baz=", "/foo/bar/quux?baz"],
  ] as const
).forEach(([input, expected]) => {
  test(`routing cleans a href ${input}`, (t) => {
    t.is(clean(input), expected);
  });
});
