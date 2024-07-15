import { useInputWithDraftState } from "./useInputWithDraftState";

export function Component() {
  useInputWithDraftState<string>({
    validate: (value) => value.length > 0,
    value: "",
    onChange: (value) => console.log(value),
  });

  useInputWithDraftState<"foo" | "bar">({
    validate: (value) => value.length > 0,
    value: "foo",
    onChange: (value) => console.log(value),
    validateEmptyField: true,
  });

  useInputWithDraftState<"foo" | "">({
    validate: (value) => value.length > 0,
    value: "foo",
    onChange: (value) => console.log(value),
  });

  return <></>;
}
