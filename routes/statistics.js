const express = require('express');
const router = express.Router();
const SiteActivity = require('../models/SiteActivity');
const EventRegistration = require('../models/EventRegistration');
const Event = require('../models/Event');
const ExcelJS = require('exceljs');
const { auth } = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Получить статистику активности за период
router.get('/activity', auth, adminAuth, async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;
    
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // По умолчанию 30 дней
    const end = endDate ? new Date(endDate) : new Date();

    // Агрегация по типам активности
    const activityByType = await SiteActivity.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Агрегация по дням/часам
    let dateFormat;
    switch (groupBy) {
      case 'hour':
        dateFormat = { $dateToString: { format: '%Y-%m-%d %H:00', date: '$createdAt' } };
        break;
      case 'day':
        dateFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        break;
      case 'month':
        dateFormat = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
        break;
      default:
        dateFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    }

    const activityByTime = await SiteActivity.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: dateFormat,
          count: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' }
        }
      },
      {
        $project: {
          _id: 1,
          count: 1,
          uniqueUsers: { $size: '$uniqueUsers' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Самые просматриваемые события
    const popularEvents = await SiteActivity.aggregate([
      {
        $match: {
          type: 'event_view',
          eventId: { $exists: true },
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: '$eventId',
          views: { $sum: 1 }
        }
      },
      {
        $sort: { views: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'event'
        }
      },
      {
        $unwind: '$event'
      },
      {
        $project: {
          eventId: '$_id',
          eventName: '$event.name',
          views: 1
        }
      }
    ]);

    res.json({
      activityByType,
      activityByTime,
      popularEvents,
      period: { start, end }
    });
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({ error: 'Ошибка при получении статистики' });
  }
});

// Экспорт регистраций в Excel
router.get('/export/registrations', auth, adminAuth, async (req, res) => {
  try {
    const { eventId, status, startDate, endDate } = req.query;
    
    // Формируем фильтр
    const filter = {};
    if (eventId) filter.event = eventId;
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Получаем регистрации с заполненными данными о событиях
    const registrations = await EventRegistration.find(filter)
      .populate('event', 'name date location')
      .sort({ createdAt: -1 });

    // Создаем Excel файл
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Регистрации');

    // Заголовки столбцов
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Событие', key: 'eventName', width: 30 },
      { header: 'Дата события', key: 'eventDate', width: 15 },
      { header: 'Фамилия', key: 'lastName', width: 20 },
      { header: 'Имя', key: 'firstName', width: 20 },
      { header: 'Отчество', key: 'patronymic', width: 20 },
      { header: 'Телефон', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Количество детей', key: 'childrenCount', width: 15 },
      { header: 'Имена детей', key: 'childrenNames', width: 40 },
      { header: 'Статус', key: 'status', width: 15 },
      { header: 'Дата регистрации', key: 'registrationDate', width: 20 },
      { header: 'Примечания', key: 'notes', width: 30 }
    ];

    // Стилизация заголовков
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    // Добавляем данные
    registrations.forEach(reg => {
      worksheet.addRow({
        id: reg._id.toString(),
        eventName: reg.event ? reg.event.name : 'Неизвестное событие',
        eventDate: reg.event ? new Date(reg.event.date).toLocaleDateString('ru-RU') : '-',
        lastName: reg.lastName,
        firstName: reg.firstName,
        patronymic: reg.patronymic || '-',
        phone: reg.phone,
        email: reg.email || '-',
        childrenCount: reg.childrenCount,
        childrenNames: reg.childrenNames.join(', ') || '-',
        status: reg.status === 'approved' ? 'Одобрено' : 
                reg.status === 'rejected' ? 'Отклонено' : 'Ожидает',
        registrationDate: new Date(reg.createdAt).toLocaleString('ru-RU'),
        notes: reg.notes || '-'
      });
    });

    // Автоподбор ширины столбцов
    worksheet.columns.forEach(column => {
      column.width = Math.max(column.width, 10);
    });

    // Устанавливаем заголовки для скачивания
    const filename = `registrations_${new Date().toISOString().split('T')[0]}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Отправляем файл
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting registrations:', error);
    res.status(500).json({ error: 'Ошибка при экспорте данных' });
  }
});

// Экспорт всех участников в Excel
router.get('/export/participants', auth, adminAuth, async (req, res) => {
  try {
    // Получаем все одобренные регистрации
    const registrations = await EventRegistration.find({ status: 'approved' })
      .populate('event', 'name date location')
      .sort({ lastName: 1, firstName: 1 });

    // Создаем Excel файл
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Участники');

    // Заголовки столбцов
    worksheet.columns = [
      { header: '№', key: 'number', width: 5 },
      { header: 'ФИО', key: 'fullName', width: 40 },
      { header: 'Телефон', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Количество детей', key: 'childrenCount', width: 15 },
      { header: 'Имена детей', key: 'childrenNames', width: 40 },
      { header: 'События', key: 'events', width: 50 },
      { header: 'Количество событий', key: 'eventsCount', width: 20 }
    ];

    // Стилизация заголовков
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    // Группируем по участникам
    const participantsMap = new Map();
    
    registrations.forEach(reg => {
      const key = `${reg.phone}_${reg.email || 'no-email'}`;
      
      if (!participantsMap.has(key)) {
        participantsMap.set(key, {
          fullName: `${reg.lastName} ${reg.firstName} ${reg.patronymic || ''}`.trim(),
          phone: reg.phone,
          email: reg.email || '-',
          childrenCount: reg.childrenCount,
          childrenNames: reg.childrenNames.join(', ') || '-',
          events: []
        });
      }
      
      if (reg.event) {
        participantsMap.get(key).events.push({
          name: reg.event.name,
          date: new Date(reg.event.date).toLocaleDateString('ru-RU')
        });
      }
    });

    // Добавляем данные в Excel
    let number = 1;
    participantsMap.forEach(participant => {
      const eventsText = participant.events
        .map(e => `${e.name} (${e.date})`)
        .join(', ');
      
      worksheet.addRow({
        number: number++,
        fullName: participant.fullName,
        phone: participant.phone,
        email: participant.email,
        childrenCount: participant.childrenCount,
        childrenNames: participant.childrenNames,
        events: eventsText || '-',
        eventsCount: participant.events.length
      });
    });

    // Добавляем итоговую строку
    worksheet.addRow({});
    worksheet.addRow({
      number: '',
      fullName: 'ИТОГО:',
      phone: '',
      email: '',
      childrenCount: '',
      childrenNames: '',
      events: '',
      eventsCount: participantsMap.size
    });

    // Стилизация итоговой строки
    const lastRow = worksheet.lastRow;
    lastRow.font = { bold: true };
    lastRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFCC00' }
    };

    // Устанавливаем заголовки для скачивания
    const filename = `participants_${new Date().toISOString().split('T')[0]}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Отправляем файл
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting participants:', error);
    res.status(500).json({ error: 'Ошибка при экспорте участников' });
  }
});

module.exports = router;
