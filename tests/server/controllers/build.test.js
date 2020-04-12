const axiosInstance = require('../../../server/utils/axiosInstance');
const Git = require('../../../server/git-helper/git-helper');
const MockAdapter = require('axios-mock-adapter');
const sinon = require('sinon');
const { getBuilds, postCommitHash, getBuildId, getLogs } = require('../../../server/controllers/build');

const axiosMock = new MockAdapter(axiosInstance);

const mockRequest = (body, query, params) => ({
  body,
  query,
  params
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Сервер - получение списка сборок', () => {

  test('при GET запросе к ручке /api/builds, сервер должен получить из БД объект с массивом билдов и вернуть его со статусом 200', async () => {
    const buildList = {
      "data": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "configurationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "buildNumber": 1,
          "commitMessage": "initial commit",
          "commitHash": "sdh23529871jkjsdasdf",
          "branchName": "feature",
          "authorName": "User",
          "status": "Waiting",
          "start": "2020-04-11T17:53:41.372Z",
          "duration": 30
        }
      ]
    };

    const params = {
      offset: 0,
      limit: 10
    };
    axiosMock.onGet(`https://hw.shri.yandex/api/build/list?offset=${params.offset}&limit=${params.limit}`)
      .reply(200, buildList);

    const rec = mockRequest({}, params);
    const res = mockResponse();
    await getBuilds(rec, res);

    expect(res.json).toHaveBeenCalledWith(buildList);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  
});

describe('Сервер - получение информации о конкретной сборке', () => {
  
  test('при GET запросе к ручке /api/builds/:buildId, сервер должен получить из БД объект с деталями билда и вернуть его со статусом 200', async () => {
    const buildDetails = {
      "data": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "configurationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "buildNumber": 1,
        "commitMessage": "initial commit",
        "commitHash": "sdh23529871jkjsdasdf",
        "branchName": "feature",
        "authorName": "User",
        "status": "Waiting",
        "start": "2020-04-11T18:13:48.176Z",
        "duration": 30
      }
    }
    
    const buildId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

    axiosMock.onGet(`https://hw.shri.yandex/api/build/details?buildId=${buildId}`)
      .reply(200, buildDetails);

    const rec = mockRequest({},{},{buildId: buildId});
    const res = mockResponse();
    await getBuildId(rec, res);

    expect(res.json).toHaveBeenCalledWith(buildDetails);
    expect(res.status).toHaveBeenCalledWith(200);
  });

});

describe('Сервер - получение логов сборки', () => {
  
  test('при GET запросе к ручке /api/builds/:buildId/logs, сервер должен получить из БД строку с логами и вернуть её со статусом 200', async () => {
    const log = 'log log log';
    const buildId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

    axiosMock.onGet(`https://hw.shri.yandex/api/build/log?buildId=${buildId}`)
      .reply(200, log);

    const rec = mockRequest({},{},{buildId: buildId});
    const res = mockResponse();
    await getLogs(rec, res);

    expect(res.json).toHaveBeenCalledWith({data: log});
    expect(res.status).toHaveBeenCalledWith(200);
  });

});

describe('Сервер - добавление в очередь на сборку', () => {
  
  test('при POST запросе к ручке /api/builds/:commitHash, сервер должен сохранить в БД детали коммита, добавляемого в очередь', async () => {
    const commitHash = 'sdh23529871jkjsdasdf';

    const allCommitsStub = [
      {
        "commitMessage": "looking commit",
        "commitHash": "sdh23529871jkjsdasdf",
        "branchName": "feature",
        "authorName": "User"
      },
      {
        "commitMessage": "another commit",
        "commitHash": "asdfh4234asdf",
        "branchName": "master",
        "authorName": "Guest"
      }
    ];

    sinon.stub(Git, 'getAllCommits').callsFake(() => allCommitsStub);

    const apiFakeResponse = {
      "data": {
        "id": "4de780e4-e1ab-4dd1-8d7d-979973509ce1",
        "buildNumber": 2,
        "status": "Waiting"
      }
    }

    axiosMock.onPost(`/build/request`, allCommitsStub[0])
      .reply(200, apiFakeResponse);


    const rec = mockRequest({},{},{commitHash: commitHash});
    const res = mockResponse();
    await postCommitHash(rec, res);

    expect(res.json).toHaveBeenCalledWith(apiFakeResponse);
    expect(res.status).toHaveBeenCalledWith(200);
  });

});