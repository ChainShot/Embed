import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import sideEffects from './sideEffects';
import createMiddleware from './sideEffects/middleware';

const watchModeMiddelware = store => next => action => {
  if(!store.getState().ui.watchMode || action.source === 'external') {
    next(action);
  }
}

const store = createStore(
  rootReducer,
  applyMiddleware(watchModeMiddelware, createMiddleware(sideEffects)),
);

export default store;
