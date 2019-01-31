function postMessage(obj) {
  window.parent.postMessage(JSON.stringify(obj), '*');
}

function relay(action) {
  postMessage(action);
}

export {
  relay
}
