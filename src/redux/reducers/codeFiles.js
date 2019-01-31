import {
  CODE_UPDATE,
  LOAD_CODEFILES,
} from "../actionTypes";

const initialState = [];

function mergeById(a, b) {
  const result = [...a];
  for(let i = 0; i < b.length; i++) {
    const element = b[i];
    const idx = result.findIndex(x => x.id === element.id);
    if(idx >= 0) {
      result[idx] = { ...result[idx], ...element };
    }
    else {
      result.push(element);
    }
  }
  return result;
}

// ideally LOAD_CODEFILES would happen before CODE_UPDATE
// but most of the edge case logic here handles in case it happens in reverse
export default function(state = initialState, action) {
  const { codeFileId, code, codeFiles } = action.payload || {};
  switch (action.type) {
    case LOAD_CODEFILES:
      return mergeById(codeFiles, state);
    case CODE_UPDATE:
      const idx = state.findIndex(x => x.id === codeFileId);
      if(idx === -1) return [{ id: codeFileId, code }]
      return [
        ...state.slice(0, idx),
        { ...state[idx], code },
        ...state.slice(idx + 1),
      ]
    default:
      return state
  }
}
