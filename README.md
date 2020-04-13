# Домашка по тестам

## Установка и запуск сервера и клиента

**Сервер:**

Перед запуском необходимо создать файл `.env` в папке `server` и записать там свой токен для авторизации в виде `TOKEN=...` (Bearer писать не нужно)
```
cd server
npm i
node server.js
```
**Клиент (в новом терминале):**
```
cd client
npm i
npm start
```

## Установка и запуск тестов

**Модульные**

Для написания модульных тестов был использован фреймворк [Jest](https://jestjs.io/).

```
cd tests
npm i
npm run test
```

_Чтобы заработали все тесты с git, необходимо предварительно склонировать репозиторий underscore в папку `tmp/jashkenas`:_
```
mkdir tmp
cd tmp
mkdir jashkenas
cd jashkenas
git clone https://github.com/jashkenas/underscore.git
```
Это необходимо проделать вручную, чтобы изолировать отдельные тестовые сценарии. Иначе они будут зависить от функции `gitClone` из `git-helper.js`.

**Интеграционные**

Для написания интеграционных тестов был использован фреймворк [Hermione](https://yandex.ru/dev/hermione/).

- Предварительно надо запустить сервер и клиент (инструкции выше)

- В папку `tests` скопировать `.env` из папки `server`

- Установить зависимости, если ещё не установлены
  ```
  cd tests
  npm i
  ```

- Запустить selenium в отдельной вкладке терминала

      `selenium-standalone start`

- Запуск тестов:

      `npm run hermione`

Можно также запустить тесты из gui:

    `npm run gui`

Однако в таком случае на странице с тестами почему-то не отображаются картинки (результаты assertView). Возможно эта проблема только на windows. Проблему можно решить, открыв отчёт html-report через live-server, там картинки нормально отображаются.

### Дополнительная информация по тестам приводится в readme в папке tests

Версия Node — v12.16.2