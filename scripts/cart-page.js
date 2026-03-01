/**
 * Cart Page Enhanced Functionality
 * Provides additional features specifically for the cart.html pag            <button class="remove-item-btn" data-item-id="${item.id}" title="Úplne odstrániť z košíka">×</button>
 */

class CartPageManager {
  constructor() {
    this.cart = null;
    this.currentLanguage = localStorage.getItem('siteLang') || 'sk';    this.discountCodes = {
      'START5': { 
        percentage: 5, 
        descriptionKey: 'promo_start5_desc'
      },
      'SAVE10': { 
        percentage: 10, 
        descriptionKey: 'promo_save10_desc'
      }
    };
    this.appliedDiscount = null;
  }  init() {
    // Wait for main.js to load and initialize cart
    if (typeof cart !== 'undefined' && cart) {
      this.cart = cart; // Используем существующий экземпляр корзины
      this.setupEventListeners();
      this.renderCartPage();
      this.setupDiscountSystem();
    } else {
      // Retry after a short delay if cart is not yet available
      console.log('🔄 Ожидание инициализации корзины...');
      setTimeout(() => this.init(), 100);
    }
  }
  setupEventListeners() {    // Quantity change buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.quantity-btn')) {
        const action = e.target.dataset.action;
        const itemId = e.target.closest('.cart-item').dataset.itemId;
        this.handleQuantityChange(itemId, action);
      }
      
      // Remove item buttons
      if (e.target.matches('.remove-item-btn')) {
        const itemId = e.target.dataset.itemId;
        this.handleRemoveItem(itemId);
      }
    });

    // Discount code application
    const applyDiscountBtn = document.getElementById('applyDiscount');
    if (applyDiscountBtn) {
      applyDiscountBtn.addEventListener('click', () => this.applyDiscountCode());
    }

    // Discount code input enter key
    const discountInput = document.getElementById('discountCode');
    if (discountInput) {
      discountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.applyDiscountCode();
        }
      });
    }    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.proceedToCheckout());
    }    // Clear cart button on page
    const clearCartPageBtn = document.getElementById('clearCartPage');
    if (clearCartPageBtn) {
      clearCartPageBtn.addEventListener('click', () => {
        if (confirm(this.getTranslation('cart_confirm_clear'))) {
          this.cart.clearCart();
          this.appliedDiscount = null; // Сбрасываем скидку
          this.renderCartPage();
        }
      });
    }

    // Continue shopping button
    const continueShoppingBtn = document.getElementById('continueShopping');
    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener('click', () => {
        window.location.href = 'index.html#package-builder';
      });
    }    // Language change detection
    document.addEventListener('languageChanged', (e) => {
      this.currentLanguage = e.detail.language;
      this.updateDiscountMessages();
      this.updateCheckoutModalLanguage();
    });
  }  renderCartPage() {
    const cartItems = this.cart.getItems();
    const activeItems = cartItems.filter(item => item.quantity > 0);
    const cartItemsContainer = document.getElementById('cartItemsList');
    const emptyCartMessage = document.getElementById('emptyCartPageMessage');
    const cartContent = document.querySelector('.cart-content-wrapper');
    const summarySection = document.querySelector('.cart-summary-section');

    if (activeItems.length === 0) {
      this.showEmptyCartState();
      return;
    }

    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';
    if (summarySection) summarySection.style.display = 'block';

    if (cartItemsContainer) {
      // Показываем все элементы, включая с количеством 0
      cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item ${item.quantity === 0 ? 'cart-item-zero' : ''}" data-item-id="${item.id}">
          <div class="cart-item-info">
            <h3 class="cart-item-name">${this.getTranslatedServiceName(item.name)}</h3>
            <p class="cart-item-price">${item.price}€</p>
          </div>
          <div class="cart-item-controls">
            <div class="quantity-controls">
              <button class="quantity-btn" data-action="decrease" ${item.quantity === 0 ? 'disabled' : ''}>-</button>
              <span class="quantity-display">${item.quantity}</span>
              <button class="quantity-btn" data-action="increase">+</button>
            </div>
            <button class="remove-item-btn" data-item-id="${item.id}" title="Odstrániť z košíka">×</button>
          </div>
        </div>
      `).join('');
    }

    this.updateCartSummary();
    this.animateSummaryCard();
  }

  // Notification system
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-weight: 500;">${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="background: rgba(0,0,0,0.1); border: none; font-size: 18px; cursor: pointer; color: #666; margin-left: 15px; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;" onmouseover="this.style.background='rgba(0,0,0,0.2)'" onmouseout="this.style.background='rgba(0,0,0,0.1)'">&times;</button>
      </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
  // Enhanced quantity change with animation
  handleQuantityChange(itemId, action) {
    const item = this.cart.getItems().find(item => item.id === itemId);
    if (!item) return;

    const quantityElement = document.querySelector(`[data-item-id="${itemId}"] .quantity-display`);
    const decreaseBtn = document.querySelector(`[data-item-id="${itemId}"] .quantity-btn[data-action="decrease"]`);
    const cartItemElement = document.querySelector(`[data-item-id="${itemId}"]`);
    
    if (action === 'increase') {
      this.cart.updateQuantity(itemId, item.quantity + 1);
      // Убираем класс zero если был
      if (cartItemElement) {
        cartItemElement.classList.remove('cart-item-zero');
      }
      // Включаем кнопку минус
      if (decreaseBtn) {
        decreaseBtn.disabled = false;
      }
    } else if (action === 'decrease') {
      const newQuantity = Math.max(0, item.quantity - 1);
      this.cart.updateQuantity(itemId, newQuantity);
      
      // Если количество стало 0
      if (newQuantity === 0) {
        if (cartItemElement) {
          cartItemElement.classList.add('cart-item-zero');
        }
        if (decreaseBtn) {
          decreaseBtn.disabled = true;
        }        this.resetServiceButton(itemId);
        const notificationText = `${item.name} ${this.getTranslation('notification_quantity_set_zero')}`;
        this.showNotification(notificationText, 'info');
      }
    }

    // Animate quantity change
    if (quantityElement) {
      quantityElement.style.transform = 'scale(1.2)';
      quantityElement.style.color = '#7f3cfc';
      setTimeout(() => {
        quantityElement.style.transform = 'scale(1)';
        quantityElement.style.color = '#333';
      }, 200);
    }    this.renderCartPage();
  }
  // Анимация стеклянной панели при изменениях
  animateSummaryCard() {
    const summaryCard = document.querySelector('.cart-summary-card');
    if (summaryCard) {
      summaryCard.style.transform = 'scale(0.98)';
      summaryCard.style.transition = 'all 0.2s ease';
      setTimeout(() => {
        summaryCard.style.transform = 'scale(1)';
      }, 100);
    }
  }
  // Анимация изменения размера стеклянной панели при удалении
  animateSummaryCardResize() {
    const summaryCard = document.querySelector('.cart-summary-card');
    if (summaryCard) {
      // Добавляем класс для анимации
      summaryCard.classList.add('updating');
      
      // Более выраженная анимация сжатия
      summaryCard.style.transform = 'scale(0.92)';
      summaryCard.style.opacity = '0.7';
      
      setTimeout(() => {
        summaryCard.style.transform = 'scale(1.03)';
        summaryCard.style.opacity = '1';
      }, 150);
      
      setTimeout(() => {
        summaryCard.style.transform = 'scale(1)';
        summaryCard.classList.remove('updating');
      }, 350);
    }
  }

  // Enhanced remove item with confirmation
  handleRemoveItem(itemId) {
    const item = this.cart.getItems().find(item => item.id === itemId);
    if (!item) return;    // Show confirmation
    const confirmMessage = this.getTranslation('cart_confirm_remove').replace('{item}', item.name);
    if (confirm(confirmMessage)) {this.cart.removeItem(itemId);
      const notificationText = `${item.name} ${this.getTranslation('notification_item_removed')}`;
      this.showNotification(notificationText, 'success');
      
      // Reset package builder button state for this item
      this.resetServiceButton(itemId);
        // Animate item removal
      const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
      if (itemElement) {
        itemElement.style.transform = 'translateX(-100%)';
        itemElement.style.opacity = '0';
        itemElement.style.transition = 'all 0.3s ease';
        
        // Анимация сжатия стеклянной панели
        this.animateSummaryCardResize();
        
        setTimeout(() => {
          this.renderCartPage();
        }, 300);
      } else {
        this.renderCartPage();
      }
    }
  }  setupDiscountSystem() {
    // Create discount suggestions
    const discountSuggestions = document.getElementById('discountSuggestions');
    if (discountSuggestions) { 
      // Скрываем промокоды
      discountSuggestions.style.display = 'none';
    }
  }

  fillDiscountCode(code) {
    const discountInput = document.getElementById('discountCode');
    if (discountInput) {
      discountInput.value = code;
    }
  }

  applyDiscountCode() {
    const discountInput = document.getElementById('discountCode');
    const discountMessage = document.getElementById('discountMessage');
    
    if (!discountInput || !discountMessage) return;

    const code = discountInput.value.trim().toUpperCase();
    
    if (!code) {
      this.showDiscountMessage(this.getTranslation('cart_discount_empty'), 'error');
      return;
    }

    if (this.discountCodes[code]) {
      this.appliedDiscount = {
        code: code,
        ...this.discountCodes[code]
      };
      this.showDiscountMessage(
        `${this.getTranslation('cart_discount_applied')}: ${this.appliedDiscount.percentage}%`, 
        'success'
      );
      this.updateCartSummary();
      discountInput.value = '';
    } else {
      this.showDiscountMessage(this.getTranslation('cart_discount_invalid'), 'error');
    }
  }

  showDiscountMessage(message, type) {
    const discountMessage = document.getElementById('discountMessage');
    if (discountMessage) {
      discountMessage.textContent = message;
      discountMessage.className = `discount-message ${type}`;
      discountMessage.style.display = 'block';
      
      setTimeout(() => {
        discountMessage.style.display = 'none';
      }, 3000);
    }
  }  updateCartSummary() {
    const subtotal = this.cart.getTotal();
    const subtotalElement = document.getElementById('cartSubtotal');
    const discountElement = document.getElementById('cartDiscount');
    const totalElement = document.getElementById('cartPageTotal');

    if (subtotalElement) {
      subtotalElement.textContent = `${subtotal}€`;
    }

    // Применяем скидку если она есть
    let discountAmount = 0;
    let finalTotal = subtotal;
    
    if (this.appliedDiscount) {
      discountAmount = Math.round((subtotal * this.appliedDiscount.percentage / 100) * 100) / 100;
      finalTotal = Math.round((subtotal - discountAmount) * 100) / 100;
    }
    
    if (discountElement) {
      if (discountAmount > 0) {
        discountElement.textContent = `-${discountAmount}€`;
        discountElement.style.display = 'block';
      } else {
        discountElement.style.display = 'none';
      }
    }

    // Отображаем итоговую сумму с учетом скидки
    if (totalElement) {
      totalElement.textContent = `${finalTotal}€`;
    }

    // Update checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    // Проверяем что есть товары с количеством больше 0
    const hasValidItems = this.cart.getItems().some(item => item.quantity > 0);
    if (checkoutBtn && hasValidItems) {
      checkoutBtn.disabled = false;
      checkoutBtn.textContent = `${this.getTranslation('cart_checkout')} (${finalTotal}€)`;
    } else if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = this.getTranslation('cart_checkout');
    }
    
    // Анимируем панель при обновлении итогов
    this.animateSummaryCard();
  }
  proceedToCheckout() {
    const cartItems = this.cart.getItems().filter(item => item.quantity > 0);
    if (cartItems.length === 0) {
      alert(this.getTranslation('cart_empty_checkout'));
      return;
    }    // Prepare checkout data
    const subtotal = this.cart.getTotal();
    let discountAmount = 0;
    let finalTotal = subtotal;
    
    if (this.appliedDiscount) {
      discountAmount = Math.round((subtotal * this.appliedDiscount.percentage / 100) * 100) / 100;
      finalTotal = Math.round((subtotal - discountAmount) * 100) / 100;
    }
    
    const checkoutData = {
      items: cartItems,
      subtotal: subtotal,
      discountCode: this.appliedDiscount?.code || null,
      discountAmount: discountAmount,
      total: finalTotal,
      timestamp: new Date().toISOString()
    };

    // Store checkout data for the next step
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

    // Show checkout form or redirect to checkout page
    this.showCheckoutForm(checkoutData);
  }

  showCheckoutForm(checkoutData) {
    // Create and show checkout modal or form
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal';
    checkoutModal.innerHTML = `
      <div class="checkout-content">
        <div class="checkout-header">
          <h2>${this.getTranslation('checkout_title')}</h2>
          <button class="close-checkout">&times;</button>
        </div>
        <form class="checkout-form" id="checkoutForm">
          <div class="form-section">
            <h3>${this.getTranslation('checkout_contact_info')}</h3>            <div class="form-row">
              <input type="text" name="firstName" placeholder="${this.getTranslation('checkout_first_name')}" required>
              <input type="text" name="lastName" placeholder="${this.getTranslation('checkout_last_name')}" required>
            </div>
            <input type="email" name="email" placeholder="${this.getTranslation('checkout_email')}" required>
            <input type="tel" name="phone" placeholder="${this.getTranslation('checkout_phone')}">
          </div>
          
          <div class="form-section">
            <h3>${this.getTranslation('checkout_company_info')}</h3>
            <input type="text" name="company" placeholder="${this.getTranslation('checkout_company')}">
            <textarea name="message" placeholder="${this.getTranslation('checkout_message')}" rows="4"></textarea>
          </div>

          <div class="checkout-summary">
            <h3>${this.getTranslation('cart_order_summary')}</h3>            <div class="summary-line">
              <span>${this.getTranslation('cart_subtotal')}:</span>
              <span>${checkoutData.subtotal}€</span>
            </div>
            ${checkoutData.discountAmount > 0 ? `
              <div class="summary-line discount">
                <span>${this.getTranslation('cart_discount')} (${checkoutData.discountCode}):</span>
                <span>-${checkoutData.discountAmount}€</span>
              </div>
            ` : ''}
            <div class="summary-line total">
              <span>${this.getTranslation('cart_total')}:</span>
              <span>${checkoutData.total}€</span>
            </div>
          </div>

          <button type="submit" class="submit-order-btn">${this.getTranslation('checkout_submit_order')}</button>
        </form>
      </div>
    `;

    document.body.appendChild(checkoutModal);

    // Setup checkout form events
    const closeBtn = checkoutModal.querySelector('.close-checkout');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(checkoutModal);
    });

    const checkoutForm = checkoutModal.querySelector('#checkoutForm');
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitOrder(checkoutForm, checkoutData);
    });

    // Close on outside click
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) {
        document.body.removeChild(checkoutModal);
      }
    });
  }  async submitOrder(form, checkoutData) {
    // Validate form data
    const validationErrors = this.validateForm(form);
    if (!this.showFormErrors(validationErrors)) {
      return; // Stop if validation fails
    }

    const formData = new FormData(form);
    const orderData = {
      ...checkoutData,
      customer: {
        firstName: formData.get('firstName')?.trim(),
        lastName: formData.get('lastName')?.trim(),
        email: formData.get('email')?.trim(),
        phone: formData.get('phone')?.trim(),
        company: formData.get('company')?.trim() || null,
        message: formData.get('message')?.trim() || null
      },
      orderId: 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };    // Show loading state with animation
    const submitBtn = form.querySelector('.submit-order-btn');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.textContent = this.currentLanguage === 'sk' ? 'Spracovávanie objednávky...' : 'Processing order...';
    submitBtn.disabled = true;

    try {
      // Try to send to backend API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });      if (response.ok) {
        const result = await response.json();
        console.log('Order submitted successfully:', result);
        
        // Clear cart after successful order
        this.cart.clearCart();
        
        // Show success notification
        this.showNotification(this.getTranslation('notification_order_sent_success'), 'success');
        
        // Show success confirmation
        this.showOrderConfirmation(orderData);
      } else {
        throw new Error('Server responded with error: ' + response.status);
      }} catch (error) {
      console.warn('Backend not available, using local storage:', error);
      
      // Fallback: store locally and show confirmation
      const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      orders.push(orderData);
      localStorage.setItem('orderHistory', JSON.stringify(orders));
        // Send to Telegram (primary notification method)
      const telegramSent = await this.sendToTelegram(orderData);
      if (telegramSent) {
        console.log('✅ Order notification sent to Telegram');
        this.showNotification(this.getTranslation('notification_order_sent_telegram'), 'success');
      } else {
        console.warn('⚠️ Failed to send to Telegram, trying email fallback');
        this.showNotification(this.getTranslation('notification_telegram_error'), 'error');
        // Send email via EmailJS as fallback
        this.sendEmailFallback(orderData);
      }
      
      // Clear cart after successful order
      this.cart.clearCart();
      
      // Show success confirmation
      this.showOrderConfirmation(orderData);
    }

    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }  async sendToTelegram(orderData) {
    // Check if Telegram config is available
    if (typeof TELEGRAM_CONFIG === 'undefined') {
      console.warn('❌ Telegram config not loaded. Please include telegram-config.js');
      return false;
    }

    const { BOT_TOKEN, CHAT_ID, API_URL, MESSAGE_OPTIONS } = TELEGRAM_CONFIG;
    
    // Validate configuration
    if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
      console.warn('❌ Telegram Bot Token not configured. Please set up your bot token in telegram-config.js');
      return false;
    }
    
    if (!CHAT_ID || CHAT_ID === 'YOUR_CHAT_ID_HERE') {
      console.warn('❌ Telegram Chat ID not configured. Please set up your chat ID in telegram-config.js');
      return false;
    }
    
    try {
      // Format order message for Telegram
      const orderMessage = this.formatTelegramMessage(orderData);
      
      // Send to Telegram
      const telegramUrl = `${API_URL}${BOT_TOKEN}/sendMessage`;
      
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: orderMessage,
          ...MESSAGE_OPTIONS
        })
      });

      if (response.ok) {
        console.log('✅ Order sent to Telegram successfully!');
        return true;
      } else {
        const error = await response.json();
        console.error('❌ Telegram API Error:', error);
        return false;
      }
      
    } catch (error) {
      console.error('❌ Failed to send to Telegram:', error);
      return false;
    }
  }
  formatTelegramMessage(orderData) {
    const emojis = TELEGRAM_CONFIG?.EMOJIS || {
      new_order: '🛒', customer: '👤', items: '📦', 
      price: '💰', message: '💬', time: '⏰'
    };

    const items = orderData.items.map(item => 
      `• <b>${item.name}</b> - ${item.price}€ ${item.quantity > 1 ? `<i>(Qty: ${item.quantity})</i>` : ''}`
    ).join('\n');    const discountInfo = orderData.discountAmount > 0 
      ? `• Скидка (<code>${orderData.discountCode}</code>): -${orderData.discountAmount}€\n` 
      : '';

    const companyInfo = orderData.customer.company 
      ? `• Компания: <i>${orderData.customer.company}</i>\n` 
      : '';

    const messageInfo = orderData.customer.message 
      ? `\n${emojis.message} <b>Сообщение от клиента:</b>\n<i>${orderData.customer.message}</i>\n` 
      : '';

    return `
${emojis.new_order} <b>НОВЫЙ ЗАКАЗ #${orderData.orderId}</b>

${emojis.customer} <b>Информация о клиенте:</b>
• Имя: <b>${orderData.customer.firstName} ${orderData.customer.lastName}</b>
• Email: <code>${orderData.customer.email}</code>
• Телефон: <code>${orderData.customer.phone || 'Не указан'}</code>
${companyInfo}
${emojis.items} <b>Состав заказа:</b>
${items}

${emojis.price} <b>Расчет стоимости:</b>
• Подытог: <b>${orderData.subtotal}€</b>
${discountInfo}• <b>Итого к оплате: ${orderData.total}€</b>
${messageInfo}
${emojis.time} <i>Заказ оформлен: ${new Date(orderData.timestamp).toLocaleString('ru-RU', {
  year: 'numeric',
  month: '2-digit', 
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})}</i>

<i>Обработайте заказ в кратчайшие сроки!</i>
    `.trim();
  }

  showOrderConfirmation(orderData) {
    // Remove checkout modal
    const checkoutModal = document.querySelector('.checkout-modal');
    if (checkoutModal) {
      document.body.removeChild(checkoutModal);
    }

    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
      <div class="success-content">
        <div class="success-icon">✓</div>
        <h2>${this.getTranslation('order_success_title')}</h2>
        <p>${this.getTranslation('order_success_message')}</p>
        <div class="order-details">
          <p><strong>${this.getTranslation('order_id')}:</strong> ${orderData.orderId}</p>
          <p><strong>${this.getTranslation('order_total')}:</strong> ${orderData.total}€</p>
        </div>
        <div class="success-actions">
          <button onclick="window.location.href='index.html'" class="btn-primary">${this.getTranslation('back_to_home')}</button>
        </div>
      </div>
    `;

    document.body.appendChild(successModal);

    // Auto remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(successModal)) {
        document.body.removeChild(successModal);
        window.location.href = 'index.html';
      }
    }, 10000);
  }

  getTranslatedServiceName(serviceName) {
    // Map service names to translation keys
    const serviceMap = {
      'SEO Optimalizácia': 'service_seo',
      'Social Media Marketing': 'service_smm',
      'PPC Reklama': 'service_ppc',
      'Content Marketing': 'service_content',
      'Email Marketing': 'service_email',
      'Web Analytics': 'service_analytics',
      'Brand Marketing': 'service_brand',
      'Influencer Marketing': 'service_influencer'
    };

    const translationKey = serviceMap[serviceName];
    return translationKey ? this.getTranslation(translationKey) : serviceName;
  }

  getTranslation(key) {
    // Use the global translations object from main.js
    if (typeof translations !== 'undefined' && translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
      return translations[this.currentLanguage][key];
    }
    return key; // Fallback to key if translation not found
  }
  updateDiscountMessages() {
    // Update any displayed discount messages when language changes
    const discountSuggestions = document.getElementById('discountSuggestions');
    if (discountSuggestions) { // Показываем всегда для диапазонов
      this.setupDiscountSystem();
    }
  }

  // Show enhanced empty cart state
    showEmptyCartState() {
    const emptyCartMessage = document.getElementById('emptyCartPageMessage');
    const cartContent = document.querySelector('.cart-content-wrapper');
    const summarySection = document.querySelector('.cart-summary-section');
    
    if (cartContent) cartContent.style.display = 'none';
    
    // Скрываем или обнуляем панель итогов
    if (summarySection) {
      summarySection.style.display = 'none';
    }
    
    // Обнуляем все суммы
    const subtotalElement = document.getElementById('cartSubtotal');
    const discountElement = document.getElementById('cartDiscount');
    const totalElement = document.getElementById('cartPageTotal');
    
    if (subtotalElement) subtotalElement.textContent = '0€';
    if (discountElement) discountElement.textContent = '0€';
    if (totalElement) totalElement.textContent = '0€';
    
    // Сбрасываем скидку
    this.appliedDiscount = null;
    const discountCode = document.getElementById('discountCode');
    if (discountCode) discountCode.value = '';
    
    if (emptyCartMessage) {
      emptyCartMessage.style.display = 'block';
      emptyCartMessage.innerHTML = `
        <div class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <h2>${this.currentLanguage === 'sk' ? 'Váš košík je prázdny' : 'Your cart is empty'}</h2>
          <p>${this.currentLanguage === 'sk' ? 
            'Zatiaľ ste nepridali žiadne služby do košíka. Vráťte sa na hlavnú stránku a vyberte si zo širokeho spektra marketingových služieb.' : 
            'You haven\'t added any services to your cart yet. Go back to the main page and choose from our wide range of marketing services.'
          }</p>
          <a href="index.html#packages" class="back-to-shop-btn">
            ${this.currentLanguage === 'sk' ? 'Prejsť na služby' : 'Browse Services'}
          </a>
        </div>
      `;
    }
  }

  // Validation helper methods
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  validateForm(form) {
    const formData = new FormData(form);
    const errors = [];    // Required fields validation
    const firstName = formData.get('firstName')?.trim();
    const lastName = formData.get('lastName')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();

    if (!firstName) errors.push('First name is required');
    if (!lastName) errors.push('Last name is required');
    if (!email) errors.push('Email is required');

    // Email validation
    if (email && !this.validateEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    // Phone validation
    if (phone && !this.validatePhone(phone)) {
      errors.push('Please enter a valid phone number');
    }

    return errors;
  }

  showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());

    if (errors.length > 0) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'form-error';
      errorDiv.innerHTML = `
        <div class="error-message">
          <h4>Please fix the following errors:</h4>
          <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
          </ul>
        </div>
      `;

      const form = document.getElementById('checkoutForm');
      form.insertBefore(errorDiv, form.firstChild);
      
      // Scroll to top of form
      errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      return false;    }
    return true;
  }

  // Reset service button state when item is removed from cart
  resetServiceButton(serviceId) {
    // Find the service button in package builder
    const serviceButton = document.querySelector(`[data-service-id="${serviceId}"] .add-service-btn`);
    if (serviceButton) {
      serviceButton.disabled = false;
      serviceButton.textContent = '+';
      serviceButton.style.background = ''; // Remove green color
      
      const serviceElement = serviceButton.closest('.builder-service');
      if (serviceElement) {
        serviceElement.classList.remove('disabled');
      }
      
      console.log(`Service button reset for service ID: ${serviceId}`);
    }
    
    // Also check for package buttons if this is a package
    const packageButton = document.querySelector(`[data-package="${serviceId}"] .package-btn`);
    if (packageButton) {
      packageButton.disabled = false;
      packageButton.textContent = packageButton.getAttribute('data-original-text') || 'Pridať balíček do košíka';
      packageButton.style.background = '';
        console.log(`Package button reset for package: ${serviceId}`);
    }
  }

  // Обновление языка в модальном окне checkout
  updateCheckoutModalLanguage() {
    const checkoutModal = document.querySelector('.checkout-modal');
    if (!checkoutModal) return; // Модальное окно не открыто

    // Обновляем заголовок
    const title = checkoutModal.querySelector('.checkout-header h2');
    if (title) {
      title.textContent = this.getTranslation('checkout_title');
    }

    // Обновляем заголовки секций
    const contactHeader = checkoutModal.querySelector('.form-section h3');
    if (contactHeader) {
      contactHeader.textContent = this.getTranslation('checkout_contact_info');
    }

    const companyHeader = checkoutModal.querySelectorAll('.form-section h3')[1];
    if (companyHeader) {
      companyHeader.textContent = this.getTranslation('checkout_company_info');
    }

    // Обновляем placeholder'ы для полей ввода
    const firstNameInput = checkoutModal.querySelector('input[name="firstName"]');
    if (firstNameInput) {
      firstNameInput.placeholder = this.getTranslation('checkout_first_name');
    }

    const lastNameInput = checkoutModal.querySelector('input[name="lastName"]');
    if (lastNameInput) {
      lastNameInput.placeholder = this.getTranslation('checkout_last_name');
    }

    const emailInput = checkoutModal.querySelector('input[name="email"]');
    if (emailInput) {
      emailInput.placeholder = this.getTranslation('checkout_email');
    }

    const phoneInput = checkoutModal.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.placeholder = this.getTranslation('checkout_phone');
    }

    const companyInput = checkoutModal.querySelector('input[name="company"]');
    if (companyInput) {
      companyInput.placeholder = this.getTranslation('checkout_company');
    }

    const messageTextarea = checkoutModal.querySelector('textarea[name="message"]');
    if (messageTextarea) {
      messageTextarea.placeholder = this.getTranslation('checkout_message');
    }

    // Обновляем заголовок суммы заказа
    const summaryTitle = checkoutModal.querySelector('.checkout-summary h3');
    if (summaryTitle) {
      summaryTitle.textContent = this.getTranslation('cart_order_summary');
    }

    // Обновляем текст кнопки отправки
    const submitBtn = checkoutModal.querySelector('.submit-order-btn');
    if (submitBtn && !submitBtn.classList.contains('loading')) {
      submitBtn.textContent = this.getTranslation('checkout_submit_order');
    }    // Обновляем текст в summary-line (Medzisúčet, Zľava, Celkom)
    const summaryLines = checkoutModal.querySelectorAll('.summary-line span:first-child');
    if (summaryLines.length >= 2) {
      summaryLines[0].textContent = this.getTranslation('cart_subtotal') + ':';
      summaryLines[summaryLines.length - 1].textContent = this.getTranslation('cart_total') + ':';
    }

    // Обновляем discount line если есть
    const discountLine = checkoutModal.querySelector('.summary-line.discount span:first-child');
    if (discountLine) {
      const discountCode = discountLine.textContent.match(/\(([^)]+)\)/)?.[1] || '';      discountLine.textContent = `${this.getTranslation('cart_discount')} (${discountCode}):`;
    }
  }

  // Функция для получения переводов
  getTranslation(key) {
    // Используем переменную translations из main.js
    if (typeof translations !== 'undefined' && translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
      return translations[this.currentLanguage][key];
    }
    
    // Fallback к словацкому, если перевод не найден
    if (typeof translations !== 'undefined' && translations['sk'] && translations['sk'][key]) {
      return translations['sk'][key];
    }
    
    // Если ничего не найдено, возвращаем сам ключ
    return key;
  }
}

// Initialize cart page manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Даем время main.js инициализировать корзину
  setTimeout(() => {
    window.cartPageManager = new CartPageManager();
    window.cartPageManager.init();
  }, 200);
});

// Export for global access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CartPageManager;
}
