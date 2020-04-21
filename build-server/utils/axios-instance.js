const axios = require('axios');
const { Agent } = require('https');
const config = require('../server-conf.json');

const axiosInstance = axios.create({
  baseURL: 'https://hw.shri.yandex/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${config.apiToken}`
  },
  httpsAgent: new Agent({
    rejectUnauthorized: false,
    keepAlive: true
  })
});

module.exports = axiosInstance;
