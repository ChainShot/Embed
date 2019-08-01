import {
  RESULTS_FOCUS
} from '../../config';
import {
  CHANGE_FOCUS,
  CODE_RUN_START,
  WATCH_MODE_OFF,
  WATCH_MODE_ON,
  UPDATE_STATE,
} from '../actionTypes';

const initialState = {
  focus: null,
  watchMode: false,
}

export default function(state = initialState, action) {
  const { focus, ui } = action.payload || {};
  switch (action.type) {
    case UPDATE_STATE:
      return {
        ...state,
        focus: ui.focus,
      }
    case WATCH_MODE_OFF:
      return {
        ...state,
        watchMode: false,
      }
    case WATCH_MODE_ON:
      return {
        ...state,
        watchMode: true,
      }
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
