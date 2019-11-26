import React from "react";
import test from "ava";
import { render } from "../lib";
import { ActionArea } from "./ActionArea";

test("ActionArea link", t => {
  const link = render(<ActionArea action="/">Homepage</ActionArea>);
  t.is(link.text(), "Homepage");
  t.true(link.is("a"));
  t.is(link.prop("href"), "/");
});

test("ActionArea link in newWindow", t => {
  const link = render(
    <ActionArea action={{ newWindow: "/" }}>Homepage</ActionArea>
  );
  t.is(link.text(), "Homepage");
  t.true(link.is("a"));
  t.is(link.prop("href"), "/");
  t.is(link.prop("target"), "_blank");
});

test("ActionArea link has base styles", t => {
  const link = render(<ActionArea action="/">Homepage</ActionArea>);
  const className = link.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-base"));
});

test("ActionArea link is marked current", t => {
  const link = render(
    <ActionArea action="/" currentPath="/">
      Homepage
    </ActionArea>
  );
  t.true(link.is("span"));
  const className = link.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("current"));
});

test("ActionArea link has custom styles", t => {
  const link = render(
    <ActionArea action="/" className="Q">
      Homepage
    </ActionArea>
  );
  const className = link.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
});

test("ActionArea link takes custom className and works together with current", t => {
  const link = render(
    <ActionArea action="/" className="Q" currentPath="/">
      Homepage
    </ActionArea>
  );
  const className = link.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
  t.true(className.split(" ").includes("current"));
});

test("ActionArea link current has disabled styles", t => {
  const link = render(
    <ActionArea action="/" currentPath="/">
      Homepage
    </ActionArea>
  );
  const className = link.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-disabled"));
});
