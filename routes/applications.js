const router = require('express').Router();
const nodemailer = require('nodemailer');

// Модель для заявок (опционально)
const Application = require('../models/Application');

// POST route для создания новой заявки
router.route('/').post(async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Сохранение заявки в базу данных (если есть модель)
    if (Application) {
      const newApplication = new Application({
        name,
        phone,
        email,
        message,
        createdAt: new Date()
      });
      await newApplication.save();
    }

    // Отправка email уведомления (настройте свои параметры)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@ilternativa.com',
      subject: 'Новая заявка с сайта ILTERNATIVA',
      html: `
        <h2>Новая заявка</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong> ${message || 'Не указано'}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
      `
    };

    // Отправка email (опционально)
    // await transporter.sendMail(mailOptions);

    res.json({ message: 'Заявка успешно отправлена!' });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(400).json({ error: 'Ошибка при отправке заявки' });
  }
});

// GET route для получения всех заявок (только для админа)
router.route('/').get(async (req, res) => {
  try {
    if (Application) {
      const applications = await Application.find().sort({ createdAt: -1 });
      res.json(applications);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(400).json({ error: 'Ошибка при получении заявок' });
  }
});

module.exports = router;
