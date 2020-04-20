// const rax = require('retry-axios');
const axiosRetry = require('axios-retry');
const axiosInstance = require('../utils/axios-instance');

axiosRetry(axiosInstance, {
  retries: 5,
  retryDelay: () => 500
});


exports.getBuildList = () => {
  const offset = 0;
  const limit = 1e4;

  return axiosInstance.get('/build/list', { params: { offset, limit } })
    .catch(err => {
      console.error('Ошибка БД')
      console.error('Не удалось получить список сборок: ', err.message);
  });
};

exports.getConf = () => (
  axiosInstance.get('/conf')
    .catch(err => {
      console.error('Ошибка БД');
      console.error('Не удалось получить текущую конфигурацию: ', err.message);
    })
);

exports.startBuild = ({ buildId, dateTime }) => (
  axiosInstance.post('/build/start', { buildId, dateTime })
    .catch(err => {
      console.error('Ошибка БД');
      console.error('Не удалось записать информацию о начале сборки: ', err.message);
    })
);

exports.finishBuild = ({ buildId, duration, success, buildLog }) => (
  axiosInstance.post('/build/finish', { buildId, duration, success, buildLog })
    .catch(err => {
      console.error('Ошибка БД');
      console.error('Не удалось записать информацию об окончании сборки: ', err.message);
    })
);

exports.cancelBuild = ({ buildId }) => (
  axiosInstance.post('/build/cancel', { buildId })
    .catch(err => {
      console.error('Ошибка БД');
      console.error('Не удалось записать информацию об отмене сборки: ', err.message);
    })
);
