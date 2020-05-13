const express = require('express');
const config = require('./server-conf.json');
process.conf = { agents: [] };
const router = require('./routes/routes');
const { onStart } = require('./handlers/handle-start-server');

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(config.port, err => {
  if (err) {
    console.error(err)
  }
  console.log(`Build server is listening on port ${config.port} \n`)

  onStart();
});