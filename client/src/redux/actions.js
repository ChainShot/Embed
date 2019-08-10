import {
  LOAD_CODEFILES,
  CODE_UPDATE,
  CODE_SELECTIONS,
  CODE_RUN_START,
  CODE_RUN_FINISH,
  CODE_RUN_CANCEL,
  CHANGE_FOCUS,
} from "./actionTypes";

export const loadCodeFiles = (codeFiles) => ({
  type: LOAD_CODEFILES,
  payload: { codeFiles }
});

export const codeUpdate = (codeFileId, code, changes, selections) => ({
  type: CODE_UPDATE,
  payload: { codeFileId, code, changes, selections }
});
export const codeSelections = (codeFileId, selections) => ({
  type: CODE_SELECTIONS,
  payload: { codeFileId, selections }
});
export const codeRunStart = () => ({ type: CODE_RUN_START });
export const codeRunFinish = ({ output, err }) => ({
  type: CODE_RUN_FINISH,
  payload: { output, err }
});
export const codeRunCancel = () => ({ type: CODE_RUN_CANCEL });
export const changeFocus = (focus) => ({
  type: CHANGE_FOCUS,
  payload: { focus }
});
