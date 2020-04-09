const fse = require('fs-extra');
const Git = require('nodegit');
const axiosInstance = require('../controllers/axiosInstance');

const baseURL = 'https://github.com/';
const repoPathBase = './tmp/';


// Клонировать репозиторий
const gitClone = async (repoName, mainBranch) => {
  const path = repoPathBase + repoName;
  const exists = await fse.pathExists(path);

  if (!exists) {
    // Клонируем
    try {
      await Git.Clone(baseURL + repoName, path, {checkoutBranch: mainBranch});
      return {result: 'success', message: 'Репозиторий успешно клонирован'};
    } catch (error) {
      return {result: 'fail', error};
    }
  } else {
    // Делаем git pull
    const repo = await Git.Repository.open(path);

    try {
      await repo.fetchAll();
      await repo.mergeBranches(mainBranch,`origin/${mainBranch}`);
    } catch(error) {
      return {result: 'fail', error};
    }

    return {result: 'success', message: 'Локальный репозиторий уже сущестует, выполнен git pull'};
  }
}

// Получить последний коммит
const getLastCommit = async (repoName, mainBranch) => {
  const path = repoPathBase + repoName;
  let lastCommit;

  try {
    const repo = await Git.Repository.open(path);
    lastCommit = await repo.getBranchCommit(mainBranch);
  } catch(error) {
    return {result: 'fail', error};
  }

  return Promise.resolve({
    commitMessage: lastCommit.message(),
    commitHash: lastCommit.sha(),
    branchName: mainBranch,
    authorName: lastCommit.author().name()
  });
}

// Проверяет репозиторий на появление новых коммитов и возвращает массив с ними
const getNewCommits = async (repoName, mainBranch, lastCommitHash) => {
  const path = repoPathBase + repoName;
  const newCommits = [];

  const repo = await Git.Repository.open(path);
  await repo.fetchAll();
  await repo.mergeBranches(mainBranch,`origin/${mainBranch}`);
  const lastCommit = await repo.getBranchCommit(mainBranch);

  return new Promise(resolve => {
    const history = lastCommit.history(Git.Revwalk.SORT.TIME);
    history.start();

    history.on('commit', commit => {
      if (commit.sha() === lastCommitHash) {
        resolve(newCommits);
        history.removeAllListeners('commit');
      } else {
        newCommits.unshift({
          commitMessage: commit.message(),
          commitHash: commit.sha(),
          branchName: process.conf.mainBranch,
          authorName: commit.author().name()
        });
      }
    });
  });
}


// Запускается через setInterval, добавляет новые коммиты в очередь на сборку
const newCommitsObserver = async (lastCommitHash) => {
  try {
    const commits = await getNewCommits(lastCommitHash);

    if (commits.length > 0) {
      for (let i = 0; i < commits.length; i++) {
        await axiosInstance.post('/build/request', commits[i]);
      }
      process.conf.lastCommitHash = commits[commits.length - 1].commitHash;
    }
  } catch (error) {
    console.error(error);
  }
};


const getAllCommits = async () => {
  if (!process.conf.repoName) {
    return {error: new Error('Надо пересохранить настройки')};
  }

  const path = repoPathBase + process.conf.repoName;
  let globalCommits = [];

  try {
    await Git.Repository.open(path).then(async function(repo) {
        let currentBranch = await (await repo.getCurrentBranch()).shorthand();
        var walker = Git.Revwalk.create(repo);
        walker.pushGlob('refs/heads/*');
        return walker.getCommitsUntil(c => true).then(function (commits) {
            var cmts = commits.map(x => ({
                commitHash:  x.sha(),
                commitMessage: x.message(),
                branchName: currentBranch,
                authorName: x.author().name()
            }));
            globalCommits = globalCommits.concat(cmts);
        });
    });
  
    return Promise.resolve(globalCommits);  
  } catch(error) {
    console.error(error.message);

    return {error: error, message: error.message}
  }
};


module.exports = {
  gitClone,
  getLastCommit,
  newCommitsObserver,
  getAllCommits
}