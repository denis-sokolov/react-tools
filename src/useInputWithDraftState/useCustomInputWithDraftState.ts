import { useState } from "react";

type Params<Value, Draft> = {
  fromDraft: (draft: Draft) => { value: Value } | "unparsable";
  toDraft: (value: Value) => Draft;
  onChange: (value: Value) => void;
  onInput?: (value: Value) => void;
  value: Value;
};

type Result<_Value, Draft> = {
  draftToDisplay: Draft;
  isEditing: boolean;
  onChange: (draft: Draft) => void;
  onDoneEditing: () => void;
  onStartEditing: () => void;
  showInvalidDraftError: boolean;
};

export function useCustomInputWithDraftState<Value, Draft>(
  params: Params<Value, Draft>
): Result<Value, Draft> {
  const { fromDraft, onChange, onInput, toDraft, value } = params;

  const [state, setState] = useState<
    | { editing: true; draft: Draft }
    | { editing: false; invalidDraft?: { draft: Draft } }
  >({
    editing: false,
  });

  return {
    draftToDisplay: state.editing
      ? state.draft
      : state.invalidDraft
      ? state.invalidDraft.draft
      : toDraft(value),
    isEditing: state.editing,
    onChange: (draft) => {
      setState({ editing: true, draft });
      if (onInput) {
        const v = fromDraft(draft);
        if (v !== "unparsable") onInput(v.value);
      }
    },
    onDoneEditing: () => {
      if (!state.editing)
        throw new Error("Called onDoneEditing when not editing");
      const v = fromDraft(state.draft);
      if (v === "unparsable") {
        setState({ editing: false, invalidDraft: { draft: state.draft } });
      } else {
        onChange(v.value);
        setState({ editing: false });
      }
    },
    onStartEditing: () => {
      if (state.editing)
        throw new Error("Called onStartEditing when editing already");
      setState({
        editing: true,
        draft: state.invalidDraft ? state.invalidDraft.draft : toDraft(value),
      });
    },
    showInvalidDraftError: Boolean(
      state.editing === false && state.invalidDraft
    ),
  };
}
