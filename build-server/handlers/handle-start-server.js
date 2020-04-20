const axios = require('axios');
const dataBaseApi = require('../helpers/db-api');

exports.onStart = async () => {

  // Get config
  const configResponce = await dataBaseApi.getConf();
  const { repoName, buildCommand, mainBranch } = configResponce.data.data;
  process.conf.settings = { repoName, buildCommand, mainBranch };

  // Get builds queue
  const buildsResponce = await dataBaseApi.getBuildList();
  const buildsList =  buildsResponce.data.data;
  process.conf.buildsList = buildsList;


  setInterval(async () => {
    // Update config if changed
    const configResponce = await dataBaseApi.getConf();
    const { repoName, buildCommand, mainBranch } = configResponce.data.data;

    if (repoName !== process.conf.settings.repoName) {
      process.conf.settings.repoName = repoName;
    }

    if (buildCommand !== process.conf.settings.buildCommand) {
      process.conf.settings.buildCommand = buildCommand;
    }

    if (mainBranch !== process.conf.settings.mainBranch) {
      process.conf.settings.mainBranch = mainBranch;
    }


    // Update buildQueue
    const buildsResponce = await dataBaseApi.getBuildList();
    const buildsList =  buildsResponce.data.data;

    buildsList.reverse().forEach(build => {
      if (process.conf.buildsList.every(item => item.id !== build.id)) {
        process.conf.buildsList.push(build);
      }
    });

  }, 3000);

  setInterval(() => {
    const availableAgents = process.conf.agents.filter(agent => agent.available);
    const buildsQueue = filterWaitingBuilds(process.conf.buildsList);

    if (buildsQueue.length > 0 && availableAgents.length > 0) {
      // Начинаем разгребать очередь
      availableAgents.forEach(agent => {
        const currentBuild = buildsQueue.shift();
        
        dataBaseApi.startBuild({ buildId: currentBuild.id, dateTime: new Date()})
          .catch(err => console.error('Error with Shri API: /build/start'));

        axios.post(`http://${agent.host}:${agent.port}/build`, {
          id: currentBuild.id,
          repoName: process.conf.settings.repoName,
          commitHash: currentBuild.commitHash,
          buildCommand: process.conf.settings.buildCommand,
          mainBranch: currentBuild.branchName
        })
        .then(() => {
          // Изменить статус билда с Waiting на InProgress
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
  }, 5000);

  // Find build agents
  process.conf.agents.filter 
}

function filterWaitingBuilds(builds) {
  return builds.filter(build => build.status === 'Waiting');
}
