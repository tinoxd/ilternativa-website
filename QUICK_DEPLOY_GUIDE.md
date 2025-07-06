# 🚀 Быстрый гайд по деплою ILternativa Website

## Шаг 1: Авторизация в GitHub (если еще не сделано)

Откройте PowerShell и выполните:
```powershell
gh auth login
```
Выберите:
- GitHub.com
- HTTPS
- Authenticate with browser

## Шаг 2: Создание и загрузка репозитория

После авторизации выполните в PowerShell:
```powershell
# Создание репозитория
gh repo create ilternativa-website --public --source=. --push

# Если репозиторий уже существует, просто загрузите код:
git push -u origin master
```

## Шаг 3: Создание MongoDB базы данных

1. Зайдите на https://www.mongodb.com/cloud/atlas
2. Нажмите "Try Free" и создайте аккаунт
3. После входа:
   - Нажмите "Build a Database"
   - Выберите "M0 FREE" план
   - Выберите провайдера (AWS) и регион (ближайший к вам)
   - Нажмите "Create"
4. Создайте пользователя базы данных:
   - Username: `ilternativa_admin`
   - Password: сгенерируйте надежный пароль
   - Запишите эти данные!
5. В разделе "Network Access":
   - Нажмите "Add IP Address"
   - Нажмите "Allow Access from Anywhere"
   - Подтвердите
6. В разделе "Database":
   - Нажмите "Connect" на вашем кластере
   - Выберите "Connect your application"
   - Скопируйте connection string
   - Замените `<password>` на ваш пароль
   - Замените `myFirstDatabase` на `ilternativa`

Ваш connection string будет выглядеть так:
```
mongodb+srv://ilternativa_admin:ВАШ_ПАРОЛЬ@cluster0.xxxxx.mongodb.net/ilternativa?retryWrites=true&w=majority
```

## Шаг 4: Деплой на Render

1. Зайдите на https://render.com
2. Нажмите "Get Started for Free" и создайте аккаунт
3. После входа нажмите "New +" → "Web Service"
4. Подключите GitHub:
   - Нажмите "Connect GitHub"
   - Авторизуйте Render
   - Выберите репозиторий "ilternativa-website"
5. Настройки будут автоматически загружены из `render.yaml`
6. Добавьте переменные окружения (Environment Variables):

### Обязательные переменные:

| Ключ | Значение |
|------|----------|
| MONGODB_URI | `ваш connection string из MongoDB Atlas` |
| JWT_SECRET | `b7e45f3a-8c92-4d6e-a1b9-7c3d5e8f2a91` |
| NODE_ENV | `production` |

### Опциональные переменные (если используете):

| Ключ | Значение |
|------|----------|
| YOUTUBE_API_KEY | `ваш YouTube API ключ` |
| YOUTUBE_CHANNEL_ID | `ID вашего YouTube канала` |
| ADMIN_WHATSAPP_NUMBER | `номер WhatsApp для уведомлений` |

7. Нажмите "Create Web Service"

## Шаг 5: Ожидание деплоя

- Render начнет сборку и деплой вашего приложения
- Это займет 5-10 минут
- Вы увидите логи в реальном времени
- После успешного деплоя вы получите URL

## 🎉 Ваш сайт будет доступен по адресу:

```
https://ilternativa-website.onrender.com
```

## 📝 Важные замечания:

1. **Первый запуск**: После деплоя сайт может загружаться медленно при первом открытии
2. **Бесплатный план**: Сервер засыпает после 15 минут неактивности
3. **Обновления**: После push в GitHub, Render автоматически передеплоит сайт

## 🔧 Создание первого админа:

После деплоя:
1. Откройте `https://ilternativa-website.onrender.com/admin-setup`
2. Создайте первого администратора
3. Используйте эти данные для входа в админ-панель

## ❓ Проблемы?

- Проверьте логи в Render Dashboard
- Убедитесь, что все переменные окружения добавлены правильно
- Проверьте, что MongoDB connection string правильный
