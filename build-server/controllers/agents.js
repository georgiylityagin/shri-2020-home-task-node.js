const dataBaseApi = require('../helpers/db-api');

exports.notifyAgent = (req, res) => {
  const { body } = req;

  if (!body.port || !req.hostname || !body.available) {
    res.status(400).send('Wrong request body');
    return;
  }

  const index = process.conf.agents.findIndex(
    (agent) => agent.port === body.port
  );

  if (index === -1) {
    process.conf.agents.push({
      port: body.port,
      host: req.hostname,
      available: body.available,
      workingOn: undefined
    });
  } else {
    process.conf.agents[index].available = true;
    process.conf.agents[index].workingOn = undefined;
  }

  console.log('Update actual list of agents:');
  console.table(process.conf.agents);

  res.status(200).send('OK');
};

exports.notifyBuildRes = async (req, res) => {
  const { body } = req;
  const { buildId, success, buildLog, duration, port } = body;

  if ([buildId, success, buildLog, duration, port].includes(undefined)) {
    res.status(400).send('Wrong request body');
    return;
  }

  const result = await dataBaseApi.finishBuild({
    buildId,
    success,
    buildLog,
    duration
  });

  if (!result) {
    res.status(200).send('Not Implemented');
    console.log(`Fail trying to finish build ${buildId}\n`);

    return;
  } else {
    console.log(
      `Finish build ${buildId} with status: ${success ? 'success' : 'failed'}\n`
    );
  }

  res.status(200).send('OK');
};
