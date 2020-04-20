const axios = require('axios');
const config = require('../agent-conf.json');
const { gitClone, checkoutCommit } = require('../handlers/handle-git');
const { runBuildCommand } = require ('../handlers/handle-build');


exports.startBuild = async (req, res) => {
  const { body } = req;
  const { id, repoName, commitHash, buildCommand, mainBranch } = body

  if (!(id && repoName && commitHash && buildCommand && mainBranch)) {
    res.status(400).send('Wrond request body');
    return;
  }

  let start, end;
  start = Date.now();

  const [acc, repo] = repoName.split('/');

  try {
    await gitClone(acc, repo, mainBranch);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error with cloning repo');
    return;
  }

  try {
    await checkoutCommit(repo, commitHash);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error with checkout commit');
    return;
  }

  try {
    const {stdout, stderr} = await runBuildCommand(repo, buildCommand);
    res.status(200).send('OK');
    end = Date.now();
    const duration = Math.ceil((end - start) / 6e4);

    // Send results to build-server
    axios.post(`http://${config.serverHost}:${config.serverPort}/notify-build-result`, {
      buildId: id,
      success: true,
      buildLog: stderr + '\n' + stdout,
      duration,
      port: config.port
    })
    .then(() => {console.log('Sent build results to the build-server\n')})
    .catch(err => {console.log('Error with sending results: ', err.message)})
  } catch (err) {
    console.error(err);
    res.status(500).send('Error with run build command');
    end = Date.now();
    const duration = Math.ceil((end - start) / 6e4);

    // Send results to build-server
    axios.post(`http://${config.serverHost}:${config.serverPort}/notify-build-result`, {
      buildId: id,
      success: false,
      buildLog: err.message,
      duration,
      port: config.port
    })
    .then(() => {console.log('Sent build results to the build-server\n')})
    .catch(err => {console.log('Error with sending results', err.message)})
  }

};
