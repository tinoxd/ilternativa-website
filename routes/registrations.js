const router = require('express').Router();
const EventRegistration = require('../models/EventRegistration');
const Event = require('../models/Event');
const { auth } = require('../middleware/auth');
const whatsappService = require('../services/whatsapp');

// Функция для отправки сообщения в WhatsApp через whatsapp-web.js
async function sendWhatsAppMessage(phone, message) {
  try {
    // Используем наш WhatsApp сервис
    return await whatsappService.sendMessage(phone, message);
  } catch (error) {
    console.error('Error in sendWhatsAppMessage:', error);
    return null;
  }
}

// Создать новую заявку на мероприятие (без авторизации пользователей)
router.post('/register', async (req, res) => {
  try {
    const { eventId, firstName, lastName, patronymic, phone, childrenCount, childrenNames } = req.body;

    // Проверяем существование мероприятия
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Создаем новую заявку
    const registration = new EventRegistration({
      event: eventId,
      firstName,
      lastName,
      patronymic,
      phone,
      childrenCount,
      childrenNames
    });

    await registration.save();

    // Отправляем уведомление в WhatsApp админу
    const adminMessage = `Новая заявка на мероприятие!
    \r\nМероприятие: ${event.name}
    Дата: ${new Date(event.date).toLocaleDateString('ru-RU')}
    Имя: ${firstName} ${lastName} ${patronymic}
    Телефон: ${phone}
    Количество детей: ${childrenCount}
    Имена детей: ${childrenNames.join(', ')}\r\n\r\nСтатус: Ожидает подтверждения`;

    // Отправляем уведомление админу если настроен номер
    if (process.env.ADMIN_WHATSAPP_NUMBER) {
      await sendWhatsAppMessage(process.env.ADMIN_WHATSAPP_NUMBER, adminMessage);
    }

    res.status(201).json({
      message: 'Registration submitted successfully',
      registration: await registration.populate('event')
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Админские маршруты

// Получить все заявки (только для админов)
router.get('/all', auth, async (req, res) => {
  try {
    // Проверяем, что пользователь - админ
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const registrations = await EventRegistration.find()
      .populate('event')
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить статус заявки (только для админов)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    // Проверяем, что пользователь - админ
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'approved', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const registration = await EventRegistration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('event');

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Отправляем уведомление пользователю в WhatsApp
    const statusText = {
      'approved': 'одобрена',
      'rejected': 'отклонена',
      'pending': 'на рассмотрении'
    };

    const userMessage = `Ваша заявка на мероприятие "${registration.event.name}" ${statusText[status]}!`;

    if (registration.phone) {
      await sendWhatsAppMessage(registration.phone, userMessage);
    }

    res.json({
      message: 'Status updated successfully',
      registration
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удалить заявку (только для админов)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Проверяем, что пользователь - админ
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const registration = await EventRegistration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.json({ message: 'Registration deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
