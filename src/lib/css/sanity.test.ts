import test from "ava";
import { runTest } from "./runTest";

[
  [{ color: "red" }, /^\.prefix[^{]+\{color:red\}$/] as const,
  [{ fontFamily: "Hey" }, /^\.prefix[^{]+\{font-family:Hey\}$/] as const,
  [{ fontSize: 12 }, /^\.prefix[^{]+\{font-size:12px\}$/] as const,
  [
    { color: "red", fontSize: 12 },
    /^\.prefix[^{]+\{color:red;font-size:12px\}$/,
  ] as const,
  [
    { color: "red", "&:hover": { color: "blue" } },
    /^\.prefix[^{]+\{color:red\}\.prefix[^{]+:hover\{color:blue\}$/,
  ] as const,
].forEach(function (c, i) {
  test(`css case ${i}`, (t) => {
    const output = runTest("prefix", c[0]);
    t.truthy(output.match(c[1]));
  });
});
