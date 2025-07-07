# Исправление проблемы подключения MongoDB на Render

## Проблема
База данных MongoDB не подключается на Render, хотя локально всё работает.

## Решение

### Шаг 1: Проверьте переменные окружения на Render

1. Откройте https://dashboard.render.com
2. Найдите ваш сервис `ilternativa-website`
3. Перейдите в раздел **Environment** в левом меню
4. Убедитесь, что следующие переменные установлены:

```
MONGODB_URI=mongodb+srv://kudzaevbatraz536:1kmhaVi4JGBfV5ME@cluster0.cphftls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
YOUTUBE_API_KEY=AIzaSyAq2rm4jDZivQAtHTKl1NxxaP2_UCy7yz4
YOUTUBE_CHANNEL_ID=UCIKW8S2eErFK8U1YNIvKd1g
ADMIN_WHATSAPP_NUMBER=79888766777
```

⚠️ **ВАЖНО**: Убедитесь, что переменные добавлены БЕЗ кавычек!

### Шаг 2: Проверьте MongoDB Atlas

1. Войдите в MongoDB Atlas: https://cloud.mongodb.com
2. Перейдите в раздел **Network Access**
3. Убедитесь, что есть правило для `0.0.0.0/0` (Allow access from anywhere)
   - Если нет, нажмите **Add IP Address**
   - Выберите **Allow Access from Anywhere**
   - Нажмите **Confirm**

### Шаг 3: Проверьте статус кластера

1. В MongoDB Atlas перейдите в **Clusters**
2. Убедитесь, что кластер `Cluster0` активен (не paused)
3. Если кластер приостановлен, нажмите **Resume**

### Шаг 4: Обновите код на Render

Мы уже обновили код подключения для совместимости с новой версией Mongoose. Теперь нужно запушить изменения:

```bash
git add server.js
git commit -m "Fix MongoDB connection for Mongoose 8.x"
git push origin master
```

### Шаг 5: Добавьте диагностический скрипт

Временно измените `startCommand` в Render для диагностики:

1. В настройках сервиса на Render
2. Найдите **Start Command**
3. Временно измените на: `node diagnose-render.js`
4. Сохраните и дождитесь перезапуска
5. Проверьте логи - вы увидите детальную диагностику
6. После диагностики верните обратно: `node server.js`

### Шаг 6: Проверьте логи

1. В Render перейдите в раздел **Logs**
2. Ищите сообщения об ошибках
3. Должно появиться: `MongoDB database connection established successfully`

## Альтернативное решение

Если проблема сохраняется, попробуйте создать новый MongoDB URI:

1. В MongoDB Atlas создайте нового пользователя:
   - Database Access → Add New Database User
   - Username: `ilternativa_user`
   - Password: сгенерируйте надёжный пароль
   - Database User Privileges: Atlas Admin

2. Получите новый connection string:
   - Clusters → Connect → Connect your application
   - Замените `<password>` на ваш пароль

3. Обновите MONGODB_URI на Render

## Проверка работы

После всех изменений:
1. Откройте ваш сайт на Render
2. Проверьте консоль браузера (F12) на наличие ошибок
3. Попробуйте создать тестовое событие в админ-панели

## Контакты для помощи

Если проблема не решается:
- Проверьте статус MongoDB Atlas: https://status.mongodb.com/
- Проверьте статус Render: https://status.render.com/
