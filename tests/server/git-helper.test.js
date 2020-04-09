const fse = require('fs-extra');
const { gitClone, getLastCommit, getNewCommits, getAllCommits } = require('../../server/git-helper/git-helper');

describe('Работа с локальным репозиторием', () => {

  describe('Клонирование удаленного репозитория', () => {
    
    test('Проверка возможности склонировать удаленный репозиторий', async () => {
      // Подготовка
      await fse.remove('./tmp/georgiylityagin');
      const repoName = 'georgiylityagin/github-finder';
      const mainBranch = 'master';
  
      // Действие
      const cloned = await gitClone(repoName, mainBranch);
  
      // Проверка
      expect(cloned.message).toBe('Репозиторий успешно клонирован');
    });
    
    test('Если репозиторий уже склонирован, должен выполняться git pull', async () => {
      // Подготовка
      const repoName = 'jashkenas/underscore';
      const mainBranch = 'master';
  
      // Действие
      const cloned = await gitClone(repoName, mainBranch);
  
      // Проверка
      expect(cloned.message).toBe('Локальный репозиторий уже сущестует, выполнен git pull');
    });

  });

  
  describe('Работа с коммитами', () => {
    

    
  });

});

