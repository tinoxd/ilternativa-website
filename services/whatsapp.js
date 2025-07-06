const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.initializeClient();
  }

  initializeClient() {
    // Создаем клиент с локальной аутентификацией
    this.client = new Client({
      authStrategy: new LocalAuth({
        dataPath: path.join(__dirname, '../.wwebjs_auth'),
      }),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      }
    });

    // Обработчик QR кода для первого входа
    this.client.on('qr', (qr) => {
      console.log('\n📱 WhatsApp QR Code - сканируйте его в приложении WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    // Когда клиент готов
    this.client.on('ready', () => {
      console.log('✅ WhatsApp клиент готов к работе!');
      this.isReady = true;
    });

    // Обработка ошибок аутентификации
    this.client.on('auth_failure', (msg) => {
      console.error('❌ Ошибка аутентификации WhatsApp:', msg);
      this.isReady = false;
    });

    // Обработка отключения
    this.client.on('disconnected', (reason) => {
      console.log('📵 WhatsApp клиент отключен:', reason);
      this.isReady = false;
      // Пытаемся переподключиться через 5 секунд
      setTimeout(() => {
        console.log('🔄 Попытка переподключения к WhatsApp...');
        this.client.initialize();
      }, 5000);
    });

    // Инициализируем клиент
    this.client.initialize();
  }

  // Метод для отправки сообщения
  async sendMessage(phoneNumber, message) {
    try {
      if (!this.isReady) {
        console.error('WhatsApp клиент еще не готов');
        return null;
      }

      // Форматируем номер телефона
      let formattedNumber = phoneNumber.replace(/\D/g, '');
      
      // Убираем начальную 8 и заменяем на 7 для российских номеров
      if (formattedNumber.startsWith('8') && formattedNumber.length === 11) {
        formattedNumber = '7' + formattedNumber.substring(1);
      }
      
      // Добавляем код страны если его нет
      if (!formattedNumber.startsWith('7') && formattedNumber.length === 10) {
        formattedNumber = '7' + formattedNumber;
      }

      // Добавляем @c.us для WhatsApp
      const chatId = formattedNumber + '@c.us';

      // Проверяем, зарегистрирован ли номер в WhatsApp
      const isRegistered = await this.client.isRegisteredUser(chatId);
      
      if (!isRegistered) {
        console.error(`Номер ${phoneNumber} не зарегистрирован в WhatsApp`);
        return null;
      }

      // Отправляем сообщение
      const result = await this.client.sendMessage(chatId, message);
      console.log(`✅ Сообщение отправлено на ${phoneNumber}`);
      return result;

    } catch (error) {
      console.error('Ошибка при отправке WhatsApp сообщения:', error);
      return null;
    }
  }

  // Метод для проверки статуса
  isConnected() {
    return this.isReady;
  }

  // Метод для отключения
  async disconnect() {
    if (this.client) {
      await this.client.destroy();
    }
  }
}

// Создаем единственный экземпляр сервиса
const whatsappService = new WhatsAppService();

module.exports = whatsappService;
