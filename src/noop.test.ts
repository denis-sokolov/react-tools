import test from "ava";
import { noop } from ".";

test("noop exists", t => {
  noop();
  t.pass();
});
