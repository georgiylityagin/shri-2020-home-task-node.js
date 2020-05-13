const axiosInstance = require('../../../../server/utils/axiosInstance');
const Git = require('../../../../server/git-helper/git-helper');
const MockAdapter = require('axios-mock-adapter');
const sinon = require('sinon');
const { getSettings, postSettings } = require('../../../../server/controllers/settings');

sinon.stub(Git, 'gitClone').callsFake(() => ({result: 'success'}));
sinon.stub(Git, 'getLastCommit').callsFake((repoName, mainBranch) => {
  return lastCommitFake;
});
sinon.stub(Git, 'newCommitsObserver').callsFake(() => {});

const axiosMock = new MockAdapter(axiosInstance);
process.conf = {};

const mockRequest = (body) => ({body});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Сервер - получение настроек', () => {

  test('при GET запросе к ручке /api/settings, сервер должен получить из БД объект с текущими настройками и вернуть его со статусом 200', async () => {
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
  
});

describe('Сервер - сохранение новых настроек', () => {
  
  test('при POST запросе к ручке /api/settings, сервер должен сохранить в БД переданные настройки и вернуть объект с полем result: "success" и статусом 200', async () => {
    reqBody = {
      repoName: 'undefined',
      buildCommand: 'npm run destroy',
      mainBranch: 'master',
      period: 10
    };

    lastCommitFake = {
      commitMessage: 'message',
      commitHash: 'sadfh235asdg',
      branchName: 'master',
      authorName: 'User'
    };

    axiosMock.onPost('https://hw.shri.yandex/api/conf', reqBody)
      .reply(200, {});

    axiosMock.onPost('/build/request', lastCommitFake)
      .reply(200, {});

    const rec = mockRequest(reqBody);
    const res = mockResponse();
    await postSettings(rec, res);

    expect(res.json).toHaveBeenCalledWith({result: 'success'});
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('после сохранения настроек в БД, сервер должен поставить последний коммит в очередь на сборку', async () => {
    reqBody = {
      repoName: 'undefined',
      buildCommand: 'npm run destroy',
      mainBranch: 'master',
      period: 10
    };

    lastCommitFake = {
      commitMessage: 'message',
      commitHash: 'sadfh235asdg',
      branchName: 'master',
      authorName: 'User'
    };

    axiosMock.resetHistory();

    axiosMock.onPost('/conf', reqBody)
      .reply(200, {});

    axiosMock.onPost('/build/request', lastCommitFake)
      .reply(200, {});

    const rec = mockRequest(reqBody);
    const res = mockResponse();
    await postSettings(rec, res);

    expect(axiosMock.history.post.length).toBe(2);
    expect(axiosMock.history.post[1].data).toBe(JSON.stringify(lastCommitFake));

  });

  test('если в настройках указан ненулевой период, должен запускаться setInterval ', async () => {
    reqBody = {
      repoName: 'undefined',
      buildCommand: 'npm run destroy',
      mainBranch: 'master',
      period: 10
    };

    lastCommitFake = {
      commitMessage: 'message',
      commitHash: 'sadfh235asdg',
      branchName: 'master',
      authorName: 'User'
    };

    axiosMock.onPost('/conf', reqBody)
      .reply(200, {});

    axiosMock.onPost('/build/request', lastCommitFake)
      .reply(200, {});

    const rec = mockRequest(reqBody);
    const res = mockResponse();
    await postSettings(rec, res);

    expect(process.newCommits).not.toBeUndefined();
  });

});