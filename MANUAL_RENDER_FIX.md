# Ручное исправление Build Command в Render

Если автоматическая конфигурация не работает, настройте Build Command вручную:

## Шаги:

1. **Откройте настройки сервиса в Render**
   - Перейдите на https://dashboard.render.com
   - Выберите ваш сервис `ilternativa-website`

2. **Перейдите в Settings**
   - В левом меню выберите "Settings"

3. **Найдите раздел "Build & Deploy"**
   - Прокрутите до секции "Build Command"

4. **Измените Build Command на:**
   ```
   npm install && cd client && npm install && npm run build && cd ..
   ```

5. **Сохраните изменения**
   - Нажмите "Save Changes"
   - Render автоматически запустит новый деплой

## Альтернативный вариант Build Command:
Если первый вариант не работает, попробуйте:
```
npm install && npm run client-install && npm run client-build
```

## Проверка:
В логах сборки вы должны увидеть:
- Installing server dependencies...
- Installing client dependencies...
- Building React app...
- Creating an optimized production build...

## Важно:
- Убедитесь, что Start Command остается: `node server.js`
- НЕ меняйте его на `npm start` или другие варианты
