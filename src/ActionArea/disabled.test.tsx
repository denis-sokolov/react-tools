import test from "ava";

import { render } from "../lib-test";

import { ActionArea } from "./ActionArea";

test("ActionArea disabled", (t) => {
  const area = render(
    <ActionArea action={{ disabledReason: "Not allowed" }}>
      Homepage
    </ActionArea>,
  );
  t.is(area.text(), "Homepage");
  t.true(area.is("span"));
});

test("ActionArea disabled has base styles", (t) => {
  const area = render(
    <ActionArea action={{ disabledReason: "Not allowed" }}>
      Homepage
    </ActionArea>,
  );
  const className = area.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-base"));
});

test("ActionArea disabled has disabled styles", (t) => {
  const area = render(
    <ActionArea action={{ disabledReason: "Not allowed" }}>
      Homepage
    </ActionArea>,
  );
  const className = area.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-disabled"));
});

test("ActionArea disabled has custom styles", (t) => {
  const area = render(
    <ActionArea action={{ disabledReason: "Not allowed" }} className="Q">
      Show
    </ActionArea>,
  );
  const className = area.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
});

test("ActionArea disabled sets the title", (t) => {
  const area = render(
    <ActionArea action={{ disabledReason: "Foo" }}>Homepage</ActionArea>,
  );
  t.is(area.prop("title"), "Foo");
});
