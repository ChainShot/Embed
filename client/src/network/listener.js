import store from '../redux/store';
import {
  CODE_UPDATE,
  CODE_SELECTIONS,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS,
  WATCH_MODE_ON,
  WATCH_MODE_OFF,
  UPDATE_STATE,
} from "../redux/actionTypes";

const actionTypes = [
  CODE_UPDATE,
  CODE_SELECTIONS,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS,
  WATCH_MODE_ON,
  WATCH_MODE_OFF,
  UPDATE_STATE,
]

window.addEventListener("message", receiveMessage, false);

function receiveMessage({ origin, data, source }) {
  if(typeof data !== 'string') return;

  try {
    const message = JSON.parse(data);
    const { type, payload } = message;

    if(actionTypes.indexOf(type) >= 0) {
      store.dispatch({ type, payload, source: "external" });
    }
    else {
      console.warn(`Embed App: Unknown Event type of ${type}`)
    }
  }
  catch(ex) {
    console.warn(ex);
  }
}
