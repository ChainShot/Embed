import store from '../redux/store';
import {loadCodeFiles, changeFocus} from '../redux/actions';
import searchParams from '../utils/routeParams';
import api from '../utils/api';

const { apiKey, stageId } = searchParams();

async function load() {
  const { data: { codeFiles }} = await api.get(`content/${stageId}?api_key=${apiKey}`);
  // list of booleans where a should be taken if a is true and b is false
  // listed in order of priority for the sort
  const BOOLEAN_SORT_PROPS = [
    'hasProgress',
    'readOnly',
    'executable',
    'testFixture',
  ]
  const sorted = codeFiles.sort((a,b) => {
    for(let i = 0; i < BOOLEAN_SORT_PROPS.length; i++) {
      const sortProp = BOOLEAN_SORT_PROPS[i];
      if(a[sortProp] && b[sortProp] && a[sortProp] !== b[sortProp]) {
        return a[sortProp] - b[sortProp];
      }
    }
    return a.name.localeCompare(b.name);
  }).filter(x => x.visible);

  store.dispatch({ ...loadCodeFiles(sorted), source: "external" });
  store.dispatch({ ...changeFocus(sorted[0].id), source: "external" });
}

load();
