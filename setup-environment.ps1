# Setup Environment Variables for ILternativa Website
Write-Host "=== ILternativa Website Environment Setup ===" -ForegroundColor Cyan
Write-Host ""

# Generate JWT Secret
Write-Host "Generating secure JWT_SECRET..." -ForegroundColor Yellow
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
$jwtSecret = [System.Convert]::ToBase64String($bytes)
Write-Host "JWT_SECRET generated: $jwtSecret" -ForegroundColor Green
Write-Host ""

# Instructions for MongoDB
Write-Host "MongoDB Atlas Setup Instructions:" -ForegroundColor Yellow
Write-Host "1. Go to https://www.mongodb.com/cloud/atlas" -ForegroundColor White
Write-Host "2. Sign up for a free account" -ForegroundColor White
Write-Host "3. Create a new cluster (M0 - free tier)" -ForegroundColor White
Write-Host "4. Create a database user with password" -ForegroundColor White
Write-Host "5. Add 0.0.0.0/0 to IP whitelist for Render access" -ForegroundColor White
Write-Host "6. Get your connection string" -ForegroundColor White
Write-Host ""

# Create .env.local file
$envContent = @"
# MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ilternativa?retryWrites=true&w=majority

# JWT Secret for authentication
JWT_SECRET=$jwtSecret

# Server port
PORT=5000

# Node environment
NODE_ENV=development

# YouTube API Key (optional)
YOUTUBE_API_KEY=your_youtube_api_key

# Email configuration (optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# WhatsApp configuration (optional)
ADMIN_WHATSAPP_NUMBER=your_whatsapp_number
"@

# Ask if user wants to create .env.local
Write-Host "Would you like to create a .env.local file with these settings? (y/n)" -ForegroundColor Yellow
$response = Read-Host
if ($response -eq 'y') {
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host ".env.local file created successfully!" -ForegroundColor Green
    Write-Host "Please update MONGODB_URI with your actual connection string" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Render.com Environment Variables ===" -ForegroundColor Cyan
Write-Host "Copy these to your Render dashboard:" -ForegroundColor Yellow
Write-Host ""
Write-Host "MONGODB_URI=" -NoNewline; Write-Host "your_mongodb_connection_string" -ForegroundColor Red
Write-Host "JWT_SECRET=" -NoNewline; Write-Host $jwtSecret -ForegroundColor Green
Write-Host "YOUTUBE_API_KEY=" -NoNewline; Write-Host "your_youtube_api_key" -ForegroundColor Red
Write-Host "YOUTUBE_CHANNEL_ID=" -NoNewline; Write-Host "UCIKW8S2eErFK8U1YNIvKd1g" -ForegroundColor Green
Write-Host "ADMIN_WHATSAPP_NUMBER=" -NoNewline; Write-Host "your_whatsapp_number" -ForegroundColor Red
Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
