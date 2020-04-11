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

## Запуск тестов

```
cd tests
npm i
npm run test
```

### Дополнительная информация по тестам приводится в readme в папке tests

Версия Node — v12.16.2