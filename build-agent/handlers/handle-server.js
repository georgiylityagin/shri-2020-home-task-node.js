const axios = require('axios');
const config = require('../agent-conf.json');
let timerNewAttempt = 5000;
let attemptCount = 1;

const notifyServer = async (port) => {
  try {
    await axios.post(
      `http://${config.serverHost}:${config.serverPort}/notify-agent`,
      {
        port: port,
        available: true
      }
    );

    console.log('Agent is successfully registered\n');
  } catch (err) {
    console.error('Failed to connect to the build-server');
    console.log('Will retry after 10s\n');

    setTimeout(notifyServer, 10000, port);
  }
};

const sendBuildResult = async ({ buildId, success, buildLog, duration }) => {
  try {
    await axios.post(
      `http://${config.serverHost}:${config.serverPort}/notify-build-result`,
      {
        buildId,
        success,
        buildLog,
        duration,
        port: process.conf.port
      }
    );

    attemptCount = 1;
    timerNewAttempt = 5000;

    console.log('Sent build results to the build-server\n');
  } catch (err) {
    attemptCount++;

    if (attemptCount % 10 === 0) {
      timerNewAttempt = timerNewAttempt * 2;
    }

    console.error('Failed to send build results to the build-server');
    console.error(
      `Attempt №${attemptCount} will start in ${Math.round(
        timerNewAttempt / 1000
      )}s`
    );

    setTimeout(sendBuildResult, timerNewAttempt, {
      buildId,
      success,
      buildLog,
      duration
    });
  }
};

exports.notifyServer = notifyServer;
exports.sendBuildResult = sendBuildResult;
