function postMessage(obj) {
  window.parent.postMessage(JSON.stringify(obj), '*');
}

function relay(type, payload) {
  postMessage({ type, ...payload });
}

export {
  relay
}
