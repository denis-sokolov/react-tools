import test from "ava";
import { render } from "../lib-test";
import { ActionArea } from "./ActionArea";

test("ActionArea custom span rendering", (t) => {
  const span = render(
    <ActionArea action="disabled" renderSpan={() => <div>Foo</div>}>
      Do X
    </ActionArea>,
  );

  t.not(span.text(), "Do X");
  t.false(span.is("span"));
  t.is(span.text(), "Foo");
  t.true(span.is("div"));
});
