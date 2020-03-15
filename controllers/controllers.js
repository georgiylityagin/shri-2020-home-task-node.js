const axios = require('axios');
const { Agent } = require('https');
const Git = require('../git-helper/git-helper');

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

process.conf = {};

// Settings
// Получение сохраненных настроек
exports.getSettings = async (req, res) => {

  const settings = await axiosInstance.get('/conf');

  res.status(200).json({
    data: settings.data.data
  });
}

// Сохранение настроек
exports.postSettings = async (req, res) => {

  // Сохраняем переменные
  process.conf.repoName = req.body.repoName;
  process.conf.buildCommand = req.body.buildCommand;
  process.conf.mainBranch = req.body.mainBranch;
  process.conf.period = req.body.period;

  try {
    // Удаляем предыдущие настройки
    await axiosInstance.delete('/conf');

    // Клонируем репозиторий
    const cloned = await Git.gitClone();

    if (!cloned) {
      return res.status(400).json({
        status: 'Error',
        message: 'Repository not found'
      });
    }

    // Сохраняем настройки
    await axiosInstance.post('/conf', {
      repoName: req.body.repoName,
      buildCommand: req.body.buildCommand,
      mainBranch: req.body.mainBranch,
      period: req.body.period
    });

    // Получаем последний коммит
    const lastCommit = await Git.getLastCommit();
    process.conf.lastCommit = lastCommit.commitHash;

    // Добавляем последний коммит в очередь
    await axiosInstance.post('/build/request', lastCommit);

    // Если указан период, ставим setInterval
    if (process.conf.period > 0) {
      clearInterval(process.gitEvent);
      process.gitEvent = setInterval(Git.gitEvent, process.conf.period * 60000);
    }

    res.status(200).json({
      status: 200,
      message: 'Success'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error',
      error
    });
  }

}


// Build
// Получение списка сборок
exports.getBuilds = async (req, res) => {

  const { query } = req;
  const offset = query.offset || 0;
  const limit = query.limit || 25;

  let buildList;

  try {
    buildList = await axiosInstance.get(`/build/list?offset=${offset}&limit=${limit}`);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error',
      error
    })
  }

  res.status(200).json({
    data: buildList.data.data
  });
}

// Добавление сборки в очередь
exports.postCommitHash = async (req, res) => {
  try {
    await axiosInstance.post('/build/request', {
      commitMessage: req.body.commitMessage,
      commitHash: req.params.commitHash,
      branchName: req.body.branchName,
      authorName: req.body.authorName
    });

    return res.status(200).json({
      data: 'Success'
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Error',
      error
    });
  }
};

// Получение информации о конкретной сборке
exports.getBuildId = async (req, res) => {

  try {
    const buildDetails = await axiosInstance.get(`/build/details?buildId=${req.params.buildId}`);

    res.status(200).json({
      data: buildDetails.data.data
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      message: 'Not Found',
      error
    })
  }
}

// Получение логов билда
exports.getLogs = async (req, res) => {

  try {
    const log = await axiosInstance.get(`/build/log?buildId=${req.params.buildId}`);

    res.status(200).json({
      data: log.data
    })
  } catch (error) {
    console.error(error);

    res.status(404).json({
      message: 'Not Found',
      error
    })
  }
}
