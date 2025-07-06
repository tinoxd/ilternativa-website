# Скрипт для автоматического развертывания на Render
# Перед запуском убедитесь, что у вас есть:
# 1. GitHub аккаунт и репозиторий
# 2. MongoDB Atlas строка подключения
# 3. Render аккаунт

Write-Host "=== Развертывание Ilternativa Website ===" -ForegroundColor Green

# Проверка параметров
$githubUsername = Read-Host "Введите ваш GitHub username"
$githubRepo = Read-Host "Введите название репозитория (по умолчанию: ilternativa-website)"
if ([string]::IsNullOrEmpty($githubRepo)) {
    $githubRepo = "ilternativa-website"
}

# Настройка Git remote
Write-Host "`nНастройка Git remote..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$githubUsername/$githubRepo.git"

# Проверяем, есть ли уже remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "Remote уже существует: $existingRemote"
    $changeRemote = Read-Host "Хотите изменить на $remoteUrl? (y/n)"
    if ($changeRemote -eq 'y') {
        git remote set-url origin $remoteUrl
        Write-Host "Remote обновлен!" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "Remote добавлен!" -ForegroundColor Green
}

# Переименование ветки в main
Write-Host "`nПереименование ветки в main..." -ForegroundColor Yellow
git branch -M main

# Пуш в GitHub
Write-Host "`nЗагрузка кода в GitHub..." -ForegroundColor Yellow
Write-Host "Вам может потребоваться ввести логин и пароль GitHub"
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Код успешно загружен в GitHub!" -ForegroundColor Green
} else {
    Write-Host "Ошибка при загрузке в GitHub. Проверьте:" -ForegroundColor Red
    Write-Host "1. Создан ли репозиторий на GitHub"
    Write-Host "2. Правильный ли username и название репозитория"
    Write-Host "3. Есть ли у вас права на запись в репозиторий"
    exit 1
}

# Создание файла с переменными окружения для Render
Write-Host "`n=== Настройка переменных окружения ===" -ForegroundColor Green
Write-Host "Для работы приложения нужны следующие переменные:"

$envVars = @{}

# MongoDB URI
Write-Host "`n1. MONGODB_URI - строка подключения к MongoDB Atlas" -ForegroundColor Yellow
Write-Host "   Формат: mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority"
$mongoUri = Read-Host "Введите MONGODB_URI"
$envVars['MONGODB_URI'] = $mongoUri

# JWT Secret
Write-Host "`n2. JWT_SECRET - секретный ключ для JWT токенов" -ForegroundColor Yellow
$generateSecret = Read-Host "Сгенерировать случайный JWT_SECRET? (y/n)"
if ($generateSecret -eq 'y') {
    $jwtSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    Write-Host "Сгенерирован JWT_SECRET: $jwtSecret" -ForegroundColor Green
} else {
    $jwtSecret = Read-Host "Введите JWT_SECRET"
}
$envVars['JWT_SECRET'] = $jwtSecret

# YouTube API Key (опционально)
Write-Host "`n3. YOUTUBE_API_KEY (опционально)" -ForegroundColor Yellow
$youtubeKey = Read-Host "Введите YOUTUBE_API_KEY (или нажмите Enter чтобы пропустить)"
if (![string]::IsNullOrEmpty($youtubeKey)) {
    $envVars['YOUTUBE_API_KEY'] = $youtubeKey
}

# YouTube Channel ID (опционально)
Write-Host "`n4. YOUTUBE_CHANNEL_ID (опционально)" -ForegroundColor Yellow
$youtubeChannel = Read-Host "Введите YOUTUBE_CHANNEL_ID (или нажмите Enter чтобы пропустить)"
if (![string]::IsNullOrEmpty($youtubeChannel)) {
    $envVars['YOUTUBE_CHANNEL_ID'] = $youtubeChannel
}

# WhatsApp Number (опционально)
Write-Host "`n5. ADMIN_WHATSAPP_NUMBER (опционально)" -ForegroundColor Yellow
$whatsappNumber = Read-Host "Введите ADMIN_WHATSAPP_NUMBER (или нажмите Enter чтобы пропустить)"
if (![string]::IsNullOrEmpty($whatsappNumber)) {
    $envVars['ADMIN_WHATSAPP_NUMBER'] = $whatsappNumber
}

# Сохранение переменных в файл для справки
$envContent = @"
# Переменные окружения для Render
# ВАЖНО: НЕ коммитьте этот файл в Git!

"@

foreach ($key in $envVars.Keys) {
    $envContent += "`n$key=$($envVars[$key])"
}

$envContent | Out-File -FilePath ".env.render" -Encoding UTF8
Write-Host "`nПеременные сохранены в .env.render (используйте их при настройке Render)" -ForegroundColor Green

# Инструкции для завершения развертывания
Write-Host "`n=== Дальнейшие шаги ===" -ForegroundColor Green
Write-Host @"

1. Перейдите на https://render.com и войдите в аккаунт

2. Нажмите "New +" → "Web Service"

3. Подключите GitHub репозиторий:
   - Выберите репозиторий: $githubUsername/$githubRepo
   - Если репозитория нет в списке, нажмите "Configure account" и дайте доступ

4. Настройки сервиса:
   - Name: ilternativa-website
   - Region: выберите ближайший
   - Branch: main
   - Runtime: Node
   - Build Command: npm install && npm run client-install && npm run client-build
   - Start Command: npm start

5. Переменные окружения:
   Добавьте все переменные из файла .env.render

6. Нажмите "Create Web Service"

7. Дождитесь завершения развертывания (5-10 минут)

8. Ваш сайт будет доступен по адресу:
   https://ilternativa-website.onrender.com

Репозиторий GitHub: https://github.com/$githubUsername/$githubRepo

"@ -ForegroundColor Cyan

Write-Host "Нажмите Enter чтобы открыть Render в браузере..." -ForegroundColor Yellow
Read-Host
Start-Process "https://render.com/create?type=web"
