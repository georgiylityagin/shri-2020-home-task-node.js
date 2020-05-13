import axios from 'axios';
import { Agent } from 'https';

export default axios.create({
  baseURL: 'https://hw.shri.yandex/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.TOKEN}`
  },
  httpsAgent: new Agent({
    rejectUnauthorized: false
  })
});
