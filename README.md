# shri-2020-home-task-node.js

### Установка:

`npm i`

### Запуск сервера:

`node server.js`

### Использованные библиотеки:

- **axios** - чтобы делать запросы к БД https://hw.shri.yandex/api/

- **nodegit** - для работы с локальной копией репозитория

- **node-cache** - для кэширования ручки получения логов

### Замечания

* Использованная версия Node.js v12.14.1
* Необходимо создать `.env` файл в корневой директории и записать там свой токен для авторизации в виде TOKEN=...
* Сейчас сервер работает только с моим GitHub аккаунтом. Изменить его можно в переменной `acc` в файле `git-helper/git-helper.js` (строка 4)
* API тестировал в программе Postman. На всякий случай приложил свой конфиг с запросами - `shri-test-api.postman_collection.json`
* Про кэширование ручки получения логов: чтобы не допускать переполнения памяти, я установил максимальное количество хранимых ключей равным 1000. При достижении максимума весь кэш очищается. Также я установил время жизни каждого элемента кэша, равное 12 часам.