# Исправление ошибки деплоя на Render.com

## Проблема
Приложение не запускается на Render из-за отсутствующей переменной окружения `MONGODB_URI`.

## Решение

### 1. Войдите в панель управления Render
1. Перейдите на https://dashboard.render.com
2. Найдите ваш сервис `ilternativa-website`

### 2. Настройте переменные окружения
1. Нажмите на ваш сервис
2. Перейдите в раздел "Environment" в левом меню
3. Добавьте следующие переменные окружения:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ilternativa?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
YOUTUBE_API_KEY=your-youtube-api-key
YOUTUBE_CHANNEL_ID=UCIKW8S2eErFK8U1YNIvKd1g
ADMIN_WHATSAPP_NUMBER=your-whatsapp-number
```

### 3. Получите MongoDB URI
Если у вас еще нет MongoDB базы данных:

1. Создайте бесплатный аккаунт на https://www.mongodb.com/cloud/atlas
2. Создайте новый кластер (выберите бесплатный M0)
3. Создайте пользователя базы данных
4. Добавьте IP адрес 0.0.0.0/0 в whitelist (для доступа с любого IP)
5. Получите connection string и замените `<password>` на ваш пароль

### 4. Сгенерируйте JWT_SECRET
Используйте случайную строку, например:
```
your-super-secret-jwt-key-2024
```

### 5. YouTube API Key (опционально)
Если вам нужна интеграция с YouTube:
1. Перейдите на https://console.cloud.google.com
2. Создайте новый проект или выберите существующий
3. Включите YouTube Data API v3
4. Создайте API ключ

### 6. Перезапустите сервис
После добавления всех переменных окружения:
1. Нажмите "Save Changes"
2. Render автоматически перезапустит ваш сервис

## Альтернативное решение для локального тестирования

Если вы хотите сначала протестировать локально с production настройками:

1. Создайте файл `.env.production` (уже существует)
2. Убедитесь, что все необходимые переменные установлены
3. Запустите локально:
```bash
NODE_ENV=production npm start
```

## Проверка
После успешного деплоя вы должны увидеть в логах:
```
Server is running on port: 10000
MongoDB database connection established successfully
```
