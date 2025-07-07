// Диагностический скрипт для проверки настроек на Render
console.log('=== RENDER DEPLOYMENT DIAGNOSTICS ===\n');

// Проверяем переменные окружения
console.log('Environment Variables Check:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('PORT:', process.env.PORT || 'NOT SET');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ SET (hidden)' : '❌ NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ SET (hidden)' : '❌ NOT SET');
console.log('YOUTUBE_API_KEY:', process.env.YOUTUBE_API_KEY ? '✅ SET (hidden)' : '❌ NOT SET');
console.log('YOUTUBE_CHANNEL_ID:', process.env.YOUTUBE_CHANNEL_ID || 'NOT SET');
console.log('ADMIN_WHATSAPP_NUMBER:', process.env.ADMIN_WHATSAPP_NUMBER || 'NOT SET');

// Проверяем MongoDB URI формат
if (process.env.MONGODB_URI) {
    const uri = process.env.MONGODB_URI;
    console.log('\nMongoDB URI Analysis:');
    console.log('Starts with mongodb+srv://:', uri.startsWith('mongodb+srv://') ? '✅' : '❌');
    console.log('Contains @cluster:', uri.includes('@cluster') ? '✅' : '❌');
    console.log('URI preview:', uri.substring(0, 30) + '...');
}

// Тестируем подключение к MongoDB
if (process.env.MONGODB_URI) {
    console.log('\nTesting MongoDB connection...');
    const mongoose = require('mongoose');
    
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('✅ MongoDB connection successful!');
            console.log('Database:', mongoose.connection.name);
            console.log('Host:', mongoose.connection.host);
            return mongoose.connection.close();
        })
        .then(() => {
            console.log('\n✅ All checks passed! The app should work on Render.');
            process.exit(0);
        })
        .catch(err => {
            console.error('❌ MongoDB connection failed:', err.message);
            if (err.message.includes('ECONNREFUSED')) {
                console.error('\nPossible issues:');
                console.error('1. MongoDB Atlas cluster is paused/deleted');
                console.error('2. Network connectivity issue from Render');
            } else if (err.message.includes('authentication failed')) {
                console.error('\nAuthentication issue:');
                console.error('1. Check username/password in MONGODB_URI');
                console.error('2. Verify user exists in MongoDB Atlas');
            } else if (err.message.includes('connect ETIMEDOUT')) {
                console.error('\nTimeout issue:');
                console.error('1. Check IP whitelist in MongoDB Atlas (should include 0.0.0.0/0)');
                console.error('2. Verify cluster is active and not paused');
            }
            process.exit(1);
        });
} else {
    console.error('\n❌ MONGODB_URI is not set! The app cannot start.');
    console.error('\nTo fix this on Render:');
    console.error('1. Go to your Render dashboard');
    console.error('2. Open your service settings');
    console.error('3. Go to Environment section');
    console.error('4. Add MONGODB_URI variable with your MongoDB connection string');
    process.exit(1);
}
