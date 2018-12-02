const axios = require('axios');
const { API_URL } = require('../config');

module.exports = axios.create({ baseURL: API_URL });
