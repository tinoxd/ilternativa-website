# ILternativa Website

Фуллстек веб-приложение для танцевальной студии ILternativa.

## Технологии

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Дополнительно**: YouTube API интеграция, WhatsApp интеграция

## Локальная разработка

### Требования
- Node.js (v14 или выше)
- MongoDB
- npm или yarn

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/YOUR_USERNAME/ilternativa-website.git
cd ilternativa-website
```

2. Установите зависимости:
```bash
# Установка серверных зависимостей
npm install

# Установка клиентских зависимостей
npm run client-install
```

3. Создайте файл `.env` в корневой директории и добавьте переменные окружения (см. `.env.example`)

4. Запустите приложение:
```bash
# Запуск сервера и клиента одновременно
npm run dev

# Или по отдельности:
npm run server  # Только сервер
npm run client  # Только клиент
```

## Деплой

Приложение настроено для деплоя на Render.com. См. `DEPLOYMENT_INSTRUCTIONS.md` для подробной инструкции.

## Структура проекта

```
ilternativa-website/
├── client/              # React приложение
│   ├── public/
│   └── src/
│       ├── components/  # React компоненты
│       ├── styles/      # CSS стили
│       └── App.js       # Главный компонент
├── models/              # MongoDB модели
├── routes/              # Express маршруты
├── middleware/          # Express middleware
├── services/            # Вспомогательные сервисы
├── server.js            # Express сервер
└── package.json         # Зависимости проекта
```

## Функции

- 📅 Управление мероприятиями и регистрациями
- 👥 Система аутентификации пользователей
- 📊 Админ-панель со статистикой
- 🎥 Интеграция с YouTube для отображения видео
- 💬 WhatsApp интеграция для уведомлений
- 📱 Адаптивный дизайн

## Лицензия

Все права защищены.
- YouTube Data API v3
- JWT (jsonwebtoken)
- Bcrypt.js

### Frontend
- React
- React Router
- Bootstrap 5
- Axios
- Font Awesome

## Установка и запуск

### Требования
- Node.js (v14 или выше)
- MongoDB
- YouTube API ключ

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/ilternativa-website.git
cd ilternativa-website
```

2. Установите зависимости для сервера:
```bash
npm install
```

3. Установите зависимости для клиента:
```bash
cd client
npm install
cd ..
```

4. Создайте файл `.env` в корневой директории:
```env
MONGODB_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
PORT=5000
```

### Запуск в режиме разработки

Запуск сервера и клиента одновременно:
```bash
npm run dev
```

Или запустите их отдельно:

Сервер:
```bash
npm run server
```

Клиент:
```bash
npm run client
```

### Production сборка

1. Создайте production build клиента:
```bash
npm run client-build
```

2. Запустите сервер:
```bash
npm start
```

## Админ-панель

### Первый запуск

1. Перейдите на http://localhost:3000/admin-setup
2. Создайте первого администратора

### Вход в админ-панель

1. Перейдите на http://localhost:3000/login
2. Введите имя пользователя и пароль
3. После входа вы будете перенаправлены в админ-панель

### Функции администратора

- Создание событий и мероприятий
- Редактирование существующих событий
- Удаление событий
- Просмотр всех событий в админ-панели

## Структура проекта

```
ilternativa-website/
├── client/                 # React приложение
│   ├── public/
│   └── src/
│       ├── components/     # React компоненты
│       ├── App.js
│       ├── App.css
│       └── index.js
├── models/                 # MongoDB модели
│   └── Event.js
├── routes/                 # Express маршруты
│   ├── events.js
│   └── youtube.js
├── server.js              # Основной файл сервера
├── package.json
└── .env                   # Переменные окружения
```

## API Endpoints

### Events
- `GET /events` - Получить все события
- `POST /events/add` - Создать новое событие
- `GET /events/:id` - Получить событие по ID
- `POST /events/update/:id` - Обновить событие
- `DELETE /events/:id` - Удалить событие

### YouTube
- `GET /youtube/channel` - Информация о канале
- `GET /youtube/videos` - Последние видео
- `GET /youtube/playlists` - Все плейлисты
- `GET /youtube/playlist/:id` - Видео из плейлиста

## Безопасность

- Все конфиденциальные данные хранятся в переменных окружения
- Используется CORS для защиты API
- MongoDB строка подключения защищена

## Деплой

Проект готов к деплою на платформы:
- Heroku
- Vercel
- Netlify (для frontend)
- MongoDB Atlas (для базы данных)

## Лицензия

ISC

## Контакты

Email: info@ilternativa.com
YouTube: [Ilternativa Channel](https://www.youtube.com/channel/UCIKW8S2eErFK8U1YNIvKd1g)
