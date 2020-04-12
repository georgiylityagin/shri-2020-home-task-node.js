require('dotenv').config();
const assert = require('assert');
const axiosInstance = require('../../server/utils/axiosInstance');

const testedConf = {
  repoName: 'jashkenas/underscore',
  buildCommand: 'npm run build',
  mainBranch: 'master',
  period: '15',
  commitHash: '985fce601cd38d0a793dff4eff19531b9d6bfe33'
}


describe('Проверка работы стартовой страницы', function() {
  beforeEach(async () => {
    await axiosInstance.delete('/conf');
  })

  it('Если настройки не заданы, по корневому адресу должна открываться Start Page', function() {
    return this.browser
      .url('/')
      .pause(1000)
      .waitForExist('#startPage')
      .then((exists) => {
        assert.ok(exists, 'Стартовая страница не открылась');
      })
  })

  it('Можно перейти со стартовой страницы к настройкам по кнопке "Open settings"', function() {
    return this.browser
      .url('/')
      .waitForExist('#startPage')
      .pause(500)
      .click('#toSettings1')
      .pause(500)
      .isExisting('#settingsPage')
      .then((exists) => {
        assert.ok(exists, 'Не удалось перейти по ссылке к настройкам');
      })
  });

  it('Можно перейти со стартовой страницы к настройкам по кнопке "settings" в header', function() {
    return this.browser
    .url('/')
    .waitForExist('#startPage')
    .pause(500)
    .click('#toSettings2')
    .pause(500)
    .isExisting('#settingsPage')
    .then((exists) => {
      assert.ok(exists, 'Не удалось перейти по ссылке к настройкам');
    })
  });

});

describe('Проверка работы страницы history', function() {

  it('После сохранения настроек выполняется переход на страницу history', function() {
    return this.browser
      .url('settings')
      .waitForExist('#settingsPage')
      .click('#repository')
      .keys(['jashkenas/underscore'])
      .click('#build')
      .keys(['npm run build'])
      .click('#branch')
      .keys(['master'])
      .click('#period')
      .keys(['0'])
      .click('#save')
      .pause(500)
      .waitForExist('#historyPage')
      .pause(500)
      .isExisting('#historyPage')
      .then((exists) => {
        assert.ok(exists, 'Не произошло перехода на страницу history');
      })
  })

  it('Если настройки заданы, по корневому адресу должна открываться History Page', function() {
    return this.browser
      .url('/')
      .pause(1000)
      .waitForExist('#historyPage')
      .then((exists) => {
        assert.ok(exists, 'History Page не открылась');
      })
  })

  it('Можно перейти со страницы history к настройкам по кнопке "settings" в header', function() {
    return this.browser
      .url('/')
      .pause(1000)
      .waitForExist('#historyPage')
      .click('#toSettings')
      .isExisting('#settingsPage')
      .then((exists) => {
        assert.ok(exists, 'Не удалось перейти по ссылке к настройкам');
      })
  })

  it('На странице history в качестве заголовка отображается название репозитория', function() {
    return this.browser
      .url('/')
      .pause(1000)
      .waitForExist('#historyPage')
      .getText('#reponame')
      .then((title) => {
        assert.equal(title, testedConf.repoName, 'Неправильный заголовок')
      })
  })

  it('При нажатии на кнопку Run build появляется всплывающее окно с инпутом', function() {
    return this.browser
      .url('/')
      .pause(1000)
      .waitForExist('#historyPage')
      .click('#runBuild')
      .pause(500)
      .isExisting('#popUp')
      .then((exists) => {
        assert.ok(exists, 'Не открылось всплывающее окно');
      })
  })

  it('После отправки коммита на сборку через форму во всплывающем окне откроется страница с деталями билда', function() {
    return this.browser
      .url('/')
      .pause(1000)
      .waitForExist('#historyPage')
      .click('#runBuild')
      .pause(200)
      .click('#commitHash')
      .keys([testedConf.commitHash])
      .click('#save')
      .pause(500)
      .isExisting('#detailsPage')
      .then((exists) => {
        assert.ok(exists, 'Не произошёл переход на страницу нового билда');
      })
  })

  it('По клику на карточку билда происходит переход на страницу с деталями билда', function() {
    return this.browser
      .url('/')
      .pause(1000)
      .waitForExist('#historyPage')
      .click('#buildList:first-child')
      .pause(500)
      .isExisting('#detailsPage')
      .then((exists) => {
        assert.ok(exists, 'Не произошёл переход на страницу билда');
      })
  })

})


describe('Проверка работы страницы details', function() {

  it('По клику на кнопку rebuid, коммит снова ставится в очередь на сборку', function() {
    return this.browser
      .url('/')
      .waitForExist('#historyPage')
      .click('#buildList:first-child')
      .waitForExist('#detailsPage')
      .click('#rebuild')
      .wait(1000)
      .isExisting('#detailsPage')
      .then((exists) => {
        assert.ok(exists, 'Ошибка с постановкой на сборку');
      })
  })

  it('Можно перейти со страницы details к настройкам по кнопке "settings" в header', function() {
    return this.browser
      .url('/')
      .waitForExist('#historyPage')
      .click('#buildList:first-child')
      .waitForExist('#detailsPage')
      .click('#toSettings')
      .wait(500)
      .isExisting('#settingsPage')
      .then((exists) => {
        assert.ok(exists, 'Не удалось перейти по ссылке к настройкам');
      })
  })

  it('Можно перейти со страницы details на страницу history по клику на название репозитория', function() {
    return this.browser
      .url('/')
      .waitForExist('#historyPage')
      .click('#buildList:first-child')
      .waitForExist('#detailsPage')
      .click('#reponame')
      .wait(500)
      .isExisting('#historyPage')
      .then((exists) => {
        assert.ok(exists, 'Не удалось перейти по ссылке на страницу history');
      })
  })

})


// describe('Проверка работы страницы settings', function() {

//   it('Eсли не заполнено поле repo-name, кнопка Save в состоянии disabled', function () {
//     return this.browser
//       .url('settings')
//       .waitForExist('#settingsPage')
//       .click('#build')
//       .keys(['npm run build'])
//       .click('#branch')
//       .keys(['master'])
//       .click('#period')
//       .keys(['10'])
//       .pause(500)
//       .isExisting('#save[disabled]')
//       .then((exists) => {
//         assert.ok(exists, 'Кнопка должна быть в состоянии disabled');
//       })
//   })

//   it('Eсли не заполнено поле build command, кнопка Save в состоянии disable', function () {
//     return this.browser
//       .url('settings')
//       .waitForExist('#settingsPage')
//       .click('#repository')
//       .keys(['jashkenas/underscore'])
//       .click('#branch')
//       .keys(['master'])
//       .click('#period')
//       .keys(['10'])
//       .pause(500)
//       .isExisting('#save[disabled]')
//       .then((exists) => {
//         assert.ok(exists, 'Кнопка должна быть в состоянии disabled');
//       })
//   })

//   it('Eсли период не является числом, кнопка Save в состоянии disable', function () {
//     return this.browser
//       .url('settings')
//       .waitForExist('#settingsPage')
//       .click('#repository')
//       .keys(['jashkenas/underscore'])
//       .click('#build')
//       .keys(['npm run build'])
//       .click('#branch')
//       .keys(['master'])
//       .click('#period')
//       .keys(['text'])
//       .click('body')
//       .pause(500)
//       .isExisting('#save[disabled]')
//       .then((exists) => {
//         assert.ok(exists, 'Кнопка должна быть в состоянии disabled');
//       })
//   })
// })