import store from './redux/store';
import {loadCodeFiles} from './redux/actions';
import searchParams from './utils/routeParams';
import api from './utils/api';

const { apiKey, stageId } = searchParams();

async function load() {
  const { data: { codeFiles }} = await api.get(`content/${stageId}?api_key=${apiKey}`);
  store.dispatch(loadCodeFiles(codeFiles));
}

load();
