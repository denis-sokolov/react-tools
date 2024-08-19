import test from "ava";

import { runTest } from "./runTest";

[
  [{ color: "red" }, /^:where\(\.prefix[^{]+\{color:red\}$/] as const,
  [
    { fontFamily: "Hey" },
    /^:where\(\.prefix[^{]+\{font-family:Hey\}$/,
  ] as const,
  [{ fontSize: 12 }, /^:where\(\.prefix[^{]+\{font-size:12px\}$/] as const,
  [
    { color: "red", fontSize: 12 },
    /^:where\(\.prefix[^{]+\{color:red;font-size:12px\}$/,
  ] as const,
  [
    { "&:hover": { color: "blue" }, color: "red" },
    /^:where\(\.prefix[^{]+\{color:red\}:where\(\.prefix[^{]+:hover\{color:blue\}$/,
  ] as const,
].forEach(function (c, i) {
  test(`css case ${i}`, (t) => {
    const output = runTest("prefix", c[0]);
    t.truthy(output.match(c[1]));
  });
});
