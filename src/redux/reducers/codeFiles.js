import {
  CODE_UPDATE,
  LOAD_CODEFILES,
} from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  const { codeFileId, code, codeFiles } = action.payload || {};
  switch (action.type) {
    case LOAD_CODEFILES:
      return codeFiles;
    case CODE_UPDATE:
      const idx = state.findIndex(x => x.id === codeFileId);
      return [
        ...state.slice(0, idx),
        { ...state[idx], code },
        ...state.slice(idx + 1),
      ]
    default:
      return state
  }
}
