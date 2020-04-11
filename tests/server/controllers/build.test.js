const axiosInstance = require('../../../server/controllers/axiosInstance');
const MockAdapter = require('axios-mock-adapter');
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

  test('при GET запросе к ручке /api/builds, сервер должен делать запрос к БД и вернуть список билдов со статусом 200', async () => {
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
  
  test('should ', async () => {
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

    const rec = mockRequest({},{},{buildId: buildId})
    const res = mockResponse();
    await getBuildId(rec, res);

    expect(res.json).toHaveBeenCalledWith(buildDetails);
    expect(res.status).toHaveBeenCalledWith(200);
  });

});