import test from "ava";

import { render } from "../../lib-test";
import { ActionArea } from "../ActionArea";

test("ActionArea custom span rendering", (t) => {
  const span = render(
    <ActionArea action="disabled" renderDiv={() => <span>Foo</span>}>
      Do X
    </ActionArea>,
  );

  t.not(span.text(), "Do X");
  t.false(span.is("div"));
  t.is(span.text(), "Foo");
  t.true(span.is("span"));
});
