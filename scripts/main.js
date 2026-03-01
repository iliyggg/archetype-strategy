// scripts/main.js
"use strict";

// Функция для фиксации карусели пакетов
function initPackagesCarousel() {
  const packagesGrid = document.querySelector('.packages-grid');
  if (!packagesGrid || window.innerWidth > 768) return;
  
  // Сбрасываем прокрутку в начало
  packagesGrid.scrollLeft = 0;
  
  // УБИРАЕМ СОЗДАНИЕ ТОЧЕК-ИНДИКАТОРОВ
  // Удаляем старые индикаторы если они есть
  const oldIndicators = document.querySelector('.package-indicators');
  if (oldIndicators) {
    oldIndicators.remove();
    }
}

// Переводы для всех языков
const translations = {
  'sk': {
    // Навигация
    'nav_about': 'O nás',
    'nav_advantages': 'Výhody',
    'nav_packages': 'Balíčky služieb',
    'nav_services': 'Služby',
    'nav_package_builder': 'Vytvoriť balíček',
    'nav_contacts': 'Kontakty',
    
    // Главная секция
    'hero_title': 'Kompletný cyklus digitálneho marketingu',
    'hero_subtitle': 'Rozvíjame značky, zvyšujeme zisky a rozširujeme váš biznis na internete.',
    'hero_cta': 'Podať žiadosť',    
    // Преимущества
    'featured_title': 'Naše výhody',
    'featured_desc': 'Používame moderné nástroje a individuálny prístup na vyzdvihnutie vašej značky na trhu.',
    
    // О нас
    'about_title': 'O nás',
    'about_text': 'Sme moderná agentúra, ktorá pomáha firmám rásť. Náš tím expertov v digitálnom marketingu, dizajne a webovom vývoji analyzuje trh a ponúka optimálne riešenia pre váš úspech.',
    'about_highlight1_title': 'Prístup 360°',
    'about_highlight1_text': 'Všetky kanály propagácie: SEO, kontext, SMM, email a mnoho ďalšieho.',
    'about_highlight2_title': 'Moderné nástroje',
    'about_highlight2_text': 'Používame overené služby analýzy a automatizácie.',
    'about_highlight3_title': 'Transparentné reportovanie',
    'about_highlight3_text': 'Jasné reporty, aby ste vždy videli výsledky.',
    
    // Пакеты услуг
    'packages_title': 'Balíčky služieb',    'starter_package': 'Štartovací balíček',
    'growth_package': 'Stredný (Growth) balíček',
    'scale_package': 'Prémiový (Scale) balíček',
    'for_who': 'Pre koho:',    'starter_for_who_text': 'Malé a stredné podniky, ktoré začínajú s digitálnym marketingom.',    'growth_for_who_text': 'Malý a stredný biznis, ktorý chce simultánne rozvíjať značku a testovať rôzne kanály.',
    'scale_for_who_text': 'Spoločnosti s obratom 50–100 tis. eur/mes, ktoré sa snažia o agresívny rast a vstup na nové trhy.',
    'services_included': 'Služby zahrnuté v balíčku:',
    'price': 'Cena:',
    'starter_price': '579 eur/mesiac',    'growth_price': '789 eur/mesiac',
    'scale_price': '999 eur/mesiac',
      
    // Списки услуг в пакетах
    'starter_services': [
      'Nastavenie a vedenie reklamy v jednom kanáli (Google Ads alebo Facebook/Instagram)',
      '– až 4 objekty (text+grafika)',
      '– základný targeting (2–3 publiká)',
      '– optimalizácia 1 raz za týždeň',
      'Vedenie jednej sociálnej siete (Facebook alebo Instagram)',
      '– 2 publikácie za týždeň (8 postov/mes)',
      '– základné úpravy profilu',
      'Integrácia Google Analytics + Tag Manager',
      'Mesačný report kľúčových metrík',
      'Do 3 úprav kampaní/kreatívov',
      'E-mail a messenger podpora'
    ],    // Индивидуальные услуги Growth пакета
    'growth_service_1': 'Reklama v dvoch kanáloch (Google Ads + Facebook/Instagram)',
    'growth_service_2': '– až 6 objektov (text + grafika)',
    'growth_service_3': '– základný + lookalike targeting',
    'growth_service_4': '– optimalizácia 2x týždenne',
    'growth_service_5': 'SMM v dvoch sociálnych sieťach (Facebook a Instagram)',
    'growth_service_6': '– po 3 publikácie týždenne (≈12 postov/mes)',
    'growth_service_7': '– až 6 stories/mesiac',
    'growth_service_8': '– úprava profilu, hashtags',
    'growth_service_9': 'On-page SEO (až 8 kľúčových dopytov)',
    'growth_service_10': '– meta-tagy, štruktúra, základné prepojenia',
    'growth_service_11': 'E-mail marketing',
    'growth_service_12': '– 2 rozosielky/mes, welcome-sekvencia',
    'growth_service_13': 'Integrácia a tracking',
    'growth_service_14': '– Google Analytics, Tag Manager',
    'growth_service_15': 'Mesačný report s odporúčaniami',
    'growth_service_16': 'Až 5 úprav textov/kreatívov',
    'growth_service_17': 'E-mail a messenger podpora',
      'growth_services': [
      'Reklama v dvoch kanáloch (Facebook/Instagram a Google Ads)',
      '– Vypracovanie až 6 reklám (text + grafika) a A/B-testy kreatív',
      '– Targeting: základné + look-a-like publiká',
      '– Optimalizácia kampaní 2x týždenne (stavky, rozpočty, vylúčenia)',
      'SMM v dvoch sociálnych sieťach (Facebook a/alebo Instagram)',
      '– 3 príspevky v každej sieti týždenne (≈12 príspevkov/mes)',
      '– 8–10 stories alebo relevantných krátkych formátov',
      '– Nastavenie hlavičky profilu, výber hashtagov a obálok',
      'Základná SEO optimalizácia (on-page) až 8 kľúčových dopytov',
      '– Kontrola meta-tagov, štruktúry H1–H3, vnútorného linkovania',
      'E-mail marketing',
      '– Dva newslettery mesačne, šablóna + adaptácia obsahu',
      '– Nastavenie automatickej welcome e-mail sekvencje (1 e-mail)',
      'Integrácie a tracking',
      '– Google Analytics + Google Tag Manager + Facebook Pixel',
      '– Kontrola správnosti UTM-značiek a konverzných cieľov',
      'Mesačný report s analytikou a odporúčaniami',
      '– Základné metriky: ROI, CPL, LTV, CR podľa kanálov',
      '– Písomné závery a kroky na nasledujúci mesiac',
      'Až 5 úprav textov a kreatív počas mesiaca',
      'E-mail a messenger podpora v pracovných hodinách'
    ],
    // Индивидуальные услуги Scale пакета    'scale_service_1': 'Multikanálová reklama (Google Ads + Facebook/Instagram)',
    'scale_service_2': '– až 10 bannerov, 2 videá',
    'scale_service_3': '– A/B-testy kreatívov a publík',
    'scale_service_4': '– optimalizácia kampaní 2x týždenne',
    'scale_service_5': '– lokalizácia pre slovenský trh',
    'scale_service_6': 'SMM v dvoch sieťach (Facebook + Instagram)',
    'scale_service_7': '– 14 publikácií/mes (na oba kanály)',
    'scale_service_8': '– až 8 stories/Reels',
    'scale_service_9': '– moderácia komentárov, úprava profilu',
    'scale_service_10': 'On-page SEO (až 12 kľúčov)',
    'scale_service_11': '– meta-tagy, štruktúra, základná mikroštrukturácia',
    'scale_service_12': 'E-mail marketing',
    'scale_service_13': '– 3 rozosielky/mes',
    'scale_service_14': '– 2 automatické sekvencie (welcome, reaktivácia)',
    'scale_service_15': 'Komplexná analytika',
    'scale_service_16': '– nastavenie GA4, GTM, Facebook Pixel, základný calltracking',
    'scale_service_17': '– kontrola UTM-značiek a cieľov',
    'scale_service_18': 'Reportovanie a podpora',
    'scale_service_19': '– mesačný report',
    'scale_service_20': '– až 8 úprav kreatívov a nastavení',
    'scale_service_21': '– e-mail a messenger podpora',      // Услуги
    'services_title': 'Služby',
    'service_google_ads': 'Kontextová reklama (Google Ads)',
    'service_google_ads_desc': 'Spustenie, vedenie a optimalizácia platenej reklamy vo vyhľadávačoch Google.',
    'service_facebook_ads': 'Cielenou reklama (Facebook, Instagram)',
    'service_facebook_ads_desc': 'Nastavenie a správa reklamy v sociálnych sieťach podľa cieľových skupín.',
    'service_smm_management': 'SMM (vedenie a propagácia sociálnych sietí)',
    'service_smm_management_desc': 'Vývoj obsahu, publikovanie, zapojenie publika a rast sledovateľov v sociálnych sieťach.',
    'service_seo_promotion': 'SEO-propagácia webových stránok',
    'service_seo_promotion_desc': 'Zlepšenie pozícií stránky vo vyhľadávaní Google a prilákanie organickej návštevnosti.',
    'service_email_marketing': 'E-mail marketing',
    'service_email_marketing_desc': 'Tvorba a rozosielanie e-mailov, segmentácia databázy, automatizácia rozosielok.',
    'service_analytics_reporting': 'Analytika a reportovanie',
    'service_analytics_reporting_desc': 'Zber a analýza údajov, príprava pravidelných správ o účinnosti marketingu.',
    'service_landing_creation': 'Tvorba a optimalizácia landingov/webov',
    'service_landing_creation_desc': 'Vývoj jednostránkových webov (landingy) a ich optimalizácia na konverzie. Cena je za jednostránkový.',
    'service_copywriting': 'Copywriting (príspevky, rozosielky, články)',
    'service_copywriting_desc': 'Písanie textov pre weby, sociálne siete, e-mail rozosielky a reklamu.',
    'service_graphic_design': 'Grafický dizajn (bannery, kreatívy)',
    'service_graphic_design_desc': 'Tvorba vizuálnych materiálov pre reklamu, sociálne siete a web.',
    'service_crm_setup': 'Nastavenie CRM / automatizácia marketingu',
    'service_crm_setup_desc': 'Implementácia CRM systémov a automatizácia marketingových procesov.',
    'service_marketing_strategy': 'Príprava a realizácia marketingových stratégií',
    'service_marketing_strategy_desc': 'Vývoj komplexnej stratégie propagácie produktu alebo služby.',
    'service_pr_influencers': 'PR a práca s influencermi',
    'service_pr_influencers_desc': 'Organizácia publikácií v médiách a spolupráca s bloggermi, lídrami názoru.',
    'service_online_events': 'Organizácia a realizácia online podujatí',
    'service_online_events_desc': 'Vedenie webinárov, online prezentácií, akcií.',
    'service_video_production': 'Produkcia videa a motion dizajn',
    'service_video_production_desc': 'Tvorba videí a animovaného obsahu pre reklamu a sociálne siete.',
    'service_photography': 'Fotografovanie pre sociálne siete',
    'service_photography_desc': 'Organizácia a realizácia fotografických sessionov pre obsah a reklamu.',
    'service_branding': 'Vývoj firemného štýlu/brandingu',
    'service_branding_desc': 'Tvorba loga, brandbooku a vizuálnej identity spoločnosti.',
    'service_marketing_audit': 'Marketingový audit/konzultácie',
    'service_marketing_audit_desc': 'Analýza súčasných marketingových procesov a odporúčania na zlepšenie.',
    'service_reputation_management': 'Správa reputácie (ORM)',
    'service_reputation_management_desc': 'Monitorovanie spomenutí spoločnosti a práca s negatívom na internete.',
    'service_review_moderation': 'Monitorovanie a moderovanie recenzií',
    'service_review_moderation_desc': 'Sledovanie a spracovanie recenzií na platformách, operatívna reakcia.',
    'service_presentations': 'Príprava prezentácií, komerčných ponúk',
    'service_presentations_desc': 'Vývoj prezentácií pre stretnutia a predaj, príprava komerčných ponúk.',
    'service_chatbots': 'Vybudovanie a nastavenie chat-botov pre biznis',
    'service_chatbots_desc': 'Tvorba a programovanie chat-botov pre automatizáciu komunikácie.',
    'service_telegram_channels': 'Tvorba a vedenie Telegram kanálov',
    'service_telegram_channels_desc': 'Vývoj obsahu a správa kanálu pre propagáciu značky v Telegrame.',
    'service_messenger_ads': 'Nastavenie a vedenie reklamy v messengeroch',
    'service_messenger_ads_desc': 'Spustenie cielenej reklamy v messengeroch (Telegram, WhatsApp a iné).',
    'service_promotions': 'Príprava a spustenie akcií/žrebovaní',    'service_promotions_desc': 'Organizácia a realizácia promo akcií, súťaží, žrebovaní na prilákanie publika.',
      // Переводы периодов
    'period_month': 'mesiac',
    'period_project': 'projekt',
    'period_piece': 'kus',
    'price_from': 'od',
    
    'services_cta': 'Zistiť viac',
    'services_custom_text': 'Potrebujete niečo špecifické? Vytvorte si vlastný balíček služieb presne podľa vašich potrieb.',
    'services_build_package': 'Vytvoriť vlastný balíček',
      // Package Builder
    'builder_title': 'Vytvorte si vlastný balíček',
    'builder_subtitle': 'Vyberte si služby, ktoré potrebujete, a vytvorte si balíček na mieru',
    'selected_services_title': 'Vybrané služby',
    'available_services_title': 'Dostupné služby',
    'empty_state': 'Zatiaľ ste nevybrali žiadne služby. Kliknite na "+" vedľa služby, ktorú chcete pridať.',    'total_price': 'Celková cena:',    'add_to_cart': 'Pridať do košíka',
    'add_package_to_cart': 'Pridať balíček do košíka',    // Чат
    'chat_title': 'Podporou chat',
    'chat_status_online': 'Online',
    'chat_status_offline': 'Offline',
    'chat_welcome': 'Dobrý deň! Som tu, aby som vám pomohol. Aké máte otázky?',
    'chat_input_placeholder': 'Napíšte správu...',
    'chat_typing': 'Píše...',
    'chat_message_sent': '✅ Správa odoslaná! Čakajte na odpoveď podpory...',
    'chat_message_error': '❌ Chyba pri odosielaní správy. Skúste to neskôr.',
    'chat_support_name': 'Archetype Strategy Podpora',
    
    // Корзина
    'cart_title': 'Košík',
    'cart_empty': 'Váš košík je prázdny',    'cart_total': 'Celkom',
    'cart_clear': 'Vymazať košík',
    'cart_view_full': 'Prejsť na košík',
    'cart_page_title': 'Košík',
    'cart_empty_title': 'Váš košík je prázdny',
    'cart_empty_desc': 'Pridajte služby z nášho Package Builder-a alebo vyberte jeden z hotových balíčkov.',
    'cart_browse_services': 'Prehliadnuť služby',    'cart_summary_title': 'Objednávka',
    'cart_subtotal': 'Medzisúčet',
    'cart_discount': 'Zľava',
    'cart_checkout': 'Objednať služby',
    'cart_contact_title': 'Potrebujete pomoc?',
    'cart_contact_text': 'Kontaktujte nás',
    'cart_confirm_clear': 'Naozaj chcete vymazať všetky položky z košíka?',
    'cart_confirm_remove': 'Naozaj chcete odstrániť "{item}" z košíka?',
    'cart_empty_checkout': 'Košík je prázdny. Pridajte služby pred pokračovaním.',
    'cart_remove_item': 'Odstrániť položku',
    'cart_discount_suggestion': 'Máte zľavový kód? Vyskúšajte jeden z týchto:',
    'cart_discount_empty': 'Zadajte zľavový kód',
    'cart_discount_applied': 'Zľavový kód bol úspešne použitý',
    'cart_discount_invalid': 'Neplatný zľavový kód',
    'promo_start5_desc': '5% zľava pre začínajúcich',
    'promo_save10_desc': '10% zľava na všetky služby',
    'cart_order_summary': 'Prehľad objednávky',
    'checkout_title': 'Dokončenie objednávky',
    'checkout_contact_info': 'Kontaktné údaje',
    'checkout_first_name': 'Meno',
    'checkout_last_name': 'Priezvisko',
    'checkout_email': 'E-mailová adresa',
    'checkout_phone': 'Telefónne číslo',
    'checkout_company_info': 'Informácie o spoločnosti (voliteľné)',
    'checkout_company': 'Názov spoločnosti',
    'checkout_message': 'Správa alebo špeciálne požiadavky',
    'checkout_submit_order': 'Odoslať objednávku',
    'order_success_title': 'Objednávka úspešne odoslaná!',
    'order_success_message': 'Ďakujeme za vašu objednávku. Čoskoro vás budeme kontaktovať.',
    'order_id': 'Číslo objednávky',
    'order_total': 'Celková suma',    'back_to_home': 'Späť na hlavnú stránku',
    
    // Уведомления
    'notification_service_added_single': 'služba bola pridaná do košíka!',
    'notification_service_added_multiple': 'služby boli pridané do košíka!',
    'notification_quantity_set_zero': 'množstvo nastavené na 0',
    'notification_item_removed': 'bol odstránený z košíka',
    'notification_order_sent_success': 'Objednávka bola úspešne odoslaná!',
    'notification_order_sent_telegram': 'Objednávka bola odoslaná cez Telegram!',
    'notification_telegram_error': 'Problém s Telegramom, skúšame email...',
    
    // Переводы для копирайтинга в пакетах (словацкие версии)
    'starter_copywriting': 'Copywriting pre stránku a sociálne siete (základné texty)',
    'growth_copywriting': 'Predajný copywriting pre reklamu, landing pages a email kampane',
    'scale_copywriting': 'Prémiový copywriting: predajné landing pages, sales funnels, skripty pre videá',
      // Контакты
    'contact_title': 'Kontakty',
    'contact_text': 'Kontaktujte nás: <a href="mailto:services@marketing360.sk">services@marketing360.sk</a>',
    'contact_ready': 'Sme pripravení prediskutovať váš projekt a pomôcť dosiahnuť nové výšky!',
    
    // Социальные сети
    'social_telegram': 'Telegram',
    'social_instagram': 'Instagram', 
    'social_facebook': 'Facebook',
    
    'footer_copyright': '© 2025 Archetype Strategy. Všetky práva vyhradené.'
  },
  
  'en': {    // Навигация
    'nav_about': 'About',
    'nav_advantages': 'Advantages',
    'nav_packages': 'Service Packages',
    'nav_services': 'Services',
    'nav_package_builder': 'Build Package',
    'nav_contacts': 'Contacts',
  // Герой-секция
    'hero_title': 'Full Cycle Digital Marketing',
    'hero_subtitle': 'We develop brands, increase profits and scale your business online.',
    'hero_cta': 'Submit Request',
    
    // Преимущества
    'featured_title': 'Our Advantages',
    'featured_desc': 'We use modern tools and an individual approach to make your brand stand out in the market.',
    
    // О нас
    'about_title': 'About Us',
    'about_text': 'We are a modern agency that helps businesses grow. Our team of digital marketing, design and web development experts analyzes the market and offers optimal solutions for your success.',
    'about_highlight1_title': '360° Approach',
    'about_highlight1_text': 'All promotion channels: SEO, context, SMM, email and much more.',
    'about_highlight2_title': 'Modern Tools',
    'about_highlight2_text': 'We use proven analytics and automation services.',
    'about_highlight3_title': 'Transparent Reporting',
    'about_highlight3_text': 'Clear reports so you can always see the results.',
    
    // Пакеты услуг
    'packages_title': 'Service Packages',    'starter_package': 'Starter Package',
    'growth_package': 'Medium (Growth) Package',
    'scale_package': 'Premium (Scale) Package',    'for_who': 'For whom:',
    'services_included': 'Services included in the package:',
    'price': 'Price:',
    'starter_for_who_text': 'Small and medium businesses starting with digital marketing.',    'starter_price': '579 EUR/month',
    'growth_for_who_text': 'Small and medium businesses that want to simultaneously develop their brand and test different channels.',
    'growth_price': '789 EUR/month',
    'scale_for_who_text': 'Companies with turnover 50-100k EUR/month, aiming for aggressive growth and entering new markets.',
    'scale_price': '999 EUR/month',
    
    // Списки услуг в пакетах
    'starter_services': [
      'Setting up and managing advertising in one channel (Google Ads or Facebook/Instagram)',
      '– up to 4 objects (text+graphics)',
      '– basic targeting (2–3 audiences)',
      '– optimization once a week',
      'Managing one social network (Facebook or Instagram)',
      '– 2 publications per week (8 posts/month)',
      '– basic profile customization',
      'Google Analytics + Tag Manager integration',
      'Monthly key metrics report',
      'Up to 3 campaign/creative adjustments',
      'E-mail and messenger support'
    ],
    // Индивидуальные услуги Growth пакета    'growth_service_1': 'Advertising in two channels (Google Ads + Facebook/Instagram)',
    'growth_service_2': '– up to 6 objects (text + graphics)',
    'growth_service_3': '– basic + lookalike targeting',
    'growth_service_4': '– optimization 2x per week',
    'growth_service_5': 'SMM in two social networks (Facebook and Instagram)',
    'growth_service_6': '– 3 publications per week each (≈12 posts/month)',
    'growth_service_7': '– up to 6 stories/month',
    'growth_service_8': '– profile customization, hashtags',
    'growth_service_9': 'On-page SEO (up to 8 key queries)',
    'growth_service_10': '– meta tags, structure, basic linking',
    'growth_service_11': 'Email marketing',
    'growth_service_12': '– 2 newsletters/month, welcome sequence',
    'growth_service_13': 'Integration and tracking',
    'growth_service_14': '– Google Analytics, Tag Manager',
    'growth_service_15': 'Monthly report with recommendations',
    'growth_service_16': 'Up to 5 text/creative adjustments',
    'growth_service_17': 'Email and messenger support',
      'growth_services': [
      'Advertising in two channels (Facebook/Instagram and Google Ads)',
      '– Development of up to 6 ads (text + graphics) and A/B testing of creatives',
      '– Targeting: basic + look-a-like audiences',
      '– Campaign optimization 2 times a week (bids, budgets, exclusions)',
      'SMM in two social networks (Facebook and/or Instagram)',
      '– 3 posts per network per week (≈12 posts/month)',
      '– 8–10 stories or relevant short formats',
      '– Profile header setup, hashtag and cover selection',
      'Basic SEO optimization (on-page) up to 8 key queries',
      '– Checking meta tags, H1–H3 structure, internal linking',
      'Email marketing',
      '– Two newsletters per month, template + content adaptation',
      '– Setting up automated welcome email sequence (1 email)',
      'Integrations and tracking',
      '– Google Analytics + Google Tag Manager + Facebook Pixel',
      '– Checking UTM tags and conversion goals accuracy',
      'Monthly report with analytics and recommendations',
      '– Key metrics: ROI, CPL, LTV, CR by channels',
      '– Written conclusions and steps for the next month',
      'Up to 5 text and creative adjustments per month',
      'Email and messenger support during business hours'
    ],
    
    // Индивидуальные услуги Scale пакета    'scale_service_1': 'Multi-channel advertising (Google Ads + Facebook/Instagram)',
    'scale_service_2': '– up to 10 banners, 2 videos',
    'scale_service_3': '– A/B testing of creatives and audiences',
    'scale_service_4': '– campaign optimization 2x per week',
    'scale_service_5': '– localization for Slovak market',
    'scale_service_6': 'SMM in two networks (Facebook + Instagram)',
    'scale_service_7': '– 14 publications/month (both channels)',
    'scale_service_8': '– up to 8 stories/Reels',
    'scale_service_9': '– comment moderation, profile customization',
    'scale_service_10': 'On-page SEO (up to 12 keys)',
    'scale_service_11': '– meta tags, structure, basic micromarkup',
    'scale_service_12': 'Email marketing',
    'scale_service_13': '– 3 newsletters/month',
    'scale_service_14': '– 2 automated sequences (welcome, reactivation)',
    'scale_service_15': 'Comprehensive analytics',
    'scale_service_16': '– GA4, GTM, Facebook Pixel setup, basic call tracking',
    'scale_service_17': '– UTM tags and goals verification',
    'scale_service_18': 'Reporting and support',
    'scale_service_19': '– monthly report',
    'scale_service_20': '– up to 8 creative and settings adjustments',
    'scale_service_21': '– email and messenger support',
    
    // Удаляем старый массив scale_services      // Услуги
    'services_title': 'Services',
    'service_google_ads': 'Contextual Advertising (Google Ads)',
    'service_google_ads_desc': 'Launch, management and optimization of paid advertising in Google search engines.',
    'service_facebook_ads': 'Targeted Advertising (Facebook, Instagram)',
    'service_facebook_ads_desc': 'Setting up and managing social media advertising by target audiences.',
    'service_smm_management': 'SMM (Social Media Management & Promotion)',
    'service_smm_management_desc': 'Content development, publishing, audience engagement and follower growth on social networks.',
    'service_seo_promotion': 'SEO Website Promotion',
    'service_seo_promotion_desc': 'Improving website positions in Google search results and attracting organic traffic.',
    'service_email_marketing': 'Email Marketing',
    'service_email_marketing_desc': 'Creating and sending emails, database segmentation, automation of mailings.',
    'service_analytics_reporting': 'Analytics and Reporting',
    'service_analytics_reporting_desc': 'Data collection and analysis, preparation of regular reports on marketing effectiveness.',
    'service_landing_creation': 'Landing Pages/Website Creation & Optimization',
    'service_landing_creation_desc': 'Development of single-page websites (landing pages) and their conversion optimization. Price per page.',
    'service_copywriting': 'Copywriting (posts, newsletters, articles)',
    'service_copywriting_desc': 'Writing texts for websites, social networks, email newsletters and advertising.',
    'service_graphic_design': 'Graphic Design (banners, creatives)',
    'service_graphic_design_desc': 'Creation of visual materials for advertising, social networks and websites.',
    'service_crm_setup': 'CRM Setup / Marketing Automation',
    'service_crm_setup_desc': 'Implementation of CRM systems and automation of marketing processes.',
    'service_marketing_strategy': 'Marketing Strategy Development & Implementation',
    'service_marketing_strategy_desc': 'Development of comprehensive strategy for product or service promotion.',
    'service_pr_influencers': 'PR and Influencer Collaboration',
    'service_pr_influencers_desc': 'Organizing media publications and collaboration with bloggers, opinion leaders.',
    'service_online_events': 'Online Event Organization & Implementation',
    'service_online_events_desc': 'Conducting webinars, online presentations, events.',
    'service_video_production': 'Video Production and Motion Design',
    'service_video_production_desc': 'Creating videos and animated content for advertising and social networks.',
    'service_photography': 'Photography for Social Networks',
    'service_photography_desc': 'Organization and implementation of photo sessions for content and advertising.',
    'service_branding': 'Corporate Style/Branding Development',
    'service_branding_desc': 'Creating logo, brand book and visual identity of the company.',
    'service_marketing_audit': 'Marketing Audit/Consulting',
    'service_marketing_audit_desc': 'Analysis of current marketing processes and recommendations for improvement.',
    'service_reputation_management': 'Reputation Management (ORM)',
    'service_reputation_management_desc': 'Monitoring company mentions and working with negativity on the internet.',
    'service_review_moderation': 'Review Monitoring and Moderation',
    'service_review_moderation_desc': 'Tracking and processing reviews on platforms, prompt response.',
    'service_presentations': 'Presentation and Commercial Proposal Preparation',
    'service_presentations_desc': 'Developing presentations for meetings and sales, preparing commercial offers.',
    'service_chatbots': 'Business Chatbot Development & Setup',
    'service_chatbots_desc': 'Creating and programming chatbots for communication automation.',
    'service_telegram_channels': 'Telegram Channel Creation & Management',
    'service_telegram_channels_desc': 'Content development and channel management for brand promotion in Telegram.',
    'service_messenger_ads': 'Messenger Advertising Setup & Management',
    'service_messenger_ads_desc': 'Launching targeted advertising in messengers (Telegram, WhatsApp and others).',
    'service_promotions': 'Promotion and Contest Preparation & Launch',    'service_promotions_desc': 'Organization and implementation of promotional campaigns, contests, giveaways to attract audience.',
      // Period translations
    'period_month': 'month',
    'period_project': 'project',
    'period_piece': 'piece',
    'price_from': 'from',
    
    'services_cta': 'Learn More',
    'services_custom_text': 'Need something specific? Create your own service package tailored exactly to your needs.',
    'services_build_package': 'Build Your Custom Package',
      // Package Builder
    'builder_title': 'Build Your Custom Package',
    'builder_subtitle': 'Select the services you need and create a tailored package',
    'selected_services_title': 'Selected Services',
    'available_services_title': 'Available Services',
    'empty_state': 'You haven\'t selected any services yet. Click "+" next to a service to add it.',    'total_price': 'Total Price:',    'add_to_cart': 'Add to Cart',
    'add_package_to_cart': 'Add Package to Cart',    // Chat
    'chat_title': 'Support Chat',
    'chat_status_online': 'Online',
    'chat_status_offline': 'Offline',
    'chat_welcome': 'Hello! I\'m here to help you. What questions do you have?',
    'chat_input_placeholder': 'Type a message...',
    'chat_typing': 'Typing...',
    'chat_message_sent': '✅ Message sent! Please wait for support response...',
    'chat_message_error': '❌ Failed to send message. Please try again later.',
    'chat_support_name': 'Archetype Strategy Support',
    
    // Корзина
    'cart_title': 'Cart',
    'cart_empty': 'Your cart is empty',
    'cart_total': 'Total',
    'cart_clear': 'Clear Cart',
    'cart_view_full': 'Go to Cart',
    'cart_page_title': 'Shopping Cart',
    'cart_empty_title': 'Your cart is empty',
    'cart_empty_desc': 'Add services from our Package Builder or choose one of the ready-made packages.',
    'cart_browse_services': 'Browse Services',    'cart_summary_title': 'Order',
    'cart_subtotal': 'Subtotal',
    'cart_discount': 'Discount',
    'cart_checkout': 'Checkout',
    'cart_contact_title': 'Need help?',
    'cart_contact_text': 'Contact us',
    'cart_confirm_clear': 'Are you sure you want to clear all items from the cart?',
    'cart_confirm_remove': 'Are you sure you want to remove this item from the cart?',
    'cart_empty_checkout': 'Cart is empty. Add services before proceeding.',
    'cart_remove_item': 'Remove item',
    'cart_discount_suggestion': 'Have a discount code? Try one of these:',
    'cart_discount_empty': 'Enter discount code',
    'cart_discount_applied': 'Discount code applied successfully',
    'cart_discount_invalid': 'Invalid discount code',
    'promo_start5_desc': '5% discount for beginners',
    'promo_save10_desc': '10% discount on all services',
    'cart_order_summary': 'Order Overview',
    'checkout_title': 'Checkout',
    'checkout_contact_info': 'Contact Information',
    'checkout_first_name': 'First Name',
    'checkout_last_name': 'Last Name',
    'checkout_email': 'Email Address',
    'checkout_phone': 'Phone Number',
    'checkout_company_info': 'Company Information (Optional)',
    'checkout_company': 'Company Name',
    'checkout_message': 'Message or special requests',
    'checkout_submit_order': 'Submit Order',
    'order_success_title': 'Order Successfully Submitted!',
    'order_success_message': 'Thank you for your order. We will contact you soon.',
    'order_id': 'Order ID',
    'order_total': 'Total Amount',    'back_to_home': 'Back to Home',
    
    // Уведомления
    'notification_service_added_single': 'service added to cart!',
    'notification_service_added_multiple': 'services added to cart!',
    'notification_quantity_set_zero': 'quantity set to 0',
    'notification_item_removed': 'removed from cart',
    'notification_order_sent_success': 'Order sent successfully!',
    'notification_order_sent_telegram': 'Order sent via Telegram!',
    'notification_telegram_error': 'Telegram error, trying email...',
    
    // Переводы для копирайтинга в пакетах
    'starter_copywriting': 'Basic copywriting for website and social media',
    'growth_copywriting': 'Sales copywriting for ads, landing pages and email campaigns',
    'scale_copywriting': 'Premium copywriting: sales funnels, landing pages, video scripts',
      // Контакты
    'contact_title': 'Contacts',
    'contact_text': 'Contact us: <a href="mailto:services@marketing360.sk">services@marketing360.sk</a>',
    'contact_ready': 'We are ready to discuss your project and help you reach new heights!',
    
    // Социальные сети
    'social_telegram': 'Telegram',
    'social_instagram': 'Instagram',
    'social_facebook': 'Facebook',
    
    'footer_copyright': '© 2025 Archetype Strategy. All rights reserved.'
  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM loaded, initializing scripts...');
  
  // Debug: Check if sections exist
  const packagesSection = document.querySelector('#packages');
  const servicesSection = document.querySelector('#services');
  console.log('Packages section found:', packagesSection ? 'YES' : 'NO');
  console.log('Services section found:', servicesSection ? 'YES' : 'NO');
  
  if (packagesSection) {
    console.log('Packages section style:', window.getComputedStyle(packagesSection).display);
    console.log('Packages section visibility:', window.getComputedStyle(packagesSection).visibility);
  }
  
  if (servicesSection) {
    console.log('Services section style:', window.getComputedStyle(servicesSection).display);
    console.log('Services section visibility:', window.getComputedStyle(servicesSection).visibility);
  }
  
  // Check AOS
  console.log('AOS available:', typeof AOS !== 'undefined' ? 'YES' : 'NO');
  
  // 1) Плавный скролл по якорям
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const targetID = link.getAttribute("href");
      if (targetID.length > 1) {
        e.preventDefault();
        const targetSection = document.querySelector(targetID);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // КРИТИЧНО: принудительно сбрасываем позицию пакетов для мобильных
  function resetPackagesPosition() {
    const packagesGrid = document.querySelector(".packages-grid");
    if (packagesGrid && window.innerWidth <= 768) {
      packagesGrid.style.scrollBehavior = 'auto';
      packagesGrid.scrollLeft = 0;
      console.log('Package position reset to 0');
    }
  }
  
  // Множественные сбросы позиции пакетов
  resetPackagesPosition();
  setTimeout(resetPackagesPosition, 100);
  setTimeout(resetPackagesPosition, 300);
  setTimeout(resetPackagesPosition, 500);
  setTimeout(resetPackagesPosition, 1000);

  // 2) ПРОСТАЯ инициализация пакетов услуг для мобильных
  function setupPackagesMobile() {
    const packagesGrid = document.querySelector(".packages-grid");
    if (!packagesGrid || window.innerWidth > 768) return;
    
    console.log("Setting up mobile packages...");
    
    // ПРИНУДИТЕЛЬНЫЙ сброс позиции
    packagesGrid.scrollLeft = 0;
    
    // УБИРАЕМ СОЗДАНИЕ ТОЧЕК-ИНДИКАТОРОВ    
    // Удаляем старé индикаторы если они есть
    const oldIndicators = document.querySelector(".packages-indicators");
    if (oldIndicators) oldIndicators.remove();
      }
  
  // Вызываем при загрузке
  setupPackagesMobile();
  
  // И при изменении размера окна
  window.addEventListener("resize", setupPackagesMobile);

  // 3) Десктоп‑карусель для услуг
  if (window.innerWidth > 768) {
    const track = document.querySelector(".services-grid-track");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    
    if (track && prevBtn && nextBtn) {
      const cards = track.querySelectorAll(".service-card");
      const total = cards.length;
      const visible = 4; 
      const maxIndex = Math.max(0, total - visible);
      const cardWidth = 260;
      let current = 0;
      
      function updateArrows() {
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= maxIndex;
      }
      
      updateArrows();
      
      prevBtn.addEventListener("click", () => {
        if (current > 0) {
          current--;
          track.style.transform = `translateX(-${current * cardWidth}px)`;
          updateArrows();
        }
      });
      
      nextBtn.addEventListener("click", () => {
        if (current < maxIndex) {
          current++;
          track.style.transform = `translateX(-${current * cardWidth}px)`;
          updateArrows();
        }
      });
    }
  }
  
  // 4) Мобильное меню
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav");
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      nav.classList.toggle('active');
      console.log('Menu toggled');
    });
    
    // Закрываем меню при клике на ссылки
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
      });
    });
    
    // Закрываем меню при клике вне его
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && e.target !== menuToggle) {
        nav.classList.remove('active');
      }
    });
  }
  
  // 5) ЕДИНЫЙ ОБРАБОТЧИК ПЕРЕКЛЮЧЕНИЯ ЯЗЫКА
  const langToggle = document.getElementById('lang-toggle');
  const langToggleMobile = document.getElementById('lang-toggle-mobile');
  
  console.log('Language toggle buttons found:', {
    desktop: !!langToggle,
    mobile: !!langToggleMobile
  });
    if (langToggle || langToggleMobile) {
    // Получаем сохраненный язык или устанавливаем словацкий по умолчанию
    let currentLang = localStorage.getItem('siteLang') || 'sk';
    console.log('Current language:', currentLang);
    
    // Устанавливаем начальное состояние кнопок
    updateLanguageButtons(currentLang);
    
    // Если сохранен английский, применяем переводы
    if (currentLang === 'en') {
      applyTranslations('en');
    }
    
    // Функция переключения языка
    function switchLanguage(e) {
      e.preventDefault();
      console.log('Language switch triggered');
      
      // Переключаем язык
      currentLang = currentLang === 'sk' ? 'en' : 'sk';
      console.log('Switching to language:', currentLang);
      
      // Сохраняем в localStorage
      localStorage.setItem('siteLang', currentLang);
      
      // Обновляем кнопки
      updateLanguageButtons(currentLang);
        // Применяем переводы
      applyTranslations(currentLang);
      
      // Отправляем событие для других модулей
      const languageEvent = new CustomEvent('languageChanged', {
        detail: { language: currentLang }
      });
      document.dispatchEvent(languageEvent);
      
      console.log('Language switched to:', currentLang);
    }
    
    // Обработчики клика для обеих кнопок языка
    if (langToggle) {
      langToggle.addEventListener('click', switchLanguage);
      console.log('Desktop language button event listener added');
    }
    if (langToggleMobile) {
      langToggleMobile.addEventListener('click', switchLanguage);
      console.log('Mobile language button event listener added');
    }
  }
    // Функция обновления кнопок языка
  function updateLanguageButtons(lang) {
    // Показываем язык, на ktorý môžeme prepnúť
    const displayText = lang === 'sk' ? 'EN' : 'SK';
    const isEnglish = lang === 'en';
    
    console.log('Updating language buttons:', { lang, displayText, isEnglish });
    
    if (langToggle) {
      langToggle.textContent = displayText;
      langToggle.classList.toggle('active', isEnglish);
    }
    if (langToggleMobile) {
      langToggleMobile.textContent = displayText;
      langToggleMobile.classList.toggle('active', isEnglish);
    }
  }
  
  // Функция применения переводов
  function applyTranslations(lang) {
    console.log('Applying translations for language:', lang);
    
    if (!translations[lang]) {
      console.error('Translations not found for language:', lang);
      return;
    }
    
    // Переводим элементы с data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(element => {
      const key = element.getAttribute('data-lang-key');
      if (translations[lang][key]) {
        // Специальная обработка для элементов, которые могут содержать HTML
        if (key.startsWith('contact_') || key.includes('_services')) {
          element.innerHTML = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });
    
    // Переводим основные заголовки и секции
    translateElement('.hero h2', 'hero_title', lang);
    translateElement('.hero-subtitle', 'hero_subtitle', lang);
    translateElement('.hero .btn', 'hero_cta', lang);
    translateElement('#featured h3', 'featured_title', lang);
    translateElement('#featured p', 'featured_desc', lang);
    translateElement('#about h3', 'about_title', lang);
    translateElement('#about > .container > p', 'about_text', lang);
    translateElement('#packages h3', 'packages_title', lang);
    translateElement('#services h3', 'services_title', lang);
    translateElement('#cases h3', 'cases_title', lang);
    translateElement('#cases p', 'cases_text', lang);
    translateElement('#contact h3', 'contact_title', lang);
    translateElement('footer p', 'footer_copyright', lang);
    translateElement('#services .btn', 'services_cta', lang);    
    // Переводим блоки "О нас"
    translateElement('#about .highlight:nth-child(1) h4', 'about_highlight1_title', lang);
    translateElement('#about .highlight:nth-child(1) p', 'about_highlight1_text', lang);
    translateElement('#about .highlight:nth-child(2) h4', 'about_highlight2_title', lang);
    translateElement('#about .highlight:nth-child(2) p', 'about_highlight2_text', lang);
    translateElement('#about .highlight:nth-child(3) h4', 'about_highlight3_title', lang);
    translateElement('#about .highlight:nth-child(3) p', 'about_highlight3_text', lang);
    
    // Переводим все элементы с data-lang-key атрибутами
    const langElements = document.querySelectorAll('[data-lang-key]');
    langElements.forEach(element => {
      const key = element.getAttribute('data-lang-key');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }    });
    
    // Переводим placeholder элементы
    const placeholderElements = document.querySelectorAll('[data-lang-key-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-lang-key-placeholder');
      if (translations[lang] && translations[lang][key]) {
        element.placeholder = translations[lang][key];
      }
    });
    
      // Переводим пакеты услуг
    translatePackages(lang);
    
    // Переводим Package Builder
    translatePackageBuilder(lang);
      // Переводим контакты
    translateContacts(lang);
    
    // Обновляем статус чата (если чат инициализирован)
    if (window.telegramChat && typeof window.telegramChat.updateChatStatus === 'function') {
      window.telegramChat.updateChatStatus();
    }
    
    console.log('Translations applied successfully');}
  
  // Функция перевода Package Builder
  function translatePackageBuilder(lang) {
    // Переводим заголовки и элементы Package Builder
    const builderTitle = document.querySelector('#package-builder h3');
    if (builderTitle) builderTitle.textContent = translations[lang]['builder_title'];
    
    const builderSubtitle = document.querySelector('.builder-subtitle');
    if (builderSubtitle) builderSubtitle.textContent = translations[lang]['builder_subtitle'];
    
    const selectedTitle = document.querySelector('.selected-services h4');
    if (selectedTitle) selectedTitle.textContent = translations[lang]['selected_services_title'];
    
    const availableTitle = document.querySelector('.available-services h4');
    if (availableTitle) availableTitle.textContent = translations[lang]['available_services_title'];
    
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) emptyState.textContent = translations[lang]['empty_state'];
    
    const totalPriceLabel = document.querySelector('.total-price span:first-child');
    if (totalPriceLabel) totalPriceLabel.textContent = translations[lang]['total_price'];
      const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) addToCartBtn.textContent = translations[lang]['add_to_cart'];
  }
  
  // Вспомогательная функция для перевода элемента
  function translateElement(selector, key, lang) {
    const element = document.querySelector(selector);
    if (element && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  }
  
  // Функция перевода пакетов
  function translatePackages(lang) {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach((card, index) => {
      // Определяем тип пакета
      const packageTypes = ['starter', 'growth', 'scale'];
      const packageType = packageTypes[index];
      
      if (!packageType) return;
      
      // Переводим заголовок пакета
      const h4 = card.querySelector('h4');
      if (h4) h4.textContent = translations[lang][`${packageType}_package`];
      
      // Переводим "Для кого:", "Состав услуг:", "Стоимость:"
      const strongElements = card.querySelectorAll('strong');
      if (strongElements[0]) strongElements[0].textContent = translations[lang]['for_who'];
      if (strongElements[1]) strongElements[1].textContent = translations[lang]['services_included'];
      if (strongElements[2]) strongElements[2].textContent = translations[lang]['price'];
      
      // Переводим описание целевой аудитории
      const forWhoSpan = card.querySelector(`span[data-lang-key="${packageType}_for_who_text"]`);
      if (forWhoSpan) {
        forWhoSpan.textContent = translations[lang][`${packageType}_for_who_text`];
      }
      
      // Переводим цену
      const priceSpan = card.querySelector(`span[data-lang-key="${packageType}_price"]`);
      if (priceSpan) {
        priceSpan.textContent = translations[lang][`${packageType}_price`];
      }
      
      // Переводим список услуг
      const servicesList = card.querySelector(`ul[data-lang-key="${packageType}_services"]`);
      if (servicesList && translations[lang][`${packageType}_services`]) {
        const services = translations[lang][`${packageType}_services`];
        const listItems = servicesList.querySelectorAll('li');
        
        // Если количество элементов списка совпадает, переводим каждый
        if (listItems.length === services.length) {
          listItems.forEach((li, liIndex) => {
            li.textContent = services[liIndex];
          });
        } else {
          // Если не совпадает, пересоздаём список
          servicesList.innerHTML = '';
          services.forEach(service => {
            const li = document.createElement('li');
            li.textContent = service;
            servicesList.appendChild(li);
          });
        }
      }
    });
  }
    // Функция перевода контактов
  function translateContacts(lang) {
    const contactPs = document.querySelectorAll('#contact p');
    if (contactPs.length >= 2) {
      // Первый параграф - "Свяжитесь с нами:" с HTML содержимым
      if (contactPs[0]) {
        contactPs[0].innerHTML = translations[lang]['contact_text'];
      }
      // Второй параграф - готовность обсудить проект
      if (contactPs[1]) {
        contactPs[1].textContent = translations[lang]['contact_ready'];
      }
    }
  }
    // Инициализируем карусель пакетов
  initPackagesCarousel();
  
  // Обновляем при изменении размера окна
  window.addEventListener('resize', initPackagesCarousel);
  
  // Фиксируем скролл при загрузке страницы
  window.addEventListener('load', function() {
    const packagesGrid = document.querySelector('.packages-grid');
    if (packagesGrid && window.innerWidth <= 768) {
      setTimeout(() => { packagesGrid.scrollLeft = 0; }, 300);
    }
  });
    // Инициализируем Package Builder
  initPackageBuilder();
});

// Функция для показа уведомлений в мобильной версии Package Builder
function showMobileServiceNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'mobile-service-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 10000;
    animation: slideInTop 0.3s ease-out;
    max-width: 90%;
    text-align: center;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  `;
  
  document.body.appendChild(notification);
  
  // Удаляем уведомление через 3 секунды
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutTop 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }
  }, 2500);
}

// Package Builder functionality
function initPackageBuilder() {
  // Глобальные переменные для Package Builder
  window.selectedServices = [];
  window.totalPrice = 0;
  
  const selectedList = document.getElementById('selectedList');
  const totalPriceElement = document.getElementById('totalPrice');
  const addToCartBtn = document.getElementById('addToCartBtn');
    if (!selectedList || !totalPriceElement || !addToCartBtn) return;
    // Обработчики кнопок добавления услуг
  document.querySelectorAll('.add-service-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const serviceElement = this.closest('.builder-service');
      const serviceId = serviceElement.dataset.service;
      const servicePriceRange = serviceElement.dataset.price; // Теперь это строка типа "80-150"
      
      // Получаем название и описание услуги
      const serviceTitle = serviceElement.querySelector('h5').textContent;
      const serviceDesc = serviceElement.querySelector('p').textContent;
      
      // Проверяем, мобильная ли версия (динамически при каждом клике)
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // МОБИЛЬНАЯ ВЕРСИЯ: сразу добавляем в корзину        
        // Проверяем, не добавлена ли уже эта услуга в корзину
        if (cart.items.find(item => item.id === serviceId)) {
          return;
        }
        
        // Добавляем услугу прямо в корзinu
        cart.addItem({
          id: serviceId,
          name: serviceTitle,
          price: servicePriceRange // Теперь передаем диапазон цен
        });
        
        // Показываем уведомление
        const currentLang = document.documentElement.lang || 'sk';
        const notificationText = currentLang === 'sk' 
          ? `${serviceTitle} bola pridaná do košíka!`
          : `${serviceTitle} added to cart!`;
        
        showMobileServiceNotification(notificationText);
        
        // Отключаем кнопку добавления
        this.disabled = true;
        this.textContent = '';
        this.classList.add('is-selected');
        serviceElement.classList.add('disabled');        
      } else {
        // ДЕСКТОПНАЯ ВЕРСИЯ: добавляем в Selected Services
        
        // Проверяем, не добавлена ли уже эта услуга
        if (window.selectedServices.find(s => s.id === serviceId)) {
          return;
        }
        
        // Добавляем услугу в выбранные (НЕ в корзину)
        const service = {
          id: serviceId,
          title: serviceTitle,
          description: serviceDesc,
          price: servicePriceRange // Теперь диапазон цен
        };
        
        window.selectedServices.push(service);
        // Для totalPrice используем "от-до" формат
        
        // Обновляем UI
        updateSelectedServices();
        updateTotalPrice();
        
        // Отключаем кнопку добавления
        this.disabled = true;
        this.textContent = '';
        this.classList.add('is-selected');
        serviceElement.classList.add('disabled');
      }
    });
  });
    function updateSelectedServices() {
    if (window.selectedServices.length === 0) {
      selectedList.innerHTML = `
        <div class="empty-state" data-lang-key="empty_state">
          Zatiaľ ste nevybrali žiadne služby. Kliknite na "+" vedľa služby, ktorú chcete pridať.
        </div>
      `;
      addToCartBtn.disabled = true;
      return;
    }
      selectedList.innerHTML = '';
    addToCartBtn.disabled = false;
    
    window.selectedServices.forEach(service => {
      const serviceElement = document.createElement('div');
      serviceElement.className = 'selected-service';
      serviceElement.innerHTML = `
        <div>
          <h5>${service.title}</h5>
        </div>
        <div class="service-price">${service.price}€</div>
        <button class="remove-service-btn" data-service-id="${service.id}">×</button>
      `;
      
      // Добавляем обработчик удаления
      const removeBtn = serviceElement.querySelector('.remove-service-btn');
      removeBtn.addEventListener('click', function() {
        removeService(service.id);
      });
      
      selectedList.appendChild(serviceElement);
    });
  }    function removeService(serviceId) {
    const serviceIndex = window.selectedServices.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) return;
    
    const removedService = window.selectedServices[serviceIndex];
    window.selectedServices.splice(serviceIndex, 1);
    
    // Обновляем UI
    updateSelectedServices();
    updateTotalPrice();
    
    // Включаем обратно кнопку добавления
    const serviceElement = document.querySelector(`[data-service="${serviceId}"]`);
    if (serviceElement) {
      const addBtn = serviceElement.querySelector('.add-service-btn');
      addBtn.disabled = false;
      addBtn.textContent = '+';
      addBtn.classList.remove('is-selected');
      serviceElement.classList.remove('disabled');
    }
  }
  function updateTotalPrice() {
    if (window.selectedServices.length === 0) {
      totalPriceElement.textContent = '0€';
      return;
    }
    
    // Рассчитываем диапазон общей стоимости
    let minTotal = 0;
    let maxTotal = 0;
    
    window.selectedServices.forEach(service => {
      const priceRange = service.price.split('-');
      if (priceRange.length === 2) {
        minTotal += parseInt(priceRange[0]);
        maxTotal += parseInt(priceRange[1]);
      } else {
        // Если цена не является диапазоном, считаем как фиксированную
        const price = parseInt(service.price);
        minTotal += price;
        maxTotal += price;
      }
    });
    
    if (minTotal === maxTotal) {
      totalPriceElement.textContent = `${minTotal}€`;
    } else {
      totalPriceElement.textContent = `${minTotal}-${maxTotal}€`;
    }
  }
    // Обработчик кнопки "Добавить в корзину"
  addToCartBtn.addEventListener('click', function() {
    if (window.selectedServices.length === 0) return;
    
    // Добавляем все выбранные услуги в корзину
    window.selectedServices.forEach(service => {
      cart.addItem({
        id: service.id,
        name: service.title,
        price: service.price
      });
    });      // Показываем уведомление
    const currentLang = document.documentElement.lang || 'sk';
    const translationKey = window.selectedServices.length === 1 
      ? 'notification_service_added_single' 
      : 'notification_service_added_multiple';
    
    // Получаем перевод напрямую из объекта translations
    const baseText = translations[currentLang] && translations[currentLang][translationKey] 
      ? translations[currentLang][translationKey] 
      : translations['sk'][translationKey];
    const notificationText = `${window.selectedServices.length} ${baseText}`;
    
    const notification = document.createElement('div');
    notification.className = 'builder-notification';
    notification.textContent = notificationText;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
      notification.remove();
    }, 3000);    // Очищаем выбранные услуги
    window.selectedServices = [];
    window.totalPrice = 0;
    updateSelectedServices();
    updateTotalPrice();
    
    // Включаем обратно все кнопки добавления
    document.querySelectorAll('.add-service-btn').forEach(btn => {
      btn.disabled = false;
      btn.textContent = '+';
      btn.closest('.builder-service').classList.remove('disabled');
    });
  });
}

// Глобальный обработчик загрузки - дополнительная страховка
window.addEventListener("load", function() {
  // Еще раз сбрасываем позицию пакетов после полной загрузки страницы
  setTimeout(() => {
    const packagesGrid = document.querySelector(".packages-grid");
    if (packagesGrid) packagesGrid.scrollLeft = 0;
  }, 500);
});

// Shopping Cart functionality
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.modal = document.getElementById('cartModal');
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCartUI();
  }
  bindEvents() {
    // Кнопки открытия корзины
    const cartButtons = document.querySelectorAll('#cart-toggle, #cart-toggle-desktop');
    console.log(`🛒 Найдено ${cartButtons.length} кнопок корзины`);
    cartButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        console.log('🔄 Клик по иконке корзины, открываем модальное окно');
        this.openModal();
      });
    });

    // Кнопка закрытия модального окна
    const closeBtn = document.getElementById('closeCartModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Закрытие по клику на фон
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // Кнопка очистки корзины
    const clearBtn = document.getElementById('clearCart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearCart());
    }    // Кнопка перехода на страницу корзины
    const goToCartBtn = document.getElementById('goToCart');
    if (goToCartBtn) {
      console.log('✅ Кнопка "goToCart" найдена, привязываем обработчик...');
      goToCartBtn.addEventListener('click', () => {
        console.log('🔄 Клик по кнопке "Prejsť na košík"');
        this.goToCartPage();
      });
    } else {
      console.warn('⚠️ Кнопка "goToCart" не найдена!');
    }
  }
  addItem(service) {
    const existingItem = this.items.find(item => item.id === service.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.items.push({
        id: service.id,
        name: service.name,
        price: service.price,
        quantity: 1
      });
    }
    this.saveToStorage();
    this.updateCartUI();
  }  removeItem(serviceId) {
    this.items = this.items.filter(item => item.id !== serviceId);
    this.saveToStorage();
    this.updateCartUI();
    
    // Reset the service button state
    this.resetServiceButton(serviceId);
  }
  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.updateCartUI();
    // Сбрасываем состояние кнопок Package Builder
    this.resetPackageBuilderButtons();
  }

  saveToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }  getTotal() {
    if (this.items.length === 0) return "0";
    
    let minTotal = 0;
    let maxTotal = 0;
    
    this.items.forEach(item => {
      // Исключаем товары с количеством 0 из расчета
      if (item.quantity > 0) {
        const priceStr = item.price.toString();
        if (priceStr.includes('-')) {
          const priceRange = priceStr.split('-');
          minTotal += parseInt(priceRange[0]) * item.quantity;
          maxTotal += parseInt(priceRange[1]) * item.quantity;
        } else {
          // Если цена не является диапазоном, считаем как фиксированную
          const price = parseInt(priceStr);
          minTotal += price * item.quantity;
          maxTotal += price * item.quantity;
        }
      }
    });
    
    if (minTotal === maxTotal) {
      return minTotal.toString();
    } else {
      return `${minTotal}-${maxTotal}`;
    }
  }

  // Добавляем метод для получения всех элементов корзины
  getItems() {
    return this.items;
  }
  // Добавляем метод для обновления количества товаров
  updateQuantity(serviceId, quantity) {
    const item = this.items.find(item => item.id === serviceId);
    if (item) {
      const oldQuantity = item.quantity;
      item.quantity = quantity;
      
      // If quantity becomes 0, reset the service button
      if (quantity === 0 && oldQuantity > 0) {
        this.resetServiceButton(serviceId);
      }
      
      this.saveToStorage();
      this.updateCartUI();
    }
  }
  updateCartUI() {
    this.updateCartCount();
    this.updateCartModal();
    
    // Обновляем страницу корзины, если она открыта
    if (typeof cartPageManager !== 'undefined' && cartPageManager) {
      cartPageManager.renderCartPage();
    }
  }
  updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    // Считаем только товары с количеством больше 0
    const count = this.items.filter(item => item.quantity > 0).length;
    
    cartCounts.forEach(countEl => {
      countEl.textContent = count;
      if (count > 0) {
        countEl.classList.remove('hidden');
      } else {
        countEl.classList.add('hidden');
      }
    });
  }

  updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const emptyMessage = document.getElementById('emptyCartMessage');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems || !emptyMessage || !cartTotal) return;

    cartItems.innerHTML = '';

    if (this.items.length === 0) {
      emptyMessage.classList.remove('hidden');
      cartTotal.textContent = '0€';
    } else {
      emptyMessage.classList.add('hidden');
      
      this.items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${item.price}€</div>
          </div>          <button class="cart-item-remove" onclick="cart.removeItem('${item.id}')" aria-label="Remove item">
            ×
          </button>
        `;
        cartItems.appendChild(cartItem);
      });

      cartTotal.textContent = `${this.getTotal()}€`;
    }
  }
  openModal() {
    console.log('🔄 Открытие модального окна корзины...');
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('✅ Модальное окно корзины открыто');
    } else {
      console.warn('⚠️ Модальное окно корзины не найдено!');
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }  goToCartPage() {
    // Переход на страницу корзины
    console.log('🛒 Переход на страницу корзины...');
    try {
      window.location.href = 'cart.html';
    } catch (error) {
      console.error('❌ Ошибка перехода на cart.html:', error);
      // Альтернативный способ
      window.location.assign('cart.html');
    }
  }

  // Метод для сброса состояния кнопок Package Builder при очистке корзины
  resetPackageBuilderButtons() {
    // Сбрасываем состояние всех кнопок добавления услуг
    document.querySelectorAll('.add-service-btn').forEach(btn => {
      btn.disabled = false;
      btn.textContent = '+';
      btn.classList.remove('is-selected');
      btn.style.background = ''; // Сбрасываем инлайн-стили
      const serviceElement = btn.closest('.builder-service');
      if (serviceElement) {
        serviceElement.classList.remove('disabled');
      }
    });
    
    console.log('Package Builder buttons reset - all services are now available again');
  }  // Reset specific service button when item is removed from cart
  resetServiceButton(serviceId) {
    // Find the service button in package builder (using data-service attribute)
    const serviceButton = document.querySelector(`[data-service="${serviceId}"] .add-service-btn`);
    if (serviceButton) {
      serviceButton.disabled = false;
      serviceButton.textContent = '+';
      serviceButton.classList.remove('is-selected');
      serviceButton.style.background = ''; // Сбрасываем инлайн-стили
      
      const serviceElement = serviceButton.closest('.builder-service');
      if (serviceElement) {
        serviceElement.classList.remove('disabled');
      }
    }
    
    // Also check for package buttons if this is a package
    const packageButton = document.querySelector(`[data-package="${serviceId}"] .package-btn`);
    if (packageButton) {
      packageButton.disabled = false;
      packageButton.textContent = packageButton.getAttribute('data-original-text') || 'Pridať balíček do košíka';
      packageButton.style.background = '';
    }
  }
}

// Инициализация кнопок пакетов
function initPackageButtons() {
  const packageButtons = document.querySelectorAll('.package-btn');
  
  packageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const packageType = this.getAttribute('data-package');
      const packagePrice = parseFloat(this.getAttribute('data-price'));
      
      // Определяем название пакета на основе текущего языка
      const currentLang = getCurrentLanguage();
      const packageNames = {
        'starter': {
          'sk': 'Základný (Starter) balíček',
          'en': 'Basic (Starter) Package'
        },
        'growth': {
          'sk': 'Stredný (Growth) balíček',
          'en': 'Medium (Growth) Package'
        },
        'scale': {
          'sk': 'Prémiový (Scale) balíček',
          'en': 'Premium (Scale) Package'
        }
      };
      
      const packageName = packageNames[packageType][currentLang] || packageNames[packageType]['sk'];
      
      // Добавляем пакет в корзину
      cart.addItem({
        id: packageType + '_package',
        name: packageName,
        price: packagePrice
      });
      
      // Показываем уведомление об успехе
      const notificationText = currentLang === 'sk' 
        ? `${packageName} bol pridaný do košíka!`
        : `${packageName} has been added to cart!`;
      
      showPackageNotification(notificationText);
      
      console.log(`Package ${packageType} added to cart:`, packageName, packagePrice);
    });
  });
}

// Функция для отображения уведомлений о пакетах
function showPackageNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'package-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Удаляем уведомление через 3 секунды
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 3000);
}

// Функция получения текущего языка
function getCurrentLanguage() {
  const langBtn = document.getElementById('lang-toggle');
  return langBtn && langBtn.textContent === 'SK' ? 'en' : 'sk';
}

// Инициализация корзины
let cart;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🔄 Инициализация корзины...');
  cart = new ShoppingCart();
  console.log('✅ Корзина инициализирована:', cart);
  
  // Package Builder больше не интегрируется автоматически с корзиной
  // Интеграция происходит только при нажатии кнопки "Добавить в корзину"
  
  // Инициализация кнопок пакетов
  initPackageButtons();
});

// Добавляем CSS для анимации уведомления
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInTop {
    from {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutTop {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== ВЕБ-ЧАТ С TELEGRAM ИНТЕГРАЦИЕЙ =====

class TelegramWebChat {
  constructor() {
    this.chatWidget = document.getElementById('chat-widget');
    this.chatToggle = document.getElementById('chat-toggle');
    this.chatWindow = document.getElementById('chat-window');
    this.chatClose = document.getElementById('chat-close');
    this.chatInput = document.getElementById('chat-input');
    this.chatSend = document.getElementById('chat-send');
    this.chatMessages = document.getElementById('chat-messages');
    this.chatNotification = document.getElementById('chat-notification');
    
    // Конфигурация Telegram бота (из config/telegram-config.js)
    this.botToken = (typeof TELEGRAM_CONFIG !== 'undefined') ? TELEGRAM_CONFIG.BOT_TOKEN : '';
    this.chatId = (typeof TELEGRAM_CONFIG !== 'undefined') ? TELEGRAM_CONFIG.CHAT_ID : '';
    this.isOpen = false;
    this.userId = this.generateUserId();
    
    this.init();
  }
    getTranslation(key) {
    const currentLang = getCurrentLanguage();
    return translations[currentLang][key] || translations['sk'][key] || key;
  }
  
  getBratislavaTime() {
    // Получаем текущее время в Братиславе (часовой пояс Europe/Bratislava)
    const now = new Date();
    const bratislavaTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Bratislava"}));
    return bratislavaTime;
  }
  
  isWorkingHours() {
    const bratislavaTime = this.getBratislavaTime();
    const hours = bratislavaTime.getHours();
    // Рабочие часы: с 7:00 до 20:00 (8 вечера)
    return hours >= 7 && hours < 20;
  }
  
  updateChatStatus() {
    const statusElement = document.getElementById('chat-status');
    if (!statusElement) return;
    
    const isOnline = this.isWorkingHours();
    
    if (isOnline) {
      statusElement.textContent = this.getTranslation('chat_status_online');
      statusElement.className = 'chat-status online';
    } else {
      statusElement.textContent = this.getTranslation('chat_status_offline');
      statusElement.className = 'chat-status offline';
    }
  }
    init() {
    this.bindEvents();
    this.hideNotification(); // Скрываем уведомление по умолчанию
    
    // Устанавливаем начальный статус чата
    this.updateChatStatus();
    
    // Обновляем статус каждую минуту
    setInterval(() => {
      this.updateChatStatus();
    }, 60000); // 60 секунд
    
      // Запускаем проверку ответов сразу (на случай если есть непрочитанные)
    setTimeout(() => {
      this.checkForReplies();
    }, 2000);
    
    // Принудительно запускаем polling при инициализации
    setTimeout(() => {
      if (!this.pollingInterval) {
        console.log('🔄 Принудительный запуск polling при инициализации');
        this.startPollingForReplies();
      }
    }, 3000);
  }
  
  bindEvents() {
    this.chatToggle.addEventListener('click', () => this.toggleChat());
    this.chatClose.addEventListener('click', () => this.closeChat());
    this.chatSend.addEventListener('click', () => this.sendMessage());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    
    // Закрытие чата при клике вне его
    document.addEventListener('click', (e) => {
      if (!this.chatWidget.contains(e.target) && this.isOpen) {
        this.closeChat();
      }
    });
  }
  
  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }
    openChat() {
    this.chatWindow.classList.add('active');
    this.isOpen = true;
    this.hideNotification();
    this.chatInput.focus();
    
    // Запускаем проверку ответов если еще не запущена
    if (!this.pollingInterval) {
      console.log('🔄 Запуск polling при открытии чата...');
      this.startPollingForReplies();
    }
  }
  
  closeChat() {
    this.chatWindow.classList.remove('active');
    this.isOpen = false;
  }
  
  showNotification() {
    this.chatNotification.style.display = 'flex';
  }
  
  hideNotification() {
    this.chatNotification.style.display = 'none';
  }
    generateUserId() {
    // Проверяем, есть ли уже сохраненный userId
    let userId = localStorage.getItem('telegram_chat_user_id');
    if (!userId) {
      // Генерируем новый userId и сохраняем его
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('telegram_chat_user_id', userId);
      console.log('🆔 Создан новый userId:', userId);
    } else {
      console.log('🆔 Используется сохраненный userId:', userId);
    }
    return userId;
  }
  
  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' });
  }  addMessage(content, isUser = false, time = null, senderName = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'} new-message`;
    
    const senderDisplay = senderName ? `<small style="opacity: 0.7; font-size: 11px;">${senderName}</small><br>` : '';
    
    messageDiv.innerHTML = `
      <div class="message-content">
        ${senderDisplay}<p>${content}</p>
      </div>
      <div class="message-time">${time || this.getCurrentTime()}</div>
    `;
    
    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    
    // Убираем класс анимации после завершения
    setTimeout(() => {
      messageDiv.classList.remove('new-message');
    }, 400);
  }
  async sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;
    
    // Добавляем сообщение пользователя в чат
    this.addMessage(message, true);
    this.chatInput.value = '';
    
    // Показываем индикатор печати
    this.showTypingIndicator();
    
    // Отправляем сообщение в Telegram
    const sent = await this.sendToTelegram(message);
      if (sent) {
      // Запускаем проверку ответов если еще не запущена
      if (!this.pollingInterval) {
        this.startPollingForReplies();
      }
      
      // Немедленно проверяем ответы после отправки
      setTimeout(() => {
        console.log('🔍 Дополнительная проверка ответов через 2 секунды...');
        this.checkForReplies();
      }, 2000);      // Показываем сообщение об успешной отправке
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMessage(this.getTranslation('chat_message_sent'));
      }, 1000);
    } else {      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMessage(this.getTranslation('chat_message_error'));
      }, 1000);
    }
  }
  async sendToTelegram(message) {
    try {
      console.log('📤 Отправляем сообщение на сервер...');
      
      // Отправляем сообщение через Python сервер с таймаутом
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 секунд таймаут
      
      const response = await fetch(TELEGRAM_CONFIG.SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          userId: this.userId
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log(`📡 Ответ сервера: ${response.status}`);
      
      if (response.ok) {
        const result = await response.json();
        console.log('📥 Данные от сервера:', result);
        
        if (result.success) {
          console.log('✅ Сообщение успешно принято сервером');
          return true;
        } else {
          console.error('❌ Сервер вернул ошибку:', result.error);
          return false;
        }
      } else {
        console.error(`❌ HTTP ошибка: ${response.status}`);
        return false;
      }
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('⏱️ Таймаут запроса к серверу');
      } else {
        console.error('❌ Ошибка отправки:', error.message);
      }
      console.log('💡 Убедитесь, что Python сервер запущен');
      return false;
    }
  }  showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-content">
        <p>${this.getTranslation('chat_typing')}</p>
      </div>
    `;
    this.chatMessages.appendChild(typingDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
  
  hideTypingIndicator() {
    const typingIndicator = this.chatMessages.querySelector('.typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
    // Метод для получения ответов от Python бота
  receiveMessage(content, senderName = 'Поддержка') {
    this.addMessage(content, false, null, senderName);
    if (!this.isOpen) {
      this.showNotification();
    }
  }
    // Запуск проверки ответов из Telegram
  startPollingForReplies() {
    console.log(`🔄 Запуск проверки ответов из Telegram для userId: ${this.userId}...`);
    if (this.pollingInterval) {
      console.log('⚠️ Polling уже запущен, пропускаем');
      return;
    }
    this.pollingInterval = setInterval(() => {
      this.checkForReplies();
    }, 5000); // Проверяем каждые 5 секунд
    console.log('✅ Polling успешно запущен');
  }
  
  // Остановка проверки ответов
  stopPollingForReplies() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      console.log('🛑 Остановка проверки ответов');
    }  }
  
  // Проверка новых ответов с сервера
  async checkForReplies() {
    try {
      console.log(`🔍 Проверяем ответы для пользователя: ${this.userId}`);
      const response = await fetch(`${TELEGRAM_CONFIG.SERVER_URL}/get-replies/${this.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log(`📡 Ответ сервера: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📦 Данные с сервера:', data);
        
        if (data.success && data.replies && data.replies.length > 0) {
          console.log(`📬 Получено ${data.replies.length} новых ответов`);
          
          // Отображаем каждый ответ
          data.replies.forEach(reply => {
            console.log('💬 Отображаем ответ:', reply.message);
            this.hideTypingIndicator(); // Убираем индикатор печати если есть
            this.addMessage(reply.message, false, null, this.getTranslation('chat_support_name'));
            
            // Показываем уведомление если чат закрыт
            if (!this.isOpen) {
              this.showNotification();
            }
          });
        } else {
          console.log('📭 Новых ответов нет');
        }
      } else {
        console.warn(`⚠️ Ошибка запроса: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Ошибка проверки ответов:', error);
    }
  }
}

// Инициализация чата при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Инициализация Telegram чата...');
  window.telegramChat = new TelegramWebChat();
  console.log('✅ Telegram чат создан:', window.telegramChat);
  
  // Принудительно запускаем polling через 5 секунд
  setTimeout(() => {
    console.log('🔄 Принудительный запуск polling...');
    if (window.telegramChat && typeof window.telegramChat.startPollingForReplies === 'function') {
      window.telegramChat.startPollingForReplies();
      console.log('✅ Polling запущен принудительно');
    } else {
      console.error('❌ Не удалось запустить polling - чат не готов');
    }
  }, 5000);
});
