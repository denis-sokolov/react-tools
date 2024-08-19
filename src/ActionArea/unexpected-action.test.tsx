import test from "ava";

import { render, silenceConsole } from "../lib-test";

import { ActionArea } from "./ActionArea";

test("ActionArea unexpected action", (t) => {
  t.throws(
    silenceConsole(() =>
      render(<ActionArea action={false as any}>Show</ActionArea>),
    ),
  );
});
