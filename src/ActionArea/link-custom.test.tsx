import test from "ava";
import { render } from "../lib-test";
import { ActionArea } from "./ActionArea";

test("ActionArea custom link rendering", (t) => {
  const link = render(
    <ActionArea action="/" renderLink={() => <div>Foo</div>}>
      Homepage
    </ActionArea>,
  );

  t.not(link.text(), "Homepage");
  t.false(link.is("a"));
  t.not(link.prop("href"), "/");
});

test("ActionArea custom link rendering with props", (t) => {
  const link = render(
    <ActionArea action="/" renderLink={(props) => <div>{props.href}</div>}>
      Homepage
    </ActionArea>,
  );

  t.is(link.text(), "/");
});
