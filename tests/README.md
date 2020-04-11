## Модульные тесты

Для написания модульных тестов был использован фреймворк [Jest](https://jestjs.io/).

<span style="color:red">Чтобы заработали все тесты с git, необходимо предварительно склонировать репозиторий underscore в папку `tmp/jashkenas`: </span>
```
cd tmp
mkdir jashkenas
cd jashkenas
git clone https://github.com/jashkenas/underscore.git
```
Это необходимо проделать вручную, чтобы изолировать отдельные тестовые сценарии. Иначе они будут зависить от функции `gitClone` из `git-helper.js`.

Логические блоки приложения, проверяемые модульными тестами:

- **Работа с git - клонирование удаленного репозитория**

  *Проверяемые сценарии:*
  - при попытке склонировать существующий публичный репозиторий должны получить сообщение об успешном результате
  - при попытке склонировать существующий публичный репозиторий должна появиться папка с ним
  - склонированный репозиторий можно открыть при помощи nodegit
  - eсли репозиторий уже был склонирован ранее, вместо клонирования должна быть выполнена команда `git pull`
  - если пытаемся склонировать несуществующий репозиторий, должны получить соответствующее сообщение об ошибке

- **Работа с git - информация о коммитах локального репозитория**

  *Проверяемые сценарии:*
  - при запросе информации о последнем коммите, должнен возвращаться промис, который содержит сообщение коммита, его хэш, название ветки и имя автора
  - при запросе информации обо всех коммитах, должен возвращаться массив промисов

- **Работа с git - получение изменений из удаленного репозитория**

  *Проверяемые сценарии:*
  - при запросе информации о наличии новых коммитов, должен возвращаться промис с массивом коммитов, которых нет в локальном репозитории, но есть в удаленном


## Интеграционные тесты