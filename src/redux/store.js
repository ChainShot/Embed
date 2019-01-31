import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import sideEffects from './sideEffects';
import createMiddleware from './sideEffects/middleware';

const store = createStore(
  rootReducer,
  applyMiddleware(createMiddleware(sideEffects)),
);

export default store;
