const express = require('express');
const config = require('./agent-conf.json');
const router = require('./routes/routes');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use('/', router);


const launchAgent = (port) => {
  app.listen(port, () => {  
    console.log(`Build agent is listening on port ${port}\n`);
  
    axios.post(`http://${config.serverHost}:${config.serverPort}/notify-agent`, {
      port: port,
      available: true
    })
      .then(() => {console.log('Agent is successfully registered\n')})
      .catch(err => console.log(err.message))
  }).on('error', (err) => {
    if(err.errno === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use, trying with port ${port + 1}\n`);
      launchAgent(port + 1);
    } else {
      console.error(err)
    }
  })
}

launchAgent(config.port);