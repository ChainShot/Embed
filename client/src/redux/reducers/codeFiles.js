import {
  CODE_UPDATE,
  CODE_SELECTIONS,
  LOAD_CODEFILES,
  UPDATE_STATE,
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
  }
  return result;
}

export default function(state = initialState, action) {
  const { codeFileId, code, changes, selections, codeFiles } = action.payload || {};
  switch (action.type) {
    case UPDATE_STATE:
      // merges the codefiles into the existing state by id
      return mergeById(state, codeFiles || []);
    case LOAD_CODEFILES:
      return codeFiles;
    case CODE_SELECTIONS: {
      const idx = state.findIndex(x => x.id === codeFileId);
      if(idx === -1) return state;
      return [
        ...state.slice(0, idx),
        {
          ...state[idx],
          selections, // replace selections (we only care about the latest)
        },
        ...state.slice(idx + 1),
      ]
    }
    case CODE_UPDATE: {
      const idx = state.findIndex(x => x.id === codeFileId);
      if(idx === -1) return [{ id: codeFileId, code }]
      return [
        ...state.slice(0, idx),
        {
          ...state[idx],
          code,
          changes: (state[idx].changes || []).concat(changes || []),
        },
        ...state.slice(idx + 1),
      ]
    }
    default:
      return state
  }
}
