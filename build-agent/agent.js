const express = require('express');
const config = require('./agent-conf.json');
process.conf = {};
const router = require('./routes/routes');
const { notifyServer } = require('./handlers/handle-server');

const app = express();

app.use(express.json());
app.use('/', router);


const launchAgent = (port) => {
  app.listen(port, () => {  
    console.log(`Build agent is listening on port ${port}\n`);
    process.conf.port = port;
  
    notifyServer(port);
  }).on('error', (err) => {
    if(err.errno === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use, trying with port ${port + 1}\n`);
      launchAgent(port + 1);
    } else {
      console.error(err);
    }
  })
}

launchAgent(config.port);