# Скрипт для открытия всех необходимых сайтов для регистрации

Write-Host "=== Создание аккаунтов для развертывания ===" -ForegroundColor Green
Write-Host "Этот скрипт откроет все необходимые сайты в браузере" -ForegroundColor Yellow
Write-Host "Создайте аккаунты в следующем порядке:" -ForegroundColor Yellow

Write-Host "`n1. GitHub (для хранения кода)" -ForegroundColor Cyan
Write-Host "   - Зарегистрируйтесь на GitHub"
Write-Host "   - Создайте новый репозиторий 'ilternativa-website'"
Write-Host "   - НЕ инициализируйте с README"
$openGithub = Read-Host "`nОткрыть GitHub? (y/n)"
if ($openGithub -eq 'y') {
    Start-Process "https://github.com/signup"
    Write-Host "После регистрации создайте репозиторий здесь:" -ForegroundColor Yellow
    Start-Process "https://github.com/new"
}

Write-Host "`n2. MongoDB Atlas (база данных)" -ForegroundColor Cyan
Write-Host "   - Зарегистрируйтесь на MongoDB Atlas"
Write-Host "   - Создайте бесплатный кластер"
Write-Host "   - Создайте пользователя БД"
Write-Host "   - Добавьте 0.0.0.0/0 в Network Access"
Write-Host "   - Скопируйте connection string"
$openMongo = Read-Host "`nОткрыть MongoDB Atlas? (y/n)"
if ($openMongo -eq 'y') {
    Start-Process "https://www.mongodb.com/cloud/atlas/register"
}

Write-Host "`n3. Render (хостинг)" -ForegroundColor Cyan
Write-Host "   - Зарегистрируйтесь через GitHub (рекомендуется)"
Write-Host "   - Это упростит подключение репозитория"
$openRender = Read-Host "`nОткрыть Render? (y/n)"
if ($openRender -eq 'y') {
    Start-Process "https://render.com/register"
}

Write-Host "`n4. Google Cloud Console (опционально, для YouTube API)" -ForegroundColor Cyan
Write-Host "   - Создайте проект"
Write-Host "   - Включите YouTube Data API v3"
Write-Host "   - Создайте API ключ"
$openGoogle = Read-Host "`nОткрыть Google Cloud Console? (y/n)"
if ($openGoogle -eq 'y') {
    Start-Process "https://console.cloud.google.com"
}

Write-Host "`n=== Следующие шаги ===" -ForegroundColor Green
Write-Host @"

После создания всех аккаунтов:

1. Запустите скрипт развертывания:
   .\deploy-to-render.ps1

2. Введите необходимые данные:
   - GitHub username
   - MongoDB connection string
   - И другие переменные

3. Скрипт автоматически:
   - Загрузит код на GitHub
   - Подготовит переменные для Render
   - Откроет Render для финальной настройки

"@ -ForegroundColor Cyan

Write-Host "`nСохраните эти данные:" -ForegroundColor Yellow
Write-Host "- GitHub username и название репозитория"
Write-Host "- MongoDB connection string"
Write-Host "- API ключи (если создаете)"

Write-Host "`nНажмите Enter чтобы закрыть..." -ForegroundColor Gray
Read-Host
