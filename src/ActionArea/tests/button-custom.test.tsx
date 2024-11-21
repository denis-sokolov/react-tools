import test from "ava";

import { render } from "../../lib-test";
import { ActionArea } from "../ActionArea";

test("ActionArea custom button rendering", (t) => {
  const button = render(
    <ActionArea action={() => {}} renderButton={() => <div>Foo</div>}>
      Do X
    </ActionArea>,
  );

  t.not(button.text(), "Do X");
  t.false(button.is("button"));
});

test("ActionArea custom button rendering with props", (t) => {
  const button = render(
    <ActionArea
      action={() => {}}
      renderButton={(props) => <div>{props.type}</div>}
    >
      Do X
    </ActionArea>,
  );

  t.is(button.text(), "button");
});
