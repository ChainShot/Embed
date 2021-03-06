import {
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  UPDATE_STATE,
} from "../actionTypes";

const initialState = {
  running: false,
  output: null,
  err: null,
  idx: 0,
}

export default function(state = initialState, action) {
  const { output, err, execution } = action.payload || {};
  switch (action.type) {
    case UPDATE_STATE: 
      return execution || initialState;
    case CODE_RUN_START:
      return {
        ...state,
        running: true,
      }
    case CODE_RUN_FINISH:
      return {
        ...state,
        running: false,
        idx: state.idx + 1,
        output,
        err,
      }
    case CODE_RUN_CANCEL:
      return {
        ...state,
        running: false,
        idx: state.idx + 1,
      }
    default:
      return state
  }
}
