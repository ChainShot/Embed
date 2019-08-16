import store from '../redux/store';
import {loadCodeFiles, changeFocus} from '../redux/actions';
import searchParams from '../utils/routeParams';
import api from '../utils/api';
import { ready } from './broadcaster';

const { apiKey, stageId } = searchParams();

async function load() {
  const { data: { codeFiles }} = await api.get(`content/${stageId}?api_key=${apiKey}`);
  // list of booleans where a should be lower if a is true and b is false
  // listed in order of priority for the sort
  const BOOLEAN_SORT_PROPS = [
    'readOnly',
    'executable',
    'testFixture',
    '!hasProgress',
  ]
  const sorted = codeFiles.sort((a,b) => {
    for(let i = 0; i < BOOLEAN_SORT_PROPS.length; i++) {
      let sortProp = BOOLEAN_SORT_PROPS[i];
      const reversed = (sortProp[0] === '!');
      if(reversed) {
        sortProp = sortProp.slice(1);
      }
      if(a.hasOwnProperty(sortProp) && b.hasOwnProperty(sortProp) && (a[sortProp] !== b[sortProp])) {
        return (a[sortProp] - b[sortProp]) * (reversed ? -1 : 1);
      }
    }
    return a.name.localeCompare(b.name);
  }).filter(x => x.visible).map((codeFile) => {
    // the code property is used to keep track of the workspace
    // if it is not provided initially there is no initial benchmark to use
    return {
      ...codeFile,
      code: codeFile.initialCode
    }
  });

  store.dispatch({ ...loadCodeFiles(sorted), source: "external" });

  // signal to external applications that data is loaded
  ready();

  // focus the first code file by default
  // this is done after ready so external applications can handle
  // merging progress with the existing data before we send out updates
  store.dispatch({ ...changeFocus(sorted[0].id), source: "external" });
}

load();
