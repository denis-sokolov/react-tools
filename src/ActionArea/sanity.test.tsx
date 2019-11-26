import React from "react";
import test from "ava";
import { render } from "../lib";
import { ActionArea } from "./ActionArea";

test("ActionArea sanity", t => {
  t.is(render(<ActionArea action="/">Homepage</ActionArea>).text(), "Homepage");
});
