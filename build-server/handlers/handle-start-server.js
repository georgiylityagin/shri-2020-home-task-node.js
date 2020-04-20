const axios = require('axios');
const isReachable = require('is-reachable');
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


  let timeoutId = setTimeout(async function runAnotherCycle() {
    console.log('start new cycle');

    await updateConfig();

    await updateBuildQueue();

    await handleBuildQueue();

    timeoutId = setTimeout(runAnotherCycle, 1000)
  }, 1000);
}



function filterWaitingBuilds(builds) {
  // Фильтрует билды со статусом 'Waiting' и 'InProgress'
  // Оставляет только те 'InProgress', которые не обрабатываются в данный момент

  let waitingList = builds.filter(build => {
    return build.status === 'Waiting' || build.status === 'InProgress';
  });

  let workingOnBuilds = process.conf.agents.map(agent => {
    return agent.workingOn;
  });

  workingOnBuilds = workingOnBuilds.filter(Boolean);

  return waitingList.filter(build => {
    return !workingOnBuilds.includes(build.id);
  });
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

  process.conf.buildsList =  buildsResponce.data.data;

  // buildsList.reverse().forEach(build => {
  //   if (process.conf.buildsList.every(item => item.id !== build.id)) {
  //     process.conf.buildsList.push(build);
  //   }
  // });
}

async function handleBuildQueue() {
  const availableAgents = process.conf.agents.filter(agent => agent.available);
  const buildsQueue = filterWaitingBuilds(process.conf.buildsList);

  if (buildsQueue.length > 0 && availableAgents.length > 0) {
    // Начинаем разгребать очередь
    for (let agent of availableAgents) {
      const isOnline = await isReachable(`http://${agent.host}:${agent.port}`);

      if (!isOnline) {
        const ind = process.conf.agents.findIndex(item => item.port === agent.port);
        process.conf.agents[ind].available = false;
        continue;
      }

      const currentBuild = buildsQueue.shift();
      
      if (currentBuild) {
        if (currentBuild.status !== 'InProgress') {
          dataBaseApi.startBuild({ buildId: currentBuild.id, dateTime: new Date()})
            .then(() => {console.log(`Start build with id = ${currentBuild.id} \n`)})
            .catch(() => console.error('Error with Shri API: /build/start'));
        }

        const agentInd = process.conf.agents.findIndex(item => item.port === agent.port);

        process.conf.agents[agentInd].workingOn = currentBuild.id;
        process.conf.agents[agentInd].available = false;
  
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
          process.conf.buildsList[index].status = 'InProgress';
        })
        .catch(err => {
          console.error('Error with post build to the agent: ', err.toString());
        });
      }
    }
  }
}