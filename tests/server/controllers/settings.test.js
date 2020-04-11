const axiosInstance = require('../../../server/controllers/axiosInstance');
const MockAdapter = require('axios-mock-adapter');
const { getSettings, postSettings } = require('../../../server/controllers/settings');

const axiosMock = new MockAdapter(axiosInstance);

const mockRequest = (body) => {body};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Сервер - получение настроек', () => {

  test('при GET запросе к ручке /api/settings, сервер должен делать запрос к БД и возвращать полученные данные со статусом 200', async () => {
    const confData = {
      "data": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "repoName": "test-repo",
        "buildCommand": "npm run build",
        "mainBranch": "feature",
        "period": 10
      }
    };
    axiosMock.onGet('https://hw.shri.yandex/api/conf').reply(200, confData);

    const res = mockResponse();
    await getSettings({}, res);

    expect(res.json).toHaveBeenCalledWith(confData);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // test('если БД возвращает ошибку, сервер отвечает со статусом 504', async () => {
  //   const surprise = new Error('trouble');
  //   axiosMock.onGet('https://hw.shri.yandex/api/conf').reply(500, surprise);

  //   const res = mockResponse();
  //   await getSettings({}, res);

  //   expect(res.status).toHaveBeenCalledWith(504);
  // });
  
});

describe('Сервер - сохранение новых настроек', () => {
  
});