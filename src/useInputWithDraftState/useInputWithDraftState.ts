import { type ChangeEvent, type FocusEvent } from "react";

import { useCustomInputWithDraftState } from "./useCustomInputWithDraftState";

type El = HTMLInputElement | HTMLTextAreaElement;

type Params<Value> = ([Value] extends [string]
  ? ("" | Value extends Value // If Value can only be some string literals, then we’re not allowed to return an empty string and must enforce validateEmptyField feature // If Value is allowed to be an empty string, validating empty field is optional and not recommended
      ? { validateEmptyField?: boolean }
      : { validateEmptyField: true }) & {
      clean?: (value: string) => string;
      convert?: never;
      validate?: (value: string) => boolean;
    }
  : {
      clean?: never;
      convert: {
        fromString: (s: string) => "unparsable" | { value: Value };
        toString: (v: Value) => string;
      };
      validate?: never;
    }) & {
  value: Value;
} & ( // Wrapped in array to prevent union distribution
    | {
        onChange: (value: Value) => void;
        onChangesDone?: (value: Value) => void;
      }
    | {
        onChange?: (value: Value) => void;
        onChangesDone: (value: Value) => void;
      }
  );

type Result = {
  inputProps: {
    onBlur: (e: FocusEvent<El>) => void;
    onChange: (e: ChangeEvent<El>) => void;
    onFocus: (e: FocusEvent<El>) => void;
    value: string;
  };
  isFocused: boolean;
  setInputValue: (text: string) => void;
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
          ].join(" "),
        );
      return isValid ? { value: s as any as Value } : "unparsable";
    },
    toString: (s) => s as any as string,
  };

  const {
    draftToDisplay,
    isEditing,
    onChange,
    onDoneEditing,
    onStartEditing,
    showInvalidDraftError,
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
    setInputValue: onChange,
    showInvalidDraftError: showInvalidDraftError,
  };
}
