import test, { ExecutionContext } from "ava";
import { color } from "./index";

const approx = (t: ExecutionContext, actual: number, expected: number) => {
  if (Math.abs(actual - expected) > 2) t.is(actual, expected);
  t.pass();
};

test("color can get hue", (t) => {
  approx(t, color("#11aabc22").hue(), 186);
});

test("color does not add alpha to hex when not needed", (t) => {
  t.is(color("hsl(270, 100%, 70%)").hex(), "#b266ff");
});

test("color does not add alpha to hsl when not needed", (t) => {
  t.is(color("hsl(270, 100%, 70%)").hsl(), "hsl(270, 100%, 70%)");
});

test("color can set saturation", (t) => {
  t.is(color("hsl(270, 60%, 70%)").withSaturation(100).hex(), "#b266ff");
});

test("color can output hex opacity", (t) => {
  t.is(color("hsla(270, 100%, 70%, 0.42)").hex(), "#b266ff6b");
});
