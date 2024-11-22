import test from "ava";

import { render, silenceConsole } from "../../lib-test";
import { ActionArea } from "../ActionArea";

test("ActionArea does not allow download on cross-origin links", (t) => {
  t.throws(
    silenceConsole(() =>
      render(
        <ActionArea action={{ download: "foo", url: "https://example.com" }}>
          Show
        </ActionArea>,
      ),
    ),
  );
});

test("ActionArea does not allow replace on cross-origin links", (t) => {
  t.throws(
    silenceConsole(() =>
      render(
        <ActionArea action={{ replace: "https://example.com" }}>
          Show
        </ActionArea>,
      ),
    ),
  );
});
