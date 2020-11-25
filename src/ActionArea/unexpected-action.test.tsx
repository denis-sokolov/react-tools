import test from "ava";
import { render } from "../lib-test";
import { ActionArea } from "./ActionArea";

test("ActionArea unexpected action", (t) => {
  t.throws(() => render(<ActionArea action={false as any}>Show</ActionArea>));
});
