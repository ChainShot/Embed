const CODE_UPDATE = 'CODE_UPDATE';
const CODE_RUN_START = 'CODE_RUN_START';
const CODE_RUN_FINISH = 'CODE_RUN_FINISH';
const CODE_RUN_CANCEL = 'CODE_RUN_CANCEL';
const CHANGE_FOCUS = 'CHANGE_FOCUS';

function postMessage(obj) {
  window.parent.postMessage(JSON.stringify(obj), '*');
}

function codeUpdate(codeFileId, code) {
  postMessage({ type: CODE_UPDATE, codeFileId, code });
}

function codeRunStarted() {
  postMessage({ type: CODE_RUN_START });
}

function codeRunCancelled() {
  postMessage({ type: CODE_RUN_CANCEL });
}

function codeRunFinished(results, err) {
  postMessage({ type: CODE_RUN_FINISH, results, err });
}

function fileFocused(codeFileId, code) {
  postMessage({ type: CHANGE_FOCUS, codeFileId, code });
}

export {
  codeUpdate,
  codeRunStarted,
  codeRunFinished,
  codeRunCancelled,
  fileFocused,
}
