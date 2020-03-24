import test from "ava";
import { computeUrl } from "./computeUrl";

[
  ["/base", "/new", "/new"],
  ["/base", "/new/2", "/new/2"],
  ["/base", "/base?foo", "/base?foo"],
  ["/base?foo", "/new", "/new"],
].forEach(([base, input, expected]) => {
  test(`routing computeUrl ${base} to ${input}`, (t) => {
    const b = new URL(`https://example.com${base}`);
    const resultUrl = computeUrl(input, b);
    t.is(resultUrl.href.substr(resultUrl.origin.length), expected);
  });
});
