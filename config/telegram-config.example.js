/**
 * 🎯 ПРИМЕР РАБОЧЕЙ КОНФИГУРАЦИИ TELEGRAM
 * 
 * ⚠️  ВНИМАНИЕ: Это только пример! 
 * Не используйте эти данные в продакшене!
 * 
 * Замените на ваши реальные данные:
 * 1. Создайте бота через @BotFather
 * 2. Получите ваш Chat ID
 * 3. Замените значения ниже
 */

const TELEGRAM_CONFIG = {
  // 🤖 Токен бота (получите от @BotFather)
  // Пример: '123456789:ABCdefGhIJKlmnoPQRsTUVwxyzAbCdEf'
  BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
  
  // 💬 ID чата (ваш личный Chat ID или группы)
  // Пример: '123456789' или '-100123456789' для группы
  CHAT_ID: 'YOUR_CHAT_ID_HERE',
  
  // 🌐 URL API Telegram (не изменяйте)
  API_URL: 'https://api.telegram.org/bot',
  
  // ⚙️ Настройки форматирования сообщений
  MESSAGE_OPTIONS: {
    parse_mode: 'HTML',
    disable_web_page_preview: true
  },
  
  // 😊 Эмодзи для разных типов уведомлений
  EMOJIS: {
    new_order: '🛒',
    customer: '👤',
    items: '📦',
    price: '💰',
    message: '💬',
    time: '⏰',
    success: '✅',
    error: '❌'
  }
};

/**
 * 📋 ИНСТРУКЦИЯ ПО НАСТРОЙКЕ:
 * 
 * 1. Создание бота:
 *    - Откройте Telegram
 *    - Найдите @BotFather
 *    - Отправьте /newbot
 *    - Следуйте инструкциям
 *    - Скопируйте токен
 * 
 * 2. Получение Chat ID:
 *    - Отправьте сообщение вашему боту
 *    - Откройте: https://api.telegram.org/botВАШ_ТОКЕН/getUpdates
 *    - Найдите "chat":{"id":ЧИСЛО} - это ваш Chat ID
 * 
 * 3. Настройка:
 *    - Замените YOUR_BOT_TOKEN_HERE на ваш токен
 *    - Замените YOUR_CHAT_ID_HERE на ваш Chat ID
 * 
 * 4. Тестирование:
 *    - Откройте telegram-helper.html для тестирования
 *    - Или используйте test.html для проверки интеграции
 */

// Экспорт конфигурации
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TELEGRAM_CONFIG;
} else {
  window.TELEGRAM_CONFIG = TELEGRAM_CONFIG;
}

/**
 * 🔒 БЕЗОПАСНОСТЬ:
 * 
 * - Никогда не публикуйте токен бота в открытых репозиториях
 * - Добавьте этот файл в .gitignore
 * - Для продакшена используйте переменные окружения
 * - Регулярно обновляйте токены
 */
