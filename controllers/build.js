const axios = require('axios');
const { Agent } = require('https');
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


// Получение списка сборок
exports.getBuilds = (req, res) => {

  const { query } = req;
  const offset = query.offset || 0;
  const limit = query.limit || 25;

  axiosInstance.get(`/build/list?offset=${offset}&limit=${limit}`)
    .then(buildList => {
      res.status(200).json({
        data: buildList.data.data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error"
      })
    })
}

// Добавление сборки в очередь
exports.postCommitHash = (req, res) => {

  axiosInstance.post("/build/request", {
    commitMessage: req.body.commitMessage,
    commitHash: req.params.commitHash,
    branchName: req.body.branchName,
    authorName: req.body.authorName
  })
    .then(() => {
      return res.status(200).json({
        data: "Success"
      });
    })
    .catch(err => {
      console.log(error);

      return res.status(500).json({
        data: "Error",
        error
      });
    })
}

// Получение информации о конкретной сборке
exports.getBuildId = (req, res) => {

  axiosInstance.get(`/build/details?buildId=${req.params.buildId}`)
    .then(buildDetails => {
      res.status(200).json({
        data: buildDetails.data.data
      });
    })
    .catch(err => {
      res.status(404).json({
        data: "Not Found"
      })
    })
}

// Получение логов билда
exports.getLogs = (req, res) => {

  axiosInstance.get(`/build/log?buildId=${req.params.buildId}`)
    .then(log => {
      res.status(200).json({
        data: log.data
      })
    })
    .catch(err => {
      res.status(404).json({
        data: "Not Found"
      })
    })
}