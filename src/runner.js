import store from './redux/store';
import {codeRunFinish} from './redux/actions';
import {CODE_RUN_START} from './redux/actionTypes';
import api from './utils/api';
import searchParams from './utils/routeParams';

const { apiKey, stageId } = searchParams();

let runningWas;
store.subscribe(async () => {
  const {codeFiles, execution: { running }} = store.getState();
  if(running && !runningWas) {
    const files = codeFiles.map(({ code, initialCode, id }) => ({
      id, contents: (code === undefined) ? initialCode : code
    }));

    try {
      const { data } = await api.post(`execute/${stageId}?api_key=${apiKey}`, { files });
      store.dispatch(codeRunFinish({ output: data }));
    }
    catch(err) {
      store.dispatch(codeRunFinish({ err }));
    }
  }
  runningWas = running;
});
