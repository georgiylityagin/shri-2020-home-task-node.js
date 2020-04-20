const fse = require('fs-extra');
const path = require('path');
const { gitClone, checkoutCommit } = require('../handlers/handle-git');
const { runBuildCommand } = require ('../handlers/handle-build');
const { sendBuildResult, notifyServer } = require('../handlers/handle-server');

exports.startBuild = async (req, res) => {
  const { body } = req;
  const { id, repoName, commitHash, buildCommand, mainBranch } = body

  if (!(id && repoName && commitHash && buildCommand && mainBranch)) {
    res.status(400).send('Wrond request body');
    return;
  }

  console.log('Start new build\n')

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
    sendBuildResult({
      buildId: id,
      success: true,
      buildLog: stderr + '\n' + stdout,
      duration
    }, 3);
  } catch (err) {
    res.status(500).send('Error with run build command');
    end = Date.now();
    const duration = Math.ceil((end - start) / 6e4);

    // Send results to build-server
    sendBuildResult({
      buildId: id,
      success: false,
      buildLog: err.message,
      duration
    }, 3);
  }

  // Detete tmp folder with repo
  const repoHash = process.conf.repoHash;
  const repoPath = `${path.resolve(__dirname)}/../handlers/repos-tmp/${repoHash}`;

  fse.remove(repoPath)
    .catch(() => console.error('Error with delete repo folder\n'));

  notifyServer(process.conf.port);
};
