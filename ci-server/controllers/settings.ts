import axiosInstance from '../utils/axiosInstance';
import axiosRetry from 'axios-retry';
import { Request, Response } from 'express';
import {
  getAllCommits,
  getLastCommit,
  commitInfo
} from '../handlers/github-api';


axiosRetry(axiosInstance, { retries: 4 });

// Получение сохраненных настроек
export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings: ResponseGetConfig = (await axiosInstance.get('/conf')).data.data;

    if (Object.keys(settings).length === 0) {
      res.status(200).json({
        result: 'success',
        data: false
      });
      return;
    }

    res.status(200).json({
      result: 'success',
      data: settings
    });
  } catch (error) {
    console.error(error);

    res.status(504).json({
      result: 'fail',
      message: error.message,
      reason: 'Не удалось получить сохраненный конфиг',
    });
    return;
  }
}

// Сохранение настроек
export const postSettings = async (req: Request, res: Response) => {

  const settings: PostConfig = req.body;

  // Сохраняем настройки
  try {
    await axiosInstance.post('/conf', settings);
  } catch(error) {
    console.error('Не удалось сохранить новые настройки');
  
    return res.status(500).json({
      result: 'fail',
      message: error.message,
      reason: 'Не удалось сохранить новые настройки'
    });
  }

  const lastCommit = await getLastCommit(settings.repoName);

  const postBuild: PostBuild = {...lastCommit, branchName: settings.mainBranch};

  try {
    await axiosInstance.post('/build/request', postBuild);
  } catch (error) {
    console.error(error.message);
  
    return res.status(500).json({
      result: 'fail',
      message: error.message,
      reason: 'Ошибка при добавлении последнего коммита в очередь'
    });
  }

  if (settings.period > 0) {

    let currentTime = (new Date()).toISOString();

    let intervalId;

    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(async () => {

      let newCommits: commitInfo[] = await getAllCommits(settings.repoName, currentTime);

      if (newCommits.length > 0) {
        newCommits = newCommits.reverse();

        for (let commit of newCommits) {
          const postBuild: PostBuild = {...commit, branchName: settings.mainBranch};
          await axiosInstance.post('/build/request', postBuild);
        }
      }

      currentTime = (new Date()).toISOString();

    }, settings.period * 60000);
  }

  res.status(200).json({
    result: 'success'
  });
}