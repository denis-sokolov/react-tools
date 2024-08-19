import test from "ava";

import { render } from "../lib-test";

import { ActionArea } from "./ActionArea";

test("ActionArea mousedown", (t) => {
  const f = () => {};
  const button = render(
    <ActionArea action={{ mousedown: f }}>Show</ActionArea>,
  );
  t.is(button.text(), "Show");
  t.true(button.is("button"));
  t.is(button.prop("onClick"), undefined);
  t.is(button.prop("onMouseDown"), f);
});

test("ActionArea mousedown has base styles", (t) => {
  const button = render(
    <ActionArea action={{ mousedown: () => {} }}>Show</ActionArea>,
  );
  const className = button.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-base"));
});

test("ActionArea mousedown has custom styles", (t) => {
  const button = render(
    <ActionArea action={{ mousedown: () => {} }} className="Q">
      Show
    </ActionArea>,
  );
  const className = button.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
});
