const axios = require("axios");
const fse = require("fs-extra");
const { Agent } = require("https");
const Git = require("nodegit");

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


// Получение сохраненных настроек
exports.getSetting = (req, res) => {

  axiosInstance.get('/conf').then(result => {
    res.status(200).json({
      status: result.status,
      statusText: result.statusText,
      data: result.data
    });
  })
}

// Сохранение настроек
exports.postSetting = (req, res) => {

  axiosInstance.delete('/conf')
    .then(() => {
      if (req.body.repoName && req.body.buildCommand
        && req.body.mainBranch && req.body.period
        && Object.keys(req.body).length === 4) {
        return axiosInstance.post('/conf', req.body);
      } else {
        return res.status(400).json({
          status: 400,
          data: "Error",
          error: 'Wrong request body'
        });
      }
    })
    .then(setConf => {
      // Удаление старого репозитория
      fse.remove('./tmp').then(function () {
        // Клонирование нового репозитория
        Git.Clone(req.body.repoName, "./tmp");
      });

      return res.json({
        status: setConf.status,
        statusText: setConf.statusText,
        data: "Success"
      });
    })
    .catch(err => {
      console.error(err);

      return res.status(500).json({
        status: 500,
        data: "Error",
        err
      });
    })
}