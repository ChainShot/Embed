import { combineReducers } from "redux";
import ui from './ui';
import execution from './execution';
import codeFiles from './codeFiles';

export default combineReducers({
  ui,
  execution,
  codeFiles,
});
