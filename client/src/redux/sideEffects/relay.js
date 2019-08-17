import * as broadcaster from '../../network/broadcaster';
import store from '../store';
import {
  CODE_UPDATE,
  CODE_SELECTIONS,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS,
  LOAD_CODEFILES,
} from "../actionTypes";

const actions = [
  CODE_UPDATE,
  CODE_SELECTIONS,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS,
  LOAD_CODEFILES,
];

export default (action) => {
  if(actions.indexOf(action.type) >= 0) {
    const state = store.getState();
    if(action.type === CHANGE_FOCUS) {
      broadcaster.relay({
        ...action,
        state: { ui: state.ui },
      });
    }
    else {
      broadcaster.relay({
        ...action,
        state,
      });
    }
  }
}
