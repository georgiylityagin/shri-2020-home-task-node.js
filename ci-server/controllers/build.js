const Git = require('../git-helper/git-helper');
const axiosInstance = require('../utils/axiosInstance');
const nodeCach = require('node-cache');

const logCach = new nodeCach({
  stdTTL: 30, // 30 секунд
  checkperiod: 60 * 60,
  maxKeys: 1000
});


// Получение списка сборок
exports.getBuilds = async (req, res) => {

  const { query } = req;
  const offset = query.offset || 0;
  const limit = query.limit || 25;

  let buildList;

  try {
    buildList = await axiosInstance.get(`/build/list?offset=${offset}&limit=${limit}`);
  } catch (error) {
    try {
      buildList = await axiosInstance.get(`/build/list?offset=${offset}&limit=${limit}`);
    } catch(error) {
      console.error(error.message);
      
      return res.status(504).json({
        error: 'error',
        message: 'Не удалось получить список сборок',
      });
    }
  }

  res.status(200).json({
    data: buildList.data.data
  });
}

// Добавление сборки в очередь
exports.postCommitHash = async (req, res) => {

  const lookingHash = req.params.commitHash;

  const allCommits = await Git.getAllCommits();
  
  if (allCommits.error) {
    return res.status(404).json({
      error: allCommits.error,
      message: 'Ошибка! Попробуйте пересохранить настройки'
    })
  }

  let searchedCommit = allCommits.find(({ commitHash }) => commitHash === lookingHash);

  if (!searchedCommit) {
    return res.status(404).json({
      error: new Error('Не найден коммит с таким хэшем'),
      message: 'Не найден коммит с таким хэшем'
    })
  } else {
    let response;
    try {
      response = await axiosInstance.post('/build/request', {
        commitHash: req.params.commitHash,
        commitMessage: searchedCommit.commitMessage,
        branchName: searchedCommit.branchName,
        authorName: searchedCommit.authorName
      });
    } catch (error) {
      try {
        response = await axiosInstance.post('/build/request', {
          commitHash: req.params.commitHash,
          commitMessage: searchedCommit.commitMessage,
          branchName: searchedCommit.branchName,
          authorName: searchedCommit.authorName
        });
      } catch(error) {
        console.log(error.message);
    
        return res.status(504).json({
          error: 'error',
          message: 'Не удалось добавить данный коммит в очередь на сборку',
        });
      }
    }
    res.status(200).json({
      data: response.data.data
    });
  }
}


// Получение информации о конкретной сборке
exports.getBuildId = async (req, res) => {
  let buildDetails;

  try {
    buildDetails = await axiosInstance.get(`/build/details?buildId=${req.params.buildId}`);
  } catch (error) {
    try {
      buildDetails = await axiosInstance.get(`/build/details?buildId=${req.params.buildId}`);
    } catch(error) {
      console.error(error.message);
  
      return res.status(404).json({
        error: 'error',
        message: 'Не удалось получить информацию о данной сборке',
      })
    }
  }

  res.status(200).json({
    data: buildDetails.data.data
  });
}

// Получение логов билда
exports.getLogs = async (req, res) => {

  try {
    let log;

    if (logCach.has(req.params.buildId)) {
      log = {};
      log.data = logCach.get(req.params.buildId);

      // console.info('Получили данные из кеша');
    } else {
      log = await axiosInstance.get(`/build/log?buildId=${req.params.buildId}`);
      try {
        logCach.set(req.params.buildId, log.data);
        // console.info('Записали данные в кеш');
      } catch (error) {
        if (error.errorcode === 'ECACHEFULL') {
          // console.info('Кэш переполнен');
          logCach.flushAll();
          // console.info('Очистили кэш');
          logCach.set(req.params.buildId, log.data);
          // console.info('Записали данные в кеш');
        } else {
          console.error('Unknown error:', error);
        }
      }
    }

    res.status(200).json({
      data: log.data
    })
  } catch (error) {
    console.error(error.message);

    res.status(404).json({
      error: 'error',
      message: 'Не удалось получить лог',
    })
  }
}