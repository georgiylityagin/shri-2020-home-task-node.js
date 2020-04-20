const axios = require('axios');
const config = require('../agent-conf.json');

const notifyServer = async (port) => {
  try {
    await axios.post(`http://${config.serverHost}:${config.serverPort}/notify-agent`, {
      port: port,
      available: true
    })

    console.log('Agent is successfully registered\n')
  } catch (err) {
    console.error('Failed to connect to the build-server');
    console.log('Will retry after 10s\n');

    setTimeout(notifyServer, 10000, port);
  }
}

const sendBuildResult = async ({ buildId, success, buildLog, duration }, attemptsLeft) => {

  if (attemptsLeft > 0) {
    try {
      await axios.post(`http://${config.serverHost}:${config.serverPort}/notify-build-result`, {
          buildId,
          success,
          buildLog,
          duration,
          port: process.conf.port
        })

      console.log('Sent build results to the build-server\n');
    } catch (err) {
      console.log(err)
      console.error('Failed to send build results to the build-server');
      console.log('Another attempt after 5s');
  
      setTimeout(sendBuildResult, 5000, { buildId, success, buildLog, duration }, attemptsLeft - 1)
    }
  } else {
    console.error('Last attempt to send results failed...');
  }
}

exports.notifyServer = notifyServer;
exports.sendBuildResult = sendBuildResult;
