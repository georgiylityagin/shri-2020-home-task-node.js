import { Request, Response } from 'express';
import axiosInstance from '../utils/axiosInstance';
import axiosRetry from 'axios-retry';
import nodeCach from 'node-cache';
import {
  getAllCommits,
  commitInfo
} from '../handlers/github-api';

axiosRetry(axiosInstance, {
  retries: 4,
  retryDelay: (retryCount) => {
    return 100 + (retryCount * 100);
  }
});

const logCach = new nodeCach({
  stdTTL: 5, // 5 секунд
  checkperiod: 60 * 60,
  maxKeys: 1000
});

type GetBuildsQueryParam = {
  offset: string,
  limit: string
};

// Получение списка сборок
export const getBuilds = async (req: Request<{},{},{},GetBuildsQueryParam>, res: Response) => {

  const { query } = req;
  const offset = query.offset || '0';
  const limit = query.limit || '25';

  try {
    let buildList: BuildDetails[] = (await axiosInstance.get(`/build/list?offset=${offset}&limit=${limit}`)).data.data;

    res.status(200).json({
      result: 'success',
      data: buildList
    });
  } catch (error) {
    console.error(error.message);

    res.status(504).json({
      result: 'fail',
      message: error.message,
      reason: 'Не удалось получить список сборок'
    });

    return;
  }
}

// Добавление сборки в очередь
export const postCommitHash = async (req: Request, res: Response) => {

  const lookingHash: string = req.params.commitHash;

  try {
    const settings: ResponseGetConfig = (await axiosInstance.get('/conf')).data.data;
    const allCommits = await getAllCommits(settings.repoName);

    const searchedCommit: commitInfo | undefined = allCommits.find(
      ({ commitHash }) => commitHash === lookingHash
    );

    if (searchedCommit) {
      let response: ResponsePostBuild = (await axiosInstance.post('/build/request', {
        commitHash: req.params.commitHash,
        commitMessage: searchedCommit.commitMessage,
        branchName: settings.mainBranch,
        authorName: searchedCommit.authorName
      })).data.data;

      res.status(200).json({
        result: 'success',
        data: response
      });
    } else {
      res.status(404).json({
        result: 'fail',
        message: 'Не найден коммит с таким хэшем'
      });
      return;
    }
  } catch (err) {
    console.error(err.message);

    res.status(504).json({
      result: 'fail',
      message: err.message,
      reason: 'Не удалось добавить данный коммит в очередь на сборку',
    });
    return;
  }
}


// Получение информации о конкретной сборке
export const getBuildId = async (req: Request, res: Response) => {
  try {
    let buildDetails: BuildDetails = (await axiosInstance.get(`/build/details?buildId=${req.params.buildId}`)).data.data;

    res.status(200).json({
      result: 'success',
      data: buildDetails
    });
  } catch (error) {
    console.error(error.message);
  
    return res.status(404).json({
      result: 'fail',
      message: error.message,
      reason: 'Не удалось получить информацию о данной сборке',
    })
  }
}

// Получение логов билда
export const getLogs = async (req: Request, res: Response) => {

  try {
    let log: any;

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
      result: 'success',
      data: log.data
    })
  } catch (error) {
    console.error(error.message);

    res.status(404).json({
      result: 'fail',
      message: error.message,
      reason: 'Не удалось получить лог',
    })
  }
}