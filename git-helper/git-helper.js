const fse = require('fs-extra');
const Git = require('nodegit');

const acc = 'https://github.com/georgiylityagin/';
const repoPath = './tmp/repository';

const axios = require('axios');
const { Agent } = require('https');
const axiosInstance = axios.create({
  baseURL: 'https://hw.shri.yandex/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.TOKEN}`
  },
  httpsAgent: new Agent({
    rejectUnauthorized: false,
    keepAlive: true
  })
});


// Клонировать репозиторий
const gitClone = async () => {
  const exists = await fse.pathExists(repoPath);
  const repoName = process.conf.repoName;

  if (exists) {
    await fse.remove(repoPath);
  }

  return new Promise((resolve) => {
    resolve(Git.Clone(acc + repoName, repoPath));
  });
}

// Получить первый коммит
const getLastCommit = async () => {

  const repo = await Git.Repository.open(repoPath);
  const lastCommit = await repo.getBranchCommit(process.conf.mainBranch);

  return Promise.resolve({
    commitMessage: lastCommit.message(),
    commitHash: lastCommit.sha(),
    branchName: process.conf.mainBranch,
    authorName: lastCommit.author().name()
  });
}


const showLog = async () => {

  const newCommit = [];

  const repo = await Git.Repository.open(repoPath);
  await repo.fetchAll();
  await repo.mergeBranches(
    process.conf.mainBranch,
    `origin/${process.conf.mainBranch}`
  );
  console.log('dsfashf23423____________');
  const firstCommit = await repo.getBranchCommit(process.conf.mainBranch);

  const lastCommitHash = process.conf.firstCommit;

  return new Promise(res => {
    const history = firstCommit.history(Git.Revwalk.SORT.TIME);
    history.start();

    history.on('commit', commit => {
      if (commit.sha() === lastCommitHash) {
        history.removeAllListeners('commit');
        res(newCommit);
      } else {
        newCommit.push({
          commitMessage: commit.message(),
          commitHash: commit.sha(),
          branchName: process.conf.mainBranch,
          authorName: commit.author().name()
        });
      }
    });
  });
}


const gitEvent = async () => {
  try {
    console.log('Вызвали gitEvent');
    const commits = await showLog();
    console.log('showLog закончился');
    console.log(commits);

    if (commits.length > 0) {
      await Promise.all(
        commits.map(commit => axiosInstance.post('/build/request', commit))
      );
      process.conf.firstCommit = commits[0].commitHash;
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  gitClone,
  getLastCommit,
  gitEvent,
  showLog
}