import React from "react";
import test from "ava";
import { render } from "../lib/test";
import { ActionArea } from "./ActionArea";

test("ActionArea button", t => {
  const f = () => {};
  const button = render(<ActionArea action={f}>Show</ActionArea>);
  t.is(button.text(), "Show");
  t.true(button.is("button"));
  t.is(button.prop("type"), "button");
  t.is(button.prop("onClick"), f);
});

test("ActionArea button has base styles", t => {
  const button = render(<ActionArea action={() => {}}>Show</ActionArea>);
  const className = button.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-base"));
});

test("ActionArea button has custom styles", t => {
  const button = render(
    <ActionArea action={() => {}} className="Q">
      Show
    </ActionArea>
  );
  const className = button.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
});
