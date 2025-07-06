# 🚀 Деплой вашего сайта ILternativa

## ✅ Что уже сделано:
- GitHub репозиторий создан: https://github.com/tinoxd/ilternativa-website
- Код загружен на GitHub
- Проект готов к деплою

## 📋 Следующие шаги:

### Шаг 1: MongoDB Atlas (База данных)
1. Зайдите на https://www.mongodb.com/cloud/atlas
2. Создайте бесплатный аккаунт (Sign Up Free)
3. После регистрации:
   - Нажмите "Build a Database"
   - Выберите "M0 FREE" (бесплатный план)
   - Выберите регион: Europe (Frankfurt) или ближайший к вам
   - Нажмите "Create"

4. Создайте пользователя базы данных:
   - Username: `ilternativa_admin`
   - Password: `ILternativa2024SecurePass!`
   - Нажмите "Create User"

5. В разделе "Network Access":
   - Нажмите "Add IP Address"
   - Нажмите "Allow Access from Anywhere"
   - Нажмите "Confirm"

6. Получите connection string:
   - В разделе "Database" нажмите "Connect"
   - Выберите "Connect your application"
   - Скопируйте строку подключения
   - Замените `<password>` на `ILternativa2024SecurePass!`
   - Замените `myFirstDatabase` на `ilternativa_db`

Ваш connection string будет выглядеть примерно так:
```
mongodb+srv://ilternativa_admin:ILternativa2024SecurePass!@cluster0.xxxxx.mongodb.net/ilternativa_db?retryWrites=true&w=majority
```

### Шаг 2: Render (Хостинг)
1. Зайдите на https://render.com
2. Нажмите "Get Started for Free"
3. Создайте аккаунт (можно войти через GitHub)
4. После входа нажмите "New +" → "Web Service"
5. Подключите GitHub:
   - Нажмите "Connect GitHub"
   - Авторизуйте Render для доступа к вашим репозиториям
   - Выберите репозиторий "ilternativa-website"

6. Настройки сервиса:
   - **Name**: ilternativa-website
   - **Region**: Frankfurt (EU Central)
   - **Branch**: master
   - **Runtime**: Node
   - Остальные настройки автоматически подтянутся из render.yaml

7. Добавьте переменные окружения (Environment Variables):
   Нажмите "Advanced" и добавьте:

   | Key | Value |
   |-----|-------|
   | MONGODB_URI | `Ваш connection string из MongoDB Atlas` |
   | JWT_SECRET | `ilternativa-jwt-secret-2024-xK9mN2pQ8vR5` |
   | NODE_ENV | `production` |

8. Нажмите "Create Web Service"

### Шаг 3: Ожидание деплоя
- Render начнет сборку и деплой
- Это займет 5-10 минут
- Вы увидите логи в реальном времени
- После успешного деплоя получите URL: https://ilternativa-website.onrender.com

## 🎯 Быстрая альтернатива - Vercel (только фронтенд)

Если хотите быстро запустить только визуальную часть:

1. Зайдите на https://vercel.com
2. Нажмите "Sign Up" → "Continue with GitHub"
3. Нажмите "Import Project"
4. Вставьте: `https://github.com/tinoxd/ilternativa-website`
5. В настройках:
   - Framework Preset: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Нажмите "Deploy"

## 📱 Проверка работы

После деплоя проверьте:
1. Главная страница загружается
2. Навигация работает
3. Страницы "О нас", "Контакты", "Расписание" отображаются

## 🔧 Создание первого админа

После деплоя на Render:
1. Откройте `https://ilternativa-website.onrender.com/admin-setup`
2. Создайте администратора:
   - Email: admin@ilternativa.com
   - Password: Admin123!
3. Войдите в админ-панель: `/login`

## ❓ Помощь

Если возникнут проблемы:
- Проверьте логи в Render Dashboard
- Убедитесь, что MongoDB connection string правильный
- Проверьте, что все переменные окружения добавлены

Ваш сайт будет доступен по адресу: https://ilternativa-website.onrender.com
