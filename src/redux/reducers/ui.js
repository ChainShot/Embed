import {
  RESULTS_FOCUS
} from '../../config';
import {
  CHANGE_FOCUS,
  CODE_RUN_START,
} from '../actionTypes';

const initialState = {
  focus: null,
}

export default function(state = initialState, action) {
  const { focus } = action.payload || {};
  switch (action.type) {
    case CHANGE_FOCUS:
      return {
        ...state,
        focus,
      }
    case CODE_RUN_START:
      return {
        ...state,
        focus: RESULTS_FOCUS,
      }
    default:
      return state
  }
}
