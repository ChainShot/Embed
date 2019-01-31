import store from '../redux/store';
import {
  CODE_UPDATE,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS,
} from "../redux/actionTypes";

const actionTypes = [
  CODE_UPDATE,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS,
]

window.addEventListener("message", receiveMessage, false);

function receiveMessage({ origin, data, source }) {
  if(typeof data !== 'string') return;

  const message = JSON.parse(data);
  const { type, payload } = message;

  if(actionTypes.indexOf(type) >= 0) {
    store.dispatch({ type, payload });
  }
  else {
    console.warn(`Embed App: Unknown Event type of ${type}`)
  }
}
