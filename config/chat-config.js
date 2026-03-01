/**
 * 🌐 КОНФИГУРАЦИЯ CHAT API
 * 
 * Замените на адрес вашего VPS сервера:
 * - Для локальной разработки: 'http://localhost:8081'
 * - Для продакшена: 'http://your-vps-ip:8081'
 */

const CHAT_CONFIG = {
  // 🔧 Адрес сервера чата
  SERVER_URL: 'http://localhost:8081',
  
  // 📡 Endpoints
  SEND_MESSAGE: '',
  GET_REPLIES: '/get-replies',
  
  // ⏱️ Настройки polling
  POLLING_INTERVAL: 5000, // 5 секунд
  
  // 🕐 Рабочие часы (по времени Братиславы)
  WORKING_HOURS: {
    START: 7,  // 7:00
    END: 20    // 20:00 (8 PM)
  }
};

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CHAT_CONFIG;
}
