const fse = require('fs-extra');
const nodegit = require('nodegit');
const { gitClone, getLastCommit, getNewCommits, getAllCommits } = require('../../server/git-helper/git-helper');

describe('Работа с git', () => {

  describe('Клонирование удаленного репозитория', () => {
    
    test('При попытке склонировать существующий публичный репозиторий должны получить сообщение об успешном результате', async () => {
      // Подготовка
      await fse.remove('./tmp/georgiylityagin');
      const repoName = 'georgiylityagin/github-finder';
  
      // Действие
      const cloned = await gitClone(repoName);
  
      // Проверка
      expect(cloned.message).toBe('Репозиторий успешно клонирован');
    });

    test('При попытке склонировать существующий публичный репозиторий должна появиться папка с ним ', async () => {
      // Подготовка
      const repoName = 'georgiylityagin/github-finder';
      const path = './tmp/georgiylityagin/github-finder';
      await fse.remove(path);
  
      // Действие
      await gitClone(repoName);
  
      // Проверка
      const pathExist = fse.pathExists(path);
      expect(pathExist).toBeTruthy();
    });

    test('Склонированный репозиторий можно открыть при помощи nodegit', async () => {
      // Подготовка
      const repoName = 'georgiylityagin/github-finder';
      const path = './tmp/georgiylityagin/github-finder';
      await fse.remove(path);
  
      // Действие
      await gitClone(repoName);
      let openedRepo;
      try {
        openedRepo = await nodegit.Repository.open(path);
      } finally {
        // Проверка
        expect(openedRepo).toBeTruthy();
      }
    });
    
    test('Если репозиторий уже склонирован, должен выполняться git pull', async () => {
      // Подготовка
      const repoName = 'jashkenas/underscore';
  
      // Действие
      const cloned = await gitClone(repoName);
  
      // Проверка
      expect(cloned.message).toBe('Локальный репозиторий уже сущестует, выполнен git pull');
    });

    test('Eсли пытаемся склонировать несуществующий репозиторий, должны получить соответствующее сообщение об ошибке', async () => {
      // Подготовка
      const repoName = 'georgiylityagin/undefined-repo';
  
      // Действие
      const cloned = await gitClone(repoName);
  
      // Проверка
      expect(cloned.message).toBe('Репозитория с таким названием не существует или он приватный');
    });

  });

  
  describe('Информация о коммитах локального репозитория', () => {

    test('При запросе информации о последнем коммите, должнен возвращаться промис c необходимой информацией ', async () => {
      // Подготовка
      await fse.remove('./tmp/georgiylityagin');
      const repoName = 'georgiylityagin/github-finder';
      const mainBranch = 'master';
  
      // Действие
      await gitClone(repoName);
      const lastCommitInfo = await getLastCommit(repoName, mainBranch);
  
      // Проверка
      expect(lastCommitInfo).toHaveProperty('commitMessage');
      expect(lastCommitInfo).toHaveProperty('commitHash');
      expect(lastCommitInfo).toHaveProperty('branchName');
      expect(lastCommitInfo).toHaveProperty('authorName');
    });

    test('При запросе информации обо всех коммитах, должен возвращаться массив промисов', async () => {
      // Подготовка
      const repoName = 'jashkenas/underscore';
  
      // Действие
      const allCommits = await getAllCommits(repoName);
  
      // Проверка
      expect(Array.isArray(allCommits)).toBe(true);
    });

  });


  describe('Получение изменений из удаленного репозитория', () => {
    
    test('При запросе информации о наличии новых коммитов, должен возвращаться промис с массивом новых коммитов', async () => {
      // Подготовка
      const repoName = 'jashkenas/underscore';
      const lastCommitHash = '34d8074ea3ad1d45802e738fadc2f4e5c1c341d0';

      // Действие
      const newCommits = await getNewCommits(repoName, 'master', lastCommitHash);
  
      // Проверка
      expect(Array.isArray(newCommits)).toBe(true);
    });

  });

});

