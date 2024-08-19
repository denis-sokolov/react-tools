import test from "ava";

import {
  initRouting,
  navigate,
  Redirect,
  useQueryParam,
  useRerenderOnRouting,
} from ".";

test("routing API", (t) => {
  t.is(typeof initRouting, "function");
  t.is(typeof navigate, "function");
  t.is(typeof Redirect, "function");
  t.is(typeof useQueryParam, "function");
  t.is(typeof useRerenderOnRouting, "function");
});
