const axios = require('axios');
const dataBaseApi = require('../helpers/db-api');

exports.onStart = async () => {

  // Get config
  const configResponce = await dataBaseApi.getConf();
  const { repoName, buildCommand, mainBranch } = configResponce.data.data;

  process.conf.repoName = repoName;
  process.conf.buildCommand = buildCommand;
  process.conf.mainBranch = mainBranch;

  // Get builds queue
  const buildsResponce = await dataBaseApi.getBuildList();
  const buildsList =  buildsResponce.data.data;

  process.conf.buildsList = buildsList;


  let timeoutId = setTimeout(async function handleChanges() {
    await updateConfig();

    await updateBuildQueue();

    await handleBuildQueue();

    timeoutId = setTimeout(handleChanges, 5000)
  }, 5000);
}



function filterWaitingBuilds(builds) {
  return builds.filter(build => build.status === 'Waiting');
}

async function updateConfig() {
  const configResponce = await dataBaseApi.getConf();
  const { repoName, buildCommand, mainBranch } = configResponce.data.data;

    if (repoName !== process.conf.repoName) {
      process.conf.repoName = repoName;
    }

    if (buildCommand !== process.conf.buildCommand) {
      process.conf.buildCommand = buildCommand;
    }

    if (mainBranch !== process.conf.mainBranch) {
      process.conf.mainBranch = mainBranch;
    }
}

async function updateBuildQueue() {
  const buildsResponce = await dataBaseApi.getBuildList();
  const buildsList =  buildsResponce.data.data;

  buildsList.reverse().forEach(build => {
    if (process.conf.buildsList.every(item => item.id !== build.id)) {
      process.conf.buildsList.push(build);
    }
  });
}

async function handleBuildQueue() {
  const availableAgents = process.conf.agents.filter(agent => agent.available);
  const buildsQueue = filterWaitingBuilds(process.conf.buildsList);

  if (buildsQueue.length > 0 && availableAgents.length > 0) {
    // Начинаем разгребать очередь
    availableAgents.forEach(agent => {
      const currentBuild = buildsQueue.shift();
      
      dataBaseApi.startBuild({ buildId: currentBuild.id, dateTime: new Date()})
        .then(() => {console.log(`Start build with id = ${currentBuild.id} \n`)})
        .catch(() => console.error('Error with Shri API: /build/start'));

      axios.post(`http://${agent.host}:${agent.port}/build`, {
        id: currentBuild.id,
        repoName: process.conf.repoName,
        commitHash: currentBuild.commitHash,
        buildCommand: process.conf.buildCommand,
        mainBranch: currentBuild.branchName
      })
      .then(() => {
        console.log(`Pass the build task to the agent on port ${agent.port} \n`)
        // Обновить статус билда с Waiting на InProgress
        const index = process.conf.buildsList.findIndex(build => build.id === currentBuild.id);
        if (index !== -1) {
          process.conf.buildsList[index].status = 'InProgress';
        } else {
          console.log('Не получилось изменить статус билда!!!!!!!!!!')
        }
      })
      .catch(err => {console.error('Error with post build to the agent: ', err.toString())})
    });
  }
}