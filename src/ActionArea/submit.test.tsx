import test from "ava";
import { render } from "../lib-test";
import { ActionArea } from "./ActionArea";

test("ActionArea submit", (t) => {
  const button = render(<ActionArea action="submit">Send</ActionArea>);
  t.is(button.text(), "Send");
  t.true(button.is("button"));
  t.is(button.prop("type"), "submit");
  t.is(button.prop("onClick"), undefined);
});

test("ActionArea submit has base styles", (t) => {
  const button = render(<ActionArea action="submit">Show</ActionArea>);
  const className = button.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-base"));
});

test("ActionArea submit has custom styles", (t) => {
  const button = render(
    <ActionArea action="submit" className="Q">
      Show
    </ActionArea>,
  );
  const className = button.prop("className");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
});
