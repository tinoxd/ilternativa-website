const SiteActivity = require('../models/SiteActivity');

const activityTracker = (type, additionalData = {}) => {
  return async (req, res, next) => {
    try {
      const activity = {
        type,
        path: req.path,
        userAgent: req.get('user-agent'),
        ipAddress: req.ip || req.connection.remoteAddress,
        ...additionalData
      };

      // Если пользователь авторизован
      if (req.user && req.user._id) {
        activity.userId = req.user._id;
      }

      // Если это связано с событием
      if (req.params.eventId) {
        activity.eventId = req.params.eventId;
      }

      // Дополнительные метаданные
      if (req.body && Object.keys(req.body).length > 0) {
        activity.metadata = {
          ...activity.metadata,
          bodyKeys: Object.keys(req.body)
        };
      }

      // Сохраняем активность асинхронно, не блокируя запрос
      SiteActivity.create(activity).catch(err => {
        console.error('Error tracking activity:', err);
      });
    } catch (error) {
      console.error('Activity tracker error:', error);
    }

    next();
  };
};

module.exports = activityTracker;
