const axios = require('axios');
const { Agent } = require('https');
const Git = require('../git-helper/git-helper');
const nodeCach = require('node-cache');

const logCach = new nodeCach({
  stdTTL: 60 * 5, // 5 минут
  checkperiod: 60 * 60,
  maxKeys: 1000
});

const axiosInstance = axios.create({
  baseURL: 'https://hw.shri.yandex/api',
  timeout: 10000,
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

  try {
    const settings = await axiosInstance.get('/conf');

    res.status(200).json({
      data: settings.data.data
    });
  } catch (error) {
    console.error(error);
    res.status(504).json({
      error: error,
      message: error.message,
      stack: error.stack
    })
  }

}

// Сохранение настроек
exports.postSettings = async (req, res) => {

  process.conf.repoName = req.body.repoName;
  process.conf.buildCommand = req.body.buildCommand;
  process.conf.mainBranch = req.body.mainBranch;
  process.conf.period = req.body.period;

  try {
    // Удаляем предыдущие настройки
    await axiosInstance.delete('/conf');
  } catch(error) {
    console.error('Не удалось удалить предыдущие настройки');

    res.status(500).json({
      error: error,
      message: 'Не удалось удалить предыдущие настройки',
      stack: error.stack
    });
  }

  try {
    // Сохраняем настройки
    await axiosInstance.post('/conf', {
      repoName: req.body.repoName,
      buildCommand: req.body.buildCommand,
      mainBranch: req.body.mainBranch,
      period: req.body.period
    });
  } catch(error) {
    console.error('Не удалось сохранить новые настройки');

    res.status(500).json({
      error: error,
      message: 'Не удалось сохранить новые настройки',
      stack: error.stack
    });
  }

  // Клонируем репозиторий
  try {
    await Git.gitClone();
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: error,
      message: 'Ошибка при клонировании репозитория',
      stack: error.stack
    });
  }

  try {
    // Получаем последний коммит
    const lastCommit = await Git.getLastCommit();
    process.conf.lastCommitHash = lastCommit.commitHash;

    // Добавляем последний коммит в очередь
    await axiosInstance.post('/build/request', lastCommit);

    // Если указан период, ставим setInterval
    if (process.conf.period > 0) {
      clearInterval(process.newCommits);
      process.newCommits = setInterval(Git.newCommitsObserver, process.conf.period * 60000);
    }

    res.status(200).json({
      result: 'success'
    });
  } catch (error) {
    console.log('Ошибка при клонировании репозитория');

    res.status(500).json({
      error: error,
      message: error.message,
      stack: error.stack
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

    res.status(200).json({
      data: buildList.data.data
    });
  } catch (error) {
    console.error(error);
    res.status(504).json({
      error: error,
      message: error.message,
      stack: error.stack
    })
  }
}

// Добавление сборки в очередь
exports.postCommitHash = async (req, res) => {

  const lookingHash = req.params.commitHash;

  const allCommits = await Git.getAllCommits();

  let searchedCommit = allCommits.find(({ commitHash }) => commitHash === lookingHash);

  if (!searchedCommit) {
    return res.status(404).json({
      error: 'Error',
      message: 'There is no commit with such hash'
    })
  } else {
    try {
      const response = await axiosInstance.post('/build/request', {
        commitHash: req.params.commitHash,
        commitMessage: searchedCommit.commitMessage,
        branchName: searchedCommit.branchName,
        authorName: searchedCommit.authorName
      });
  
      res.status(200).json({
        data: response.data.data
      });
    } catch (error) {
      console.log(error);
  
      res.status(504).json({
        error: error,
        message: error.message,
        stack: error.stack
      });
    }
  }
  }


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
      error: error,
      message: error.message,
      stack: error.stack
    })
  }
}

// Получение логов билда
exports.getLogs = async (req, res) => {

  try {
    let log;

    if (logCach.has(req.params.buildId)) {
      log = {};
      log.data = logCach.get(req.params.buildId);

      console.info('Получили данные из кеша');
    } else {
      log = await axiosInstance.get(`/build/log?buildId=${req.params.buildId}`);
      try {
        logCach.set(req.params.buildId, log.data);
        console.info('Записали данные в кеш');
      } catch (error) {
        if (error.errorcode === 'ECACHEFULL') {
          console.info('Кэш переполнен');
          logCach.flushAll();
          console.info('Очистили кэш');
          logCach.set(req.params.buildId, log.data);
          console.info('Записали данные в кеш');
        } else {
          console.error('Unknown error:', error);
        }
      }
    }

    res.status(200).json({
      data: log.data
    })
  } catch (error) {
    console.error(error);

    res.status(404).json({
      error: error,
      message: error.message,
      stack: error.stack
    })
  }
}
