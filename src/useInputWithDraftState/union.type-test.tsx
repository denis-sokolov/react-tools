import { useInputWithDraftState } from "./useInputWithDraftState";

export function Component() {
  useInputWithDraftState<string>({
    onChange: (value) => console.log(value),
    validate: (value) => value.length > 0,
    value: "",
  });

  useInputWithDraftState<"foo" | "bar">({
    onChange: (value) => console.log(value),
    validate: (value) => value.length > 0,
    validateEmptyField: true,
    value: "foo",
  });

  useInputWithDraftState<"foo" | "">({
    onChange: (value) => console.log(value),
    validate: (value) => value.length > 0,
    value: "foo",
  });

  useInputWithDraftState<string | number>({
    convert: {
      fromString: (str) => {
        return { value: str.length > 1 ? 1 : "foo" };
      },
      toString: (value) => String(value),
    },
    onChange: (value) => console.log(value),
    value: 12,
  });

  useInputWithDraftState<number | null>({
    convert: {
      fromString: (str) => {
        return { value: str.length > 1 ? 1 : null };
      },
      toString: (value) => String(value),
    },
    onChange: (value) => console.log(value),
    value: null,
  });

  return <></>;
}
