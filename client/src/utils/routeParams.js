import Route from 'route-parser';

const route = new Route('/:stageId?api_key=:apiKey');

export default () => route.match(window.location.pathname+window.location.search);
