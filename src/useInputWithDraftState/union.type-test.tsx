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

  useInputWithDraftState<string | number>({
    convert: {
      fromString: (str) => {
        return { value: str.length > 1 ? 1 : "foo" };
      },
      toString: (value) => String(value),
    },
    value: 12,
    onChange: (value) => console.log(value),
  });

  useInputWithDraftState<number | null>({
    convert: {
      fromString: (str) => {
        return { value: str.length > 1 ? 1 : null };
      },
      toString: (value) => String(value),
    },
    value: null,
    onChange: (value) => console.log(value),
  });

  return <></>;
}
