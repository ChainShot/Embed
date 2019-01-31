import * as broadcaster from '../../network/broadcaster';
import {
  CODE_UPDATE,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS,
} from "../actionTypes";

const actions = [
  CODE_UPDATE,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS
];

export default (action) => {
  if(actions.indexOf(action.type) >= 0) {
    broadcaster.relay(action);
  }
}
