require('dotenv').config();
const whatsappService = require('./services/whatsapp');

console.log('🚀 Запуск тестирования WhatsApp интеграции...\n');

// Функция для ожидания готовности клиента
async function waitForClient() {
  let attempts = 0;
  const maxAttempts = 30; // 30 секунд

  while (!whatsappService.isConnected() && attempts < maxAttempts) {
    console.log(`⏳ Ожидание подключения WhatsApp... (${attempts + 1}/${maxAttempts})`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }

  if (!whatsappService.isConnected()) {
    throw new Error('Не удалось подключиться к WhatsApp за 30 секунд');
  }
}

// Основная функция тестирования
async function testWhatsApp() {
  try {
    console.log('📱 Ожидание подключения к WhatsApp...');
    console.log('   Если это первый запуск, отсканируйте QR-код в приложении WhatsApp\n');

    // Ждем подключения
    await waitForClient();

    console.log('\n✅ WhatsApp подключен! Начинаем тестирование...\n');

    // Тестовый номер (замените на свой для тестирования)
    const testNumber = process.env.ADMIN_WHATSAPP_NUMBER || '79888766777';
    
    // Тестовое сообщение
    const testMessage = `🎵 Тест интеграции Ilternativa Website

Это тестовое сообщение от системы управления мероприятиями.

Время: ${new Date().toLocaleString('ru-RU')}
Статус: WhatsApp интеграция работает! ✅

--
Ilternativa Music Project`;

    console.log(`📤 Отправка тестового сообщения на номер: ${testNumber}`);
    
    const result = await whatsappService.sendMessage(testNumber, testMessage);
    
    if (result) {
      console.log('\n✅ Сообщение успешно отправлено!');
      console.log('   ID сообщения:', result.id._serialized);
    } else {
      console.log('\n❌ Не удалось отправить сообщение');
    }

    // Ждем немного перед завершением
    console.log('\n⏳ Завершение через 5 секунд...');
    setTimeout(async () => {
      await whatsappService.disconnect();
      process.exit(0);
    }, 5000);

  } catch (error) {
    console.error('\n❌ Ошибка при тестировании:', error.message);
    process.exit(1);
  }
}

// Запускаем тест
testWhatsApp();
