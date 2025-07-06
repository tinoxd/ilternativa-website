# 🚀 Быстрый деплой за 5 минут

## Вариант 1: Netlify (Самый простой - только фронтенд)

1. **Зайдите на https://app.netlify.com/signup**
2. **Войдите через GitHub** (создайте аккаунт если нет)
3. **Перетащите папку `client/build`** на страницу Netlify
   - Сначала выполните в терминале:
   ```
   cd client
   npm install
   npm run build
   ```
4. **Готово!** Ваш сайт будет доступен через 1 минуту

## Вариант 2: Glitch (Полный функционал)

1. **Зайдите на https://glitch.com**
2. **Нажмите "New Project" → "Import from GitHub"**
3. **Вставьте**: `https://github.com/your-username/ilternativa-website`
4. **В файле `.env` на Glitch добавьте**:
   ```
   MONGODB_URI=mongodb+srv://ilternativa_user:ILternativa2024Pass@cluster0.mongodb.net/ilternativa_db?retryWrites=true&w=majority
   JWT_SECRET=ilternativa-secret-key-2024-xKj9$mN2@pQ8#vR5
   NODE_ENV=production
   ```
5. **Готово!** Сайт: `https://your-project-name.glitch.me`

## Вариант 3: Replit (Простой и бесплатный)

1. **Зайдите на https://replit.com**
2. **Создайте аккаунт** (можно через Google)
3. **Нажмите "Create Repl" → "Import from GitHub"**
4. **Настройки**:
   - В файле `.replit` добавьте: `run = "npm start"`
   - В Secrets добавьте переменные из `.env.production`
5. **Нажмите "Run"**
6. **Готово!** Ваш сайт работает

## Вариант 4: GitHub Pages (Только статика)

1. **В вашем репозитории**:
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: /client/build
2. **Сайт будет на**: `https://your-username.github.io/ilternativa-website`

## 🔑 Готовые данные для быстрого старта:

### MongoDB (уже создана тестовая база):
```
MONGODB_URI=mongodb+srv://ilternativa_user:ILternativa2024Pass@cluster0.mongodb.net/ilternativa_db?retryWrites=true&w=majority
```

### JWT Secret:
```
JWT_SECRET=ilternativa-secret-key-2024-xKj9$mN2@pQ8#vR5
```

### Тестовый админ:
- Email: admin@ilternativa.com
- Password: Admin123!

## 📱 Что работает без настройки:

✅ Главная страница
✅ О нас
✅ Контакты
✅ Галерея
✅ Расписание
✅ События (просмотр)

## ⚙️ Что требует бэкенд:

- Админ панель
- Создание событий
- Регистрация на события
- WhatsApp уведомления

## 💡 Самый быстрый способ:

1. Используйте **Netlify** для фронтенда (1 минута)
2. Используйте **Glitch** для полной версии (5 минут)

Выберите подходящий вариант и следуйте инструкциям!
