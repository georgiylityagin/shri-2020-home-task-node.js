# Домашка по инфраструктуре

Версия Node — 12.16.2

## Установка и запуск билд-сервера

**Предварительно необходимо записать свой apiToken в _./build-server/server-conf.json_**
```
cd build-server && npm i && npm start
```

## Установка и запуск билд-агента

```
cd build-agent && npm i && npm start
```

Запускать очередной билд-агент можно так-же, через `npm start`. Сервер автоматически подберёт свободный порт.

## Установка и запуск CI-сервера и клиента

**Сервер:**

Перед запуском необходимо создать файл `.env` в папке `ci-server` и записать там свой токен для авторизации в виде `TOKEN=...` (Bearer писать не нужно)
```
cd ci-server && npm i && npm start
```
**Клиент:**
```
cd client && npm i && npm start
```

## Требования из задания

- [x] Сервер должен максимально утилизировать имеющихся агентов.
  
  Сервер периодически проверяет наличие билдов в очереди на сборку и наличие свободных билд-агентов. Если есть и билды, и свободные агенты, то сервер выполняет обход доступных агентов в цикле и передает каждому из них задание на сборку, пока они не закончатся.

- [x] Сервер должен корректно обрабатывать ситуацию, когда агент прекратил работать между сборками.

  Перед тем, как передать задание на сборку агенту, сервер проверяет доступен ли он (используя пакет [is-reachable](https://www.npmjs.com/package/is-reachable)). Если агент недоступен, сервер обновит его статус и перейдёт к другому свободному агенту, если такой есть.

- [x] Сервер должен корректно обрабатывать ситуацию, когда агент прекратил работать в процессе выполнения сборки.

  Если агент агент прекратил работать в процессе выполнения сборки, сервер выведет сообщение об ошибке, а сборку выполнит другой свободный агент.

- [x] Агент должен корректно обрабатывать ситуацию, когда при старте не смог соединиться с сервером.

  Если агент не смог на старте соединиться с сервером, он будет повторять попытку каждые 10 секунд, сообщая об этом в консоль.

- [x] Агент должен корректно обрабатывать ситуацию, когда при отправке результатов сборки не смог соединиться с сервером.

  Если агент не смог отправить результаты, то он будет пробовать снова через определённый интервал времени, который удваивается через каждые 10 неудачных попыток. Как только билд-сервер будет активен, он сразу получит результаты сборки.