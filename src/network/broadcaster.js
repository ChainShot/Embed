function postMessage(msg) {
  window.parent.postMessage(msg, '*');
}

function postJSON(obj) {
  postMessage(JSON.stringify(obj));
}

function relay(action) {
  postJSON(action);
}

function ready() {
  postMessage("ready");
}

export {
  relay,
  ready,
}
