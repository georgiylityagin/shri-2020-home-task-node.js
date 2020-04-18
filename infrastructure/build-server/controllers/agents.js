const dataBaseApi = require('../helpers/db-api');

const agentsList = [];


exports.notifyAgent = (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('port') || !req.hostname) {
    res.status(400).send('Wrong request body');
    return;
  }

  const notInList = agentsList.every(agent => agent.port !== body.port);

  if (notInList) {
    agentsList.push({port: body.port, host: req.hostname});
  }
  
  res.status(200).send('OK');
}

exports.notifyBuildRes = async (req, res) => {
  const { body } = req;

  if (!body.buildId || !body.success || !body.buildLog) {
    res.status(400).send('Wrong request body');
    return;
  }
  
  const result = await dataBaseApi.finishBuild({...body, duration: 0});

  if (!result) {
    res.status(501).send('Not Implemented');
    return;
  }

  res.status(200).send('OK');
}