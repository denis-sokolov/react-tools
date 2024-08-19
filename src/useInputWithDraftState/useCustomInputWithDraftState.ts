import { useState } from "react";

type Params<Value, Draft> = {
  fromDraft: (draft: Draft) => { value: Value } | "unparsable";
  onChange?: (value: Value) => void;
  onChangesDone: (value: Value) => void;
  toDraft: (value: Value) => Draft;
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
  params: Params<Value, Draft>,
): Result<Value, Draft> {
  const { fromDraft, onChange, onChangesDone, toDraft, value } = params;

  const [state, setState] = useState<
    | { draft: Draft; editing: true }
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
      setState({ draft, editing: true });
      if (onChange) {
        const v = fromDraft(draft);
        if (v !== "unparsable") onChange(v.value);
      }
    },
    onDoneEditing: () => {
      if (!state.editing)
        throw new Error("Called onDoneEditing when not editing");
      const v = fromDraft(state.draft);
      if (v === "unparsable") {
        setState({ editing: false, invalidDraft: { draft: state.draft } });
      } else {
        onChangesDone(v.value);
        setState({ editing: false });
      }
    },
    onStartEditing: () => {
      if (state.editing)
        throw new Error("Called onStartEditing when editing already");
      setState({
        draft: state.invalidDraft ? state.invalidDraft.draft : toDraft(value),
        editing: true,
      });
    },
    showInvalidDraftError: Boolean(
      state.editing === false && state.invalidDraft,
    ),
  };
}
