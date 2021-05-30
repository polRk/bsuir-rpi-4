Для запуска проекта необходимо: ввести команды:
1. Установленный NodeJS > 12
2. Установленный npm (поставляется с NodeJS)
3. Установить зависимости `npm install`
4. Запустить dev сервер `npm run dev`

Имеются ограничения по API:
1. Работает только на локальном хосте `localhost`
2. Лимит по пагинации в 100 элементов

Для получения новостей необходимо ввести поисковой запрос или выбрать категорию.

Запуск через Docker
```
docker build -t polrk:rpi-4 .
docker run -d -p 8080:80 polrk:rpi-4
open http://localhost:8080
```
