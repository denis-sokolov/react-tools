import test from "ava";

import { render } from "../../lib-test";
import { ActionArea } from "../ActionArea";

test("ActionArea link", (t) => {
  const link = render(<ActionArea action="/">Homepage</ActionArea>);
  t.is(link.text(), "Homepage");
  t.true(link.is("a"));
  t.is(link.attr("href"), "/");
});

test("ActionArea link in newWindow", (t) => {
  const link = render(
    <ActionArea action={{ newWindow: "/" }}>Homepage</ActionArea>,
  );
  t.is(link.text(), "Homepage");
  t.true(link.is("a"));
  t.is(link.attr("href"), "/");
  t.is(link.attr("target"), "_blank");
  const rel = link.attr("rel") || "";
  if (typeof rel !== "string")
    throw new Error(`Unexpected rel type ${typeof rel}`);
  const rels = rel.split(" ");
  t.true(rels.includes("noopener"));
});

test("ActionArea download link", (t) => {
  const link = render(
    <ActionArea action={{ download: "name", url: "/" }}>Homepage</ActionArea>,
  );
  t.is(link.text(), "Homepage");
  t.true(link.is("a"));
  t.is(link.attr("href"), "/");
  t.is(link.attr("download"), "name");
});

test("ActionArea link has base styles", (t) => {
  const link = render(<ActionArea action="/">Homepage</ActionArea>);
  const className = link.attr("class");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-base"));
});

test("ActionArea link is marked current", (t) => {
  const link = render(
    <ActionArea action="/" currentPathAndQuery="/">
      Homepage
    </ActionArea>,
  );
  t.true(link.is("div"));
  const className = link.attr("class");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("current"));
});

test("ActionArea link has custom styles", (t) => {
  const link = render(
    <ActionArea action="/" className="Q">
      Homepage
    </ActionArea>,
  );
  const className = link.attr("class");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
});

test("ActionArea link takes custom className and works together with current", (t) => {
  const link = render(
    <ActionArea action="/" className="Q" currentPathAndQuery="/">
      Homepage
    </ActionArea>,
  );
  const className = link.attr("class");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
  t.true(className.split(" ").includes("current"));
});

test("ActionArea link current has disabled styles", (t) => {
  const link = render(
    <ActionArea action="/" currentPathAndQuery="/">
      Homepage
    </ActionArea>,
  );
  const className = link.attr("class");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-disabled"));
});

test("ActionArea link with different query params is enabled", (t) => {
  const link = render(
    <ActionArea action="/?foo=1" currentPathAndQuery="/">
      Homepage
    </ActionArea>,
  );
  t.true(link.is("a"));
});

test("ActionArea link with same query params is disabled", (t) => {
  const link = render(
    <ActionArea action="/?foo=1" currentPathAndQuery="/?foo=1">
      Homepage
    </ActionArea>,
  );
  t.false(link.is("a"));
});

test("ActionArea link with same query params is disabled even if other parameters are there", (t) => {
  const link = render(
    <ActionArea action="/?foo=1" currentPathAndQuery="/?foo=1&bar=2">
      Homepage
    </ActionArea>,
  );
  t.false(link.is("a"));
});

test("ActionArea link does not respect multiple search params", (t) => {
  const link = render(
    <ActionArea action="/?foo=1" currentPathAndQuery="/?foo=1&foo=2">
      Homepage
    </ActionArea>,
  );
  t.false(link.is("a"));
});
