const axios = require('axios');
const baseURL = process.env.API_URL || 'http://localhost:3002/';

module.exports = axios.create({ baseURL });
