const express = require('express');
const config = require('./agent-conf.json');
const router = require('./routes/routes');
const axios = require('axios')

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(config.port, err => {
  if (err) {
    console.error(err)
  }

  console.log(`Build agent is listening on port ${config.port}`);

  axios.post(`http://${config.serverHost}:${config.serverPort}/notify-agent`, {
    "port": config.port
  })
    .then(() => {console.log('Agent is successfully registered')})
    .catch(err => console.log(err.message))
});