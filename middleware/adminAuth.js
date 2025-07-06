module.exports = (req, res, next) => {
  try {
    // Проверяем, что пользователь авторизован
    if (!req.user) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    // Проверяем роль пользователя
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Доступ запрещен. Требуются права администратора.' });
    }

    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ error: 'Ошибка проверки прав' });
  }
};
