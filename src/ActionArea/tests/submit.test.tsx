import test from "ava";

import { render } from "../../lib-test";
import { ActionArea } from "../ActionArea";

test("ActionArea submit", (t) => {
  const button = render(<ActionArea action="submit">Send</ActionArea>);
  t.is(button.text(), "Send");
  t.true(button.is("button"));
  t.is(button.attr("type"), "submit");
  t.is(button.attr("onClick"), undefined);
});

test("ActionArea submit has base styles", (t) => {
  const button = render(<ActionArea action="submit">Show</ActionArea>);
  const className = button.attr("class");
  if (typeof className !== "string") throw new Error();
  t.true(className.includes("-base"));
});

test("ActionArea submit has custom styles", (t) => {
  const button = render(
    <ActionArea action="submit" className="Q">
      Show
    </ActionArea>,
  );
  const className = button.attr("class");
  if (typeof className !== "string") throw new Error();
  t.true(className.split(" ").includes("Q"));
});
