const fs = require('fs');
const path = require('path');

console.log('=== RENDER FILE STRUCTURE CHECK ===\n');

// Проверяем текущую директорию
console.log('Current directory:', process.cwd());
console.log('Directory contents:');
fs.readdirSync('.').forEach(file => {
    console.log(' -', file);
});

// Проверяем наличие важных файлов
const importantFiles = [
    'server.js',
    'index.js',
    'package.json',
    'render.yaml',
    'client/build/index.html',
    'client/build/static'
];

console.log('\nImportant files check:');
importantFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Проверяем client/build
if (fs.existsSync('client/build')) {
    console.log('\nclient/build contents:');
    fs.readdirSync('client/build').forEach(file => {
        console.log(' -', file);
    });
    
    // Проверяем размер index.html
    if (fs.existsSync('client/build/index.html')) {
        const stats = fs.statSync('client/build/index.html');
        console.log(`\nindex.html size: ${stats.size} bytes`);
        
        // Читаем первые 500 символов
        const content = fs.readFileSync('client/build/index.html', 'utf8');
        console.log('\nindex.html preview:');
        console.log(content.substring(0, 500) + '...');
    }
} else {
    console.log('\n❌ client/build directory not found!');
    console.log('This means the React app was not built during deployment.');
}

// Проверяем переменные окружения
console.log('\n\nEnvironment check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PWD:', process.env.PWD);
console.log('Build command from package.json:', require('./package.json').scripts.build || 'Not found');
