import type { ChangeEvent, FocusEvent } from "react";
import { useCustomInputWithDraftState } from "./useCustomInputWithDraftState";

type Params<Value> = {
  value: Value;
} & (
  | { onChange: (value: Value) => void; onChangesDone?: (value: Value) => void }
  | { onChange?: (value: Value) => void; onChangesDone: (value: Value) => void }
) &
  (Value extends string
    ? {
        clean?: (value: string) => string;
        convert?: never;
        validate?: (value: string) => boolean;
      } & (Value | "" extends Value // If Value can only be some string literals, then we’re not allowed to return an empty string and must enforce validateEmptyField feature // If Value is allowed to be an empty string, validating empty field is optional and not recommended
        ? { validateEmptyField?: boolean }
        : { validateEmptyField: true })
    : {
        clean?: never;
        convert?: {
          fromString: (s: string) => { value: Value } | "unparsable";
          toString: (v: Value) => string;
        };
        validate?: never;
      });

type El = HTMLInputElement | HTMLTextAreaElement;

type Result = {
  inputProps: {
    onBlur: (e: FocusEvent<El>) => void;
    onFocus: (e: FocusEvent<El>) => void;
    onChange: (e: ChangeEvent<El>) => void;
    value: string;
  };
  isFocused: boolean;
  showInvalidDraftError: boolean;
};

export function useInputWithDraftState<Value>(params: Params<Value>): Result {
  const clean = params.clean || ((s) => s.trim());
  const validate = params.validate || (() => true);
  const convert = params.convert || {
    fromString: (s) => {
      s = clean(s);
      const isValid = validate(s);
      if (s.length === 0 && !isValid)
        throw new Error(
          [
            "Custom validation function returned false when string is empty.",
            //
          ].join(" ")
        );
      return isValid ? { value: s as any as Value } : "unparsable";
    },
    toString: (s) => s as any as string,
  };

  const {
    draftToDisplay,
    isEditing,
    showInvalidDraftError,
    onChange,
    onDoneEditing,
    onStartEditing,
  } = useCustomInputWithDraftState<Value, string>({
    fromDraft: convert.fromString,
    onChange: params.onChange ?? (() => {}),
    onChangesDone: params.onChangesDone ?? (() => {}),
    toDraft: convert.toString,
    value: params.value,
  });

  return {
    inputProps: {
      onBlur: onDoneEditing,
      onChange: (e) => onChange(e.target.value),
      onFocus: onStartEditing,
      value: draftToDisplay,
    },
    isFocused: isEditing,
    showInvalidDraftError: showInvalidDraftError,
  };
}
