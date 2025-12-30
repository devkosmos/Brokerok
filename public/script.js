const tg = window.Telegram.WebApp;

tg.ready();
document.documentElement.style.width = '100%';
document.body.style.width = '100%';
document.body.style.maxWidth = '100%';

tg.expand();



function setTelegramVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--tg-vh', `${vh * 100}px`);
}

const isTelegram = !!window.Telegram?.WebApp;

if (isTelegram) {
  document.body.classList.add('telegram-app');
}


setTelegramVh();
window.addEventListener('resize', setTelegramVh);

document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const notification = document.getElementById('notification');
    const notificationTitle = document.getElementById('notification-title');
    const notificationMessage = document.getElementById('notification-message');
    const consultationBtn = document.getElementById('consultationBtn');
    const categoryCards = document.querySelectorAll('.category-card');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentTabs = document.querySelectorAll('.main-content, .services-tab, .about-tab, .contacts-tab');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    
    // Кнопки переключения языка
    const languageBtns = document.querySelectorAll('.language-btn');
    
    // Элементы формы
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtn1 = document.getElementById('nextBtn1');
    const nextBtn2 = document.getElementById('nextBtn2');
    const nextBtn3 = document.getElementById('nextBtn3');
    const prevBtn2 = document.getElementById('prevBtn2');
    const prevBtn3 = document.getElementById('prevBtn3');
    const newRequestBtn = document.getElementById('newRequestBtn');
    const printBtn = document.getElementById('printBtn');
    
    const optionCards = document.querySelectorAll('.option-card');
    const serviceCategories = document.querySelectorAll('.service-category');
    const detailsCategories = document.querySelectorAll('.details-category');
    
    // Элементы ценового слайдера
    const priceMinSlider = document.getElementById('minPrice');
    const priceMaxSlider = document.getElementById('maxPrice');
    const minPriceLabel = document.getElementById('minPriceLabel');
    const maxPriceLabel = document.getElementById('maxPriceLabel');
    const sliderRange = document.getElementById('sliderRange');
    
    // Элементы улучшенного слайдера годов
    const yearSliderMin = document.getElementById('yearSliderMin');
    const yearSliderMax = document.getElementById('yearSliderMax');
    const displayMinYear = document.getElementById('displayMinYear');
    const displayMaxYear = document.getElementById('displayMaxYear');
    const minYearBox = document.getElementById('minYearBox');
    const maxYearBox = document.getElementById('maxYearBox');
    const resetYearBtn = document.getElementById('resetYearBtn');
    const yearTicks = document.querySelectorAll('.year-tick');
    
    // Модальное окно мессенджера
    const messengerModal = document.getElementById('messengerModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const messengerOptions = document.querySelectorAll('.messenger-option');
    const whatsappForm = document.getElementById('whatsappForm');
    const telegramForm = document.getElementById('telegramForm');
    const backToChoiceBtn = document.getElementById('backToChoiceBtn');
    const backToChoiceBtnTg = document.getElementById('backToChoiceBtnTg');
    const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
    const sendTelegramBtn = document.getElementById('sendTelegramBtn');
    
    // Элементы выбора
    const allOptionTags = document.querySelectorAll('.option-tag');
    const financingTags = document.querySelectorAll('.option-tag[data-financing]');
    const timeTags = document.querySelectorAll('.option-tag[data-time]');
    
    // Текстовые поля
    const additionalInfo = document.getElementById('additionalInfo');
    const clientName = document.getElementById('clientName');
    const clientPhone = document.getElementById('clientPhone');
    const clientEmail = document.getElementById('clientEmail');
    const realtyLocation = document.getElementById('realty-location');
    
    // Формы мессенджера
    const whatsappName = document.getElementById('whatsappName');
    const whatsappPhone = document.getElementById('whatsappPhone');
    const whatsappCode = document.getElementById('whatsappCode');
    const telegramName = document.getElementById('telegramName');
    const telegramUsername = document.getElementById('telegramUsername');
    const telegramMessage = document.getElementById('telegramMessage');
    
    // Элементы сводки
    const summaryCategory = document.getElementById('summaryCategory');
    const summaryService = document.getElementById('summaryService');
    const summaryDetails = document.getElementById('summaryDetails');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryFinancing = document.getElementById('summaryFinancing');
    const summaryContacts = document.getElementById('summaryContacts');
    const summaryTime = document.getElementById('summaryTime');
    const summaryAdditional = document.getElementById('summaryAdditional');
    const summaryAdditionalContainer = document.getElementById('summaryAdditionalContainer');
    const summaryDateTime = document.getElementById('summaryDateTime');
    
    // Текущий язык (по умолчанию русский)
    let currentLanguage = 'ru';
    
    // Переводы для разных языков
    const translations = {
        'ru': {
            // Навигация
            'company_name': 'BROKEROK',
            'company_subtitle': 'ПРЕМИУМ УСЛУГИ',
            'nav_home': 'Главная',
            'nav_services': 'Услуги',
            'nav_about': 'О компании',
            'nav_contacts': 'Контакты',
            'consultation_btn': 'Консультация',
            'not_specified': 'Не указано',
            
            // Главная страница
            'main_title1': 'Экспертные услуги',
            'main_title2': 'в сфере недвижимости, авто и бизнеса',
            'main_description': 'Мы предоставляем полный спектр премиальных услуг: покупка и продажа недвижимости, автомобилей, открытие бизнеса и юридическое сопровождение. Более 15 лет на рынке.',
            'feature1': 'Безопасность сделок',
            'feature2': 'Премиум сервис',
            'feature3': 'Личный менеджер',
            'feature4': 'Экономия времени',
            'category_title': 'Выберите категорию услуг',
            'category_realty': 'Недвижимость',
            'category_realty_desc': 'Покупка, продажа, аренда, сопровождение сделок',
            'category_auto': 'Автомобили',
            'category_auto_desc': 'Покупка, продажа, трейд-ин, оформление',
            'category_business': 'Бизнес-услуги',
            'category_business_desc': 'Открытие ИП/ООО, бухгалтерия, лицензии',
            'category_legal': 'Юридические услуги',
            'category_legal_desc': 'Консультации, сопровождение, судебные споры',
            
            // Форма
            'form_title': 'Заявка на услуги',
            'form_subtitle': 'Выберите категорию услуг для начала',
            'step1_label': 'Услуга',
            'step2_label': 'Детали',
            'step3_label': 'Бюджет',
            'step4_label': 'Готово',
            'step1_title': 'Выберите услугу',
            'step2_title': 'Уточните детали',
            'step3_title': 'Бюджет и контакты',
            
            // Услуги
            'service_purchase': 'Покупка недвижимости',
            'service_purchase_desc': 'Подбор и покупка квартир, домов, коммерческой недвижимости',
            'service_sale': 'Продажа недвижимости',
            'service_sale_desc': 'Оценка, подготовка и продажа вашей недвижимости',
            'service_rent': 'Аренда',
            'service_rent_desc': 'Аренда жилой и коммерческой недвижимости',
            'service_support': 'Сопровождение сделки',
            'service_support_desc': 'Юридическое сопровождение и проверка документов',
            'service_purchase_auto': 'Покупка автомобиля',
            'service_purchase_auto_desc': 'Подбор и покупка новых и подержанных автомобилей',
            'service_sale_auto': 'Продажа автомобиля',
            'service_sale_auto_desc': 'Оценка, подготовка и продажа вашего автомобиля',
            'service_tradein': 'Трейд-ин',
            'service_tradein_desc': 'Обмен вашего автомобиля на новый с доплатой',
            'service_registration': 'Оформление документов',
            'service_registration_desc': 'Полное оформление документов на автомобиль',
            'service_open_ip': 'Открытие ИП',
            'service_open_ip_desc': 'Полная регистрация индивидуального предпринимателя',
            'service_open_ooo': 'Открытие ООО',
            'service_open_ooo_desc': 'Регистрация общества с ограниченной ответственностью',
            'service_accounting': 'Бухгалтерские услуги',
            'service_accounting_desc': 'Полное бухгалтерское сопровождение бизнеса',
            'service_licensing': 'Лицензирование',
            'service_licensing_desc': 'Оформление лицензий для различных видов деятельности',
            'service_consultation': 'Юридическая консультация',
            'service_consultation_desc': 'Консультации по юридическим вопросам',
            'service_deal_support': 'Сопровождение сделок',
            'service_deal_support_desc': 'Юридическое сопровождение различных сделок',
            'service_court': 'Судебные споры',
            'service_court_desc': 'Представление интересов в суде',
            'service_contracts': 'Составление договоров',
            'service_contracts_desc': 'Разработка и проверка договоров',
            
            // Детали
            'detail_realty_type': 'Тип недвижимости:',
            'detail_apartment': 'Квартира',
            'detail_house': 'Частный дом',
            'detail_cottage': 'Коттедж',
            'detail_commercial': 'Коммерческая',
            'detail_land': 'Земельный участок',
            'detail_rooms': 'Количество комнат:',
            'detail_studio': 'Студия',
            'detail_1room': '1-комн.',
            'detail_2rooms': '2-комн.',
            'detail_3rooms': '3-комн.',
            'detail_4rooms': '4+ комн.',
            'detail_location': 'Район/локация:',
            'detail_location_placeholder': 'Например: центр города, пригород...',
            'detail_car_type': 'Тип автомобиля:',
            'detail_sedan': 'Седан',
            'detail_suv': 'Внедорожник',
            'detail_hatchback': 'Хэтчбек',
            'detail_coupe': 'Купе',
            'detail_minivan': 'Минивэн',
            'detail_fuel': 'Тип топлива:',
            'detail_petrol': 'Бензин',
            'detail_diesel': 'Дизель',
            'detail_hybrid': 'Гибрид',
            'detail_electric': 'Электро',
            'detail_transmission': 'Коробка передач:',
            'detail_manual': 'Механика',
            'detail_automatic': 'Автомат',
            'detail_robot': 'Робот',
            'detail_cvt': 'Вариатор',
            'detail_year': 'Год выпуска:',
            'year_from': 'ОТ',
            'year_to': 'ДО',
            'detail_business_type': 'Сфера деятельности:',
            'detail_trade': 'Торговля',
            'detail_services': 'Услуги',
            'detail_production': 'Производство',
            'detail_it': 'IT-технологии',
            'detail_construction': 'Строительство',
            'detail_employees': 'Количество сотрудников:',
            'detail_1_5': '1-5 человек',
            'detail_6_20': '6-20 человек',
            'detail_21_50': '21-50 человек',
            'detail_50plus': 'Более 50 человек',
            'detail_revenue': 'Оборот в месяц:',
            'detail_under500k': 'До 500 тыс. ₽',
            'detail_500k_2m': '500 тыс. - 2 млн ₽',
            'detail_2m_10m': '2-10 млн ₽',
            'detail_over10m': 'Более 10 млн ₽',
            'detail_law_field': 'Область права:',
            'detail_civil': 'Гражданское',
            'detail_criminal': 'Уголовное',
            'detail_arbitration': 'Арбитражное',
            'detail_family': 'Семейное',
            'detail_labor': 'Трудовое',
            'detail_client_type': 'Тип клиента:',
            'detail_individual': 'Физическое лицо',
            'detail_business': 'Юридическое лицо',
            'detail_entrepreneur': 'Индивидуальный предприниматель',
            'detail_urgency': 'Срочность:',
            'detail_urgent': 'Срочно (до 3 дней)',
            'detail_normal': 'Обычная (1-2 недели)',
            'detail_longterm': 'Долгосрочное сопровождение',
            'detail_additional': 'Дополнительные пожелания:',
            'detail_additional_placeholder': 'Опишите дополнительные требования, пожелания...',
            'detail_payment': 'Способ оплаты:',
            'detail_cash': 'Наличные',
            'detail_credit': 'Кредит',
            'detail_installment': 'Рассрочка',
            'detail_mixed': 'Смешанная',
            'detail_contact_time': 'Удобное время для связи:',
            'detail_morning': 'Утро (9:00-12:00)',
            'detail_day': 'День (12:00-18:00)',
            'detail_evening': 'Вечер (18:00-21:00)',
            'detail_any': 'Любое время',
            
            // Контактная форма
            'form_name': 'Ваше имя',
            'form_name_placeholder': 'Иван Иванов',
            'form_phone': 'Телефон',
            'form_phone_placeholder': '+7 (999) 123-45-67',
            'form_email': 'Email',
            'form_email_placeholder': 'example@mail.ru',
            
            // Уведомления
            'notification_success': 'Заявка отправлена!',
            'notification_success_message': 'Мы свяжемся с вами в ближайшее время',
            'notification_error': 'Ошибка',
            'notification_select_service': 'Пожалуйста, выберите услугу',
            'notification_select_details': 'Пожалуйста, укажите детали услуги',
            'notification_name_error': 'Пожалуйста, введите ваше имя',
            'notification_phone_error': 'Пожалуйста, введите корректный номер телефона',
            'notification_email_error': 'Пожалуйста, введите корректный email',
            'notification_payment_error': 'Пожалуйста, выберите способ оплаты',
            'notification_time_error': 'Пожалуйста, выберите удобное время для связи',
            'notification_year_reset': 'Диапазон годов сброшен',
            'notification_form_reset': 'Форма сброшена. Начните новую заявку.',
            'notification_category_selected': 'Выбрана категория: ',
            'notification_service_selected': 'Выбрана услуга: ',
            
            // Успешная отправка
            'success_title': 'Заявка успешно отправлена!',
            'success_message': 'Ваш персональный менеджер свяжется с вами в удобное для вас время.',
            
            // Сводка
            'summary_title': 'Сводка вашей заявки',
            'summary_category': 'Категория:',
            'summary_service': 'Услуга:',
            'summary_details': 'Детали:',
            'summary_price': 'Бюджет:',
            'summary_financing': 'Способ оплаты:',
            'summary_contacts': 'Контактные данные:',
            'summary_time': 'Время связи:',
            'summary_additional': 'Дополнительные пожелания:',
            'summary_datetime': 'Дата и время отправки:',
            
            // Кнопки
            'btn_next': 'Далее',
            'btn_back': 'Назад',
            'btn_submit': 'Отправить заявку',
            'btn_new_request': 'Новая заявка',
            'btn_print': 'Распечатать',
            'btn_reset': 'Сбросить',
            
            // Услуги (таб)
            'services_title': 'Наши услуги',
            'service_card_realty': 'Недвижимость',
            'service_card_realty_desc': 'Полный спектр услуг в сфере недвижимости: покупка, продажа, аренда, ипотека, юридическое сопровождение.',
            'service_realty_item1': 'Покупка недвижимости',
            'service_realty_item2': 'Продажа недвижимости',
            'service_realty_item3': 'Аренда жилья',
            'service_realty_item4': 'Ипотечное кредитование',
            'service_realty_item5': 'Юридическое сопровождение',
            'service_card_auto': 'Автомобили',
            'service_card_auto_desc': 'Покупка и продажа автомобилей, трейд-ин, оформление документов, проверка истории автомобиля.',
            'service_auto_item1': 'Покупка автомобилей',
            'service_auto_item2': 'Продажа автомобилей',
            'service_auto_item3': 'Трейд-ин программа',
            'service_auto_item4': 'Оформление документов',
            'service_auto_item5': 'Проверка истории',
            'service_card_business': 'Бизнес-услуги',
            'service_card_business_desc': 'Регистрация ИП и ООО, бухгалтерское сопровождение, налоговое консультирование, лицензирование.',
            'service_business_item1': 'Регистрация ИП/ООО',
            'service_business_item2': 'Бухгалтерские услуги',
            'service_business_item3': 'Налоговое консультирование',
            'service_business_item4': 'Лицензирование',
            'service_business_item5': 'Открытие расчетного счета',
            'service_card_legal': 'Юридические услуги',
            'service_card_legal_desc': 'Юридические консультации, сопровождение сделок, судебные споры, составление договоров.',
            'service_legal_item1': 'Юридические консультации',
            'service_legal_item2': 'Сопровождение сделок',
            'service_legal_item3': 'Судебные споры',
            'service_legal_item4': 'Составление договоров',
            'service_legal_item5': 'Регистрация прав',
            
            // О компании
            'about_title': 'О компании',
            'about_subtitle': 'Brokerok - Ваш надежный партнер',
            'about_description': 'Мы работаем на рынке премиальных услуг с 2008 года. За это время мы помогли тысячам клиентов реализовать их планы в сфере недвижимости, автомобильного бизнеса и предпринимательства.',
            'stat_years': 'Лет на рынке',
            'stat_clients': 'Довольных клиентов',
            'stat_success': 'Успешных сделок',
            'stat_support': 'Поддержка клиентов',
            'principles_title': 'Наши принципы',
            'principle1_title': 'Надежность',
            'principle1_desc': 'Гарантируем безопасность каждой сделки',
            'principle2_title': 'Качество',
            'principle2_desc': 'Высокие стандарты обслуживания',
            'principle3_title': 'Индивидуальный подход',
            'principle3_desc': 'Учет всех пожеланий клиента',
            'principle4_title': 'Конфиденциальность',
            'principle4_desc': 'Полная защита ваших данных',
            
            // Контакты
            'contacts_title': 'Контакты',
            'contact_address': 'Адрес офиса',
            'address_text': 'Москва, ул. Тверская, д. 10, офис 305',
            'contact_phones': 'Телефоны',
            'contact_email': 'Email',
            'contact_hours': 'Режим работы',
            'work_weekdays': 'Пн-Пт: 9:00-20:00',
            'work_saturday': 'Сб: 10:00-18:00',
            'work_sunday': 'Вс: выходной',
            'map_placeholder': 'Карта расположения офиса',
            'footer_text': '© 2023 Brokerok. Все права защищены. Премиум услуги в сфере недвижимости, автомобилей и бизнеса.',
            'footer_address': 'Москва, ул. Тверская, д. 10',
            
            // Модальное окно мессенджера
            'messenger_title': 'Выберите удобный способ связи',
            'messenger_subtitle': 'Связаться с компанией',
            'messenger_whatsapp': 'WhatsApp',
            'messenger_whatsapp_desc': 'Мгновенная связь через WhatsApp',
            'messenger_telegram': 'Telegram',
            'messenger_telegram_desc': 'Отправка анкеты в Telegram',
            'form_telegram': 'Telegram username',
            'form_telegram_placeholder': '@username',
            'form_message': 'Сообщение',
            'form_message_placeholder': 'Ваше сообщение или вопрос...',
            'btn_open_whatsapp': 'Открыть WhatsApp',
            'btn_send_telegram': 'Отправить в Telegram',
            'notification_whatsapp_opened': 'WhatsApp открыт с предзаполненным сообщением',
            'notification_telegram_ready': 'Анкета готова к отправке в Telegram. В реальном приложении здесь будет интеграция с Telegram Bot API.'
        },
        'en': {
            // Навигация
            'company_name': 'BROKEROK',
            'company_subtitle': 'PREMIUM SERVICES',
            'nav_home': 'Home',
            'nav_services': 'Services',
            'nav_about': 'About',
            'nav_contacts': 'Contacts',
            'consultation_btn': 'Consultation',
            'not_specified': 'Not specified',
            
            // Главная страница
            'main_title1': 'Expert services',
            'main_title2': 'in real estate, auto and business',
            'main_description': 'We provide a full range of premium services: purchase and sale of real estate, cars, business setup and legal support. Over 15 years on the market.',
            'feature1': 'Transaction security',
            'feature2': 'Premium service',
            'feature3': 'Personal manager',
            'feature4': 'Time saving',
            'category_title': 'Select service category',
            'category_realty': 'Real Estate',
            'category_realty_desc': 'Purchase, sale, rental, transaction support',
            'category_auto': 'Automobiles',
            'category_auto_desc': 'Purchase, sale, trade-in, registration',
            'category_business': 'Business Services',
            'category_business_desc': 'Opening LLC/IE, accounting, licenses',
            'category_legal': 'Legal Services',
            'category_legal_desc': 'Consultations, support, litigation',
            
            // Форма
            'form_title': 'Service Request',
            'form_subtitle': 'Select a service category to start',
            'step1_label': 'Service',
            'step2_label': 'Details',
            'step3_label': 'Budget',
            'step4_label': 'Complete',
            'step1_title': 'Select service',
            'step2_title': 'Specify details',
            'step3_title': 'Budget and contacts',
            
            // Услуги
            'service_purchase': 'Real Estate Purchase',
            'service_purchase_desc': 'Selection and purchase of apartments, houses, commercial real estate',
            'service_sale': 'Real Estate Sale',
            'service_sale_desc': 'Valuation, preparation and sale of your property',
            'service_rent': 'Rental',
            'service_rent_desc': 'Residential and commercial property rental',
            'service_support': 'Transaction Support',
            'service_support_desc': 'Legal support and document verification',
            'service_purchase_auto': 'Car Purchase',
            'service_purchase_auto_desc': 'Selection and purchase of new and used cars',
            'service_sale_auto': 'Car Sale',
            'service_sale_auto_desc': 'Valuation, preparation and sale of your car',
            'service_tradein': 'Trade-in',
            'service_tradein_desc': 'Exchange your car for a new one with payment',
            'service_registration': 'Document Registration',
            'service_registration_desc': 'Complete car document registration',
            'service_open_ip': 'Open IE',
            'service_open_ip_desc': 'Full registration of individual entrepreneur',
            'service_open_ooo': 'Open LLC',
            'service_open_ooo_desc': 'Registration of limited liability company',
            'service_accounting': 'Accounting Services',
            'service_accounting_desc': 'Complete business accounting support',
            'service_licensing': 'Licensing',
            'service_licensing_desc': 'Obtaining licenses for various activities',
            'service_consultation': 'Legal Consultation',
            'service_consultation_desc': 'Consultations on legal issues',
            'service_deal_support': 'Deal Support',
            'service_deal_support_desc': 'Legal support of various transactions',
            'service_court': 'Litigation',
            'service_court_desc': 'Representation in court',
            'service_contracts': 'Contract Preparation',
            'service_contracts_desc': 'Development and verification of contracts',
            
            // Детали
            'detail_realty_type': 'Property type:',
            'detail_apartment': 'Apartment',
            'detail_house': 'Private House',
            'detail_cottage': 'Cottage',
            'detail_commercial': 'Commercial',
            'detail_land': 'Land Plot',
            'detail_rooms': 'Number of rooms:',
            'detail_studio': 'Studio',
            'detail_1room': '1-room',
            'detail_2rooms': '2-room',
            'detail_3rooms': '3-room',
            'detail_4rooms': '4+ rooms',
            'detail_location': 'Area/location:',
            'detail_location_placeholder': 'For example: city center, suburbs...',
            'detail_car_type': 'Car type:',
            'detail_sedan': 'Sedan',
            'detail_suv': 'SUV',
            'detail_hatchback': 'Hatchback',
            'detail_coupe': 'Coupe',
            'detail_minivan': 'Minivan',
            'detail_fuel': 'Fuel type:',
            'detail_petrol': 'Petrol',
            'detail_diesel': 'Diesel',
            'detail_hybrid': 'Hybrid',
            'detail_electric': 'Electric',
            'detail_transmission': 'Transmission:',
            'detail_manual': 'Manual',
            'detail_automatic': 'Automatic',
            'detail_robot': 'Robot',
            'detail_cvt': 'CVT',
            'detail_year': 'Year of manufacture:',
            'year_from': 'FROM',
            'year_to': 'TO',
            'detail_business_type': 'Business field:',
            'detail_trade': 'Trade',
            'detail_services': 'Services',
            'detail_production': 'Production',
            'detail_it': 'IT Technologies',
            'detail_construction': 'Construction',
            'detail_employees': 'Number of employees:',
            'detail_1_5': '1-5 people',
            'detail_6_20': '6-20 people',
            'detail_21_50': '21-50 people',
            'detail_50plus': 'More than 50 people',
            'detail_revenue': 'Monthly turnover:',
            'detail_under500k': 'Up to 500k ₽',
            'detail_500k_2m': '500k - 2m ₽',
            'detail_2m_10m': '2-10m ₽',
            'detail_over10m': 'More than 10m ₽',
            'detail_law_field': 'Law field:',
            'detail_civil': 'Civil',
            'detail_criminal': 'Criminal',
            'detail_arbitration': 'Arbitration',
            'detail_family': 'Family',
            'detail_labor': 'Labor',
            'detail_client_type': 'Client type:',
            'detail_individual': 'Individual',
            'detail_business': 'Legal entity',
            'detail_entrepreneur': 'Individual entrepreneur',
            'detail_urgency': 'Urgency:',
            'detail_urgent': 'Urgent (up to 3 days)',
            'detail_normal': 'Normal (1-2 weeks)',
            'detail_longterm': 'Long-term support',
            'detail_additional': 'Additional wishes:',
            'detail_additional_placeholder': 'Describe additional requirements, wishes...',
            'detail_payment': 'Payment method:',
            'detail_cash': 'Cash',
            'detail_credit': 'Credit',
            'detail_installment': 'Installment',
            'detail_mixed': 'Mixed',
            'detail_contact_time': 'Convenient time to contact:',
            'detail_morning': 'Morning (9:00-12:00)',
            'detail_day': 'Day (12:00-18:00)',
            'detail_evening': 'Evening (18:00-21:00)',
            'detail_any': 'Any time',
            
            // Контактная форма
            'form_name': 'Your name',
            'form_name_placeholder': 'John Smith',
            'form_phone': 'Phone',
            'form_phone_placeholder': '+7 (999) 123-45-67',
            'form_email': 'Email',
            'form_email_placeholder': 'example@mail.com',
            
            // Уведомления
            'notification_success': 'Request sent!',
            'notification_success_message': 'We will contact you shortly',
            'notification_error': 'Error',
            'notification_select_service': 'Please select a service',
            'notification_select_details': 'Please specify service details',
            'notification_name_error': 'Please enter your name',
            'notification_phone_error': 'Please enter a valid phone number',
            'notification_email_error': 'Please enter a valid email',
            'notification_payment_error': 'Please select payment method',
            'notification_time_error': 'Please select convenient contact time',
            'notification_year_reset': 'Year range reset',
            'notification_form_reset': 'Form reset. Start a new request.',
            'notification_category_selected': 'Category selected: ',
            'notification_service_selected': 'Service selected: ',
            
            // Успешная отправка
            'success_title': 'Request successfully sent!',
            'success_message': 'Your personal manager will contact you at your convenient time.',
            
            // Сводка
            'summary_title': 'Your request summary',
            'summary_category': 'Category:',
            'summary_service': 'Service:',
            'summary_details': 'Details:',
            'summary_price': 'Budget:',
            'summary_financing': 'Payment method:',
            'summary_contacts': 'Contact details:',
            'summary_time': 'Contact time:',
            'summary_additional': 'Additional wishes:',
            'summary_datetime': 'Date and time sent:',
            
            // Кнопки
            'btn_next': 'Next',
            'btn_back': 'Back',
            'btn_submit': 'Submit request',
            'btn_new_request': 'New request',
            'btn_print': 'Print',
            'btn_reset': 'Reset',
            
            // Услуги (таб)
            'services_title': 'Our services',
            'service_card_realty': 'Real Estate',
            'service_card_realty_desc': 'Full range of real estate services: purchase, sale, rental, mortgage, legal support.',
            'service_realty_item1': 'Real estate purchase',
            'service_realty_item2': 'Real estate sale',
            'service_realty_item3': 'Housing rental',
            'service_realty_item4': 'Mortgage lending',
            'service_realty_item5': 'Legal support',
            'service_card_auto': 'Automobiles',
            'service_card_auto_desc': 'Car purchase and sale, trade-in, document registration, vehicle history check.',
            'service_auto_item1': 'Car purchase',
            'service_auto_item2': 'Car sale',
            'service_auto_item3': 'Trade-in program',
            'service_auto_item4': 'Document registration',
            'service_auto_item5': 'History check',
            'service_card_business': 'Business Services',
            'service_card_business_desc': 'IE and LLC registration, accounting support, tax consulting, licensing.',
            'service_business_item1': 'IE/LLC registration',
            'service_business_item2': 'Accounting services',
            'service_business_item3': 'Tax consulting',
            'service_business_item4': 'Licensing',
            'service_business_item5': 'Opening bank account',
            'service_card_legal': 'Legal Services',
            'service_card_legal_desc': 'Legal consultations, deal support, litigation, contract preparation.',
            'service_legal_item1': 'Legal consultations',
            'service_legal_item2': 'Deal support',
            'service_legal_item3': 'Litigation',
            'service_legal_item4': 'Contract preparation',
            'service_legal_item5': 'Rights registration',
            
            // О компании
            'about_title': 'About company',
            'about_subtitle': 'Brokerok - Your reliable partner',
            'about_description': 'We have been working in the premium services market since 2008. During this time, we have helped thousands of clients realize their plans in real estate, automotive business and entrepreneurship.',
            'stat_years': 'Years on market',
            'stat_clients': 'Satisfied clients',
            'stat_success': 'Successful deals',
            'stat_support': 'Customer support',
            'principles_title': 'Our principles',
            'principle1_title': 'Reliability',
            'principle1_desc': 'We guarantee security of every deal',
            'principle2_title': 'Quality',
            'principle2_desc': 'High service standards',
            'principle3_title': 'Individual approach',
            'principle3_desc': 'Consideration of all client wishes',
            'principle4_title': 'Confidentiality',
            'principle4_desc': 'Complete protection of your data',
            
            // Контакты
            'contacts_title': 'Contacts',
            'contact_address': 'Office address',
            'address_text': 'Moscow, Tverskaya str., 10, office 305',
            'contact_phones': 'Phones',
            'contact_email': 'Email',
            'contact_hours': 'Working hours',
            'work_weekdays': 'Mon-Fri: 9:00-20:00',
            'work_saturday': 'Sat: 10:00-18:00',
            'work_sunday': 'Sun: day off',
            'map_placeholder': 'Office location map',
            'footer_text': '© 2023 Brokerok. All rights reserved. Premium services in real estate, automobiles and business.',
            'footer_address': 'Moscow, Tverskaya str., 10',
            
            // Модальное окно мессенджера
            'messenger_title': 'Choose convenient contact method',
            'messenger_subtitle': 'Contact the company',
            'messenger_whatsapp': 'WhatsApp',
            'messenger_whatsapp_desc': 'Instant communication via WhatsApp',
            'messenger_telegram': 'Telegram',
            'messenger_telegram_desc': 'Send application to Telegram',
            'form_telegram': 'Telegram username',
            'form_telegram_placeholder': '@username',
            'form_message': 'Message',
            'form_message_placeholder': 'Your message or question...',
            'btn_open_whatsapp': 'Open WhatsApp',
            'btn_send_telegram': 'Send to Telegram',
            'notification_whatsapp_opened': 'WhatsApp opened with pre-filled message',
            'notification_telegram_ready': 'Application ready to send to Telegram. In real application there will be Telegram Bot API integration.'
        },
        'tr': {
            // Навигация
            'company_name': 'BROKEROK',
            'company_subtitle': 'PREMIUM HİZMETLER',
            'nav_home': 'Ana Sayfa',
            'nav_services': 'Hizmetler',
            'nav_about': 'Hakkımızda',
            'nav_contacts': 'İletişim',
            'consultation_btn': 'Danışma',
            'not_specified': 'Belirtilmedi',
            
            // Главная страница
            'main_title1': 'Uzman hizmetler',
            'main_title2': 'emlak, otomobil ve iş dünyasında',
            'main_description': 'Emlak satın alma ve satışı, araçlar, iş kurulumu ve yasal destek dahil olmak üzere tam kapsamlı premium hizmetler sunuyoruz. Piyasada 15 yılı aşkın deneyim.',
            'feature1': 'İşlem güvenliği',
            'feature2': 'Premium servis',
            'feature3': 'Kişisel yönetici',
            'feature4': 'Zaman tasarrufu',
            'category_title': 'Hizmet kategorisi seçin',
            'category_realty': 'Emlak',
            'category_realty_desc': 'Satın alma, satış, kiralama, işlem desteği',
            'category_auto': 'Otomobiller',
            'category_auto_desc': 'Satın alma, satış, takas, kayıt',
            'category_business': 'İş Hizmetleri',
            'category_business_desc': 'ŞTİ/Şahıs Şirketi açma, muhasebe, lisanslar',
            'category_legal': 'Yasal Hizmetler',
            'category_legal_desc': 'Danışmanlık, destek, dava takibi',
            
            // Форма
            'form_title': 'Hizmet Talebi',
            'form_subtitle': 'Başlamak için hizmet kategorisi seçin',
            'step1_label': 'Hizmet',
            'step2_label': 'Detaylar',
            'step3_label': 'Bütçe',
            'step4_label': 'Tamamlandı',
            'step1_title': 'Hizmet seçin',
            'step2_title': 'Detayları belirtin',
            'step3_title': 'Bütçe ve iletişim',
            
            // Услуги
            'service_purchase': 'Emlak Satın Alma',
            'service_purchase_desc': 'Daire, ev, ticari emlak seçimi ve satın alma',
            'service_sale': 'Emlak Satışı',
            'service_sale_desc': 'Emlak değerleme, hazırlama ve satışı',
            'service_rent': 'Kiralama',
            'service_rent_desc': 'Konut ve ticari emlak kiralama',
            'service_support': 'İşlem Desteği',
            'service_support_desc': 'Yasal destek ve belge doğrulama',
            'service_purchase_auto': 'Araç Satın Alma',
            'service_purchase_auto_desc': 'Yeni ve ikinci el araç seçimi ve satın alma',
            'service_sale_auto': 'Araç Satışı',
            'service_sale_auto_desc': 'Araç değerleme, hazırlama ve satışı',
            'service_tradein': 'Takas',
            'service_tradein_desc': 'Aracınızı ödemeli olarak yenisiyle takas',
            'service_registration': 'Belge Kaydı',
            'service_registration_desc': 'Tam araç belge kaydı',
            'service_open_ip': 'Şahıs Şirketi Açma',
            'service_open_ip_desc': 'Tam bireysel girişimci kaydı',
            'service_open_ooo': 'ŞTİ Açma',
            'service_open_ooo_desc': 'Limited şirket kaydı',
            'service_accounting': 'Muhasebe Hizmetleri',
            'service_accounting_desc': 'Tam işletme muhasebe desteği',
            'service_licensing': 'Lisanslama',
            'service_licensing_desc': 'Çeşitli faaliyetler için lisans alımı',
            'service_consultation': 'Yasal Danışmanlık',
            'service_consultation_desc': 'Yasal konularda danışmanlık',
            'service_deal_support': 'İşlem Desteği',
            'service_deal_support_desc': 'Çeşitli işlemlerde yasal destek',
            'service_court': 'Dava Takibi',
            'service_court_desc': 'Mahkemede temsil',
            'service_contracts': 'Sözleşme Hazırlama',
            'service_contracts_desc': 'Sözleşme geliştirme ve doğrulama',
            
            // Детали
            'detail_realty_type': 'Emlak türü:',
            'detail_apartment': 'Daire',
            'detail_house': 'Özel Ev',
            'detail_cottage': 'Köşk',
            'detail_commercial': 'Ticari',
            'detail_land': 'Arsa',
            'detail_rooms': 'Oda sayısı:',
            'detail_studio': 'Stüdyo',
            'detail_1room': '1+1',
            'detail_2rooms': '2+1',
            'detail_3rooms': '3+1',
            'detail_4rooms': '4+ oda',
            'detail_location': 'Bölge/konum:',
            'detail_location_placeholder': 'Örneğin: şehir merkezi, banliyö...',
            'detail_car_type': 'Araç türü:',
            'detail_sedan': 'Sedan',
            'detail_suv': 'SUV',
            'detail_hatchback': 'Hatchback',
            'detail_coupe': 'Coupe',
            'detail_minivan': 'Minivan',
            'detail_fuel': 'Yakıt türü:',
            'detail_petrol': 'Benzin',
            'detail_diesel': 'Dizel',
            'detail_hybrid': 'Hibrit',
            'detail_electric': 'Elektrikli',
            'detail_transmission': 'Şanzıman:',
            'detail_manual': 'Manuel',
            'detail_automatic': 'Otomatik',
            'detail_robot': 'Robot',
            'detail_cvt': 'CVT',
            'detail_year': 'Üretim yılı:',
            'year_from': 'İTİBAREN',
            'year_to': 'KADAR',
            'detail_business_type': 'Faaliyet alanı:',
            'detail_trade': 'Ticaret',
            'detail_services': 'Hizmetler',
            'detail_production': 'Üretim',
            'detail_it': 'IT Teknolojileri',
            'detail_construction': 'İnşaat',
            'detail_employees': 'Çalışan sayısı:',
            'detail_1_5': '1-5 kişi',
            'detail_6_20': '6-20 kişi',
            'detail_21_50': '21-50 kişi',
            'detail_50plus': '50+ kişi',
            'detail_revenue': 'Aylık ciro:',
            'detail_under500k': '500 bin ₽ altı',
            'detail_500k_2m': '500 bin - 2 milyon ₽',
            'detail_2m_10m': '2-10 milyon ₽',
            'detail_over10m': '10 milyon ₽ üstü',
            'detail_law_field': 'Hukuk alanı:',
            'detail_civil': 'Medeni',
            'detail_criminal': 'Ceza',
            'detail_arbitration': 'Tahkim',
            'detail_family': 'Aile',
            'detail_labor': 'İş',
            'detail_client_type': 'Müşteri türü:',
            'detail_individual': 'Bireysel',
            'detail_business': 'Tüzel kişi',
            'detail_entrepreneur': 'Bireysel girişimci',
            'detail_urgency': 'Aciliyet:',
            'detail_urgent': 'Acil (3 güne kadar)',
            'detail_normal': 'Normal (1-2 hafta)',
            'detail_longterm': 'Uzun vadeli destek',
            'detail_additional': 'Ek istekler:',
            'detail_additional_placeholder': 'Ek gereksinimleri, istekleri açıklayın...',
            'detail_payment': 'Ödeme yöntemi:',
            'detail_cash': 'Nakit',
            'detail_credit': 'Kredi',
            'detail_installment': 'Taksit',
            'detail_mixed': 'Karma',
            'detail_contact_time': 'İletişim için uygun zaman:',
            'detail_morning': 'Sabah (9:00-12:00)',
            'detail_day': 'Gün (12:00-18:00)',
            'detail_evening': 'Akşam (18:00-21:00)',
            'detail_any': 'Herhangi bir zaman',
            
            // Контактная форма
            'form_name': 'Adınız',
            'form_name_placeholder': 'Ali Yılmaz',
            'form_phone': 'Telefon',
            'form_phone_placeholder': '+7 (999) 123-45-67',
            'form_email': 'Email',
            'form_email_placeholder': 'ornek@mail.com',
            
            // Уведомления
            'notification_success': 'Talep gönderildi!',
            'notification_success_message': 'En kısa sürede sizinle iletişime geçeceğiz',
            'notification_error': 'Hata',
            'notification_select_service': 'Lütfen bir hizmet seçin',
            'notification_select_details': 'Lütfen hizmet detaylarını belirtin',
            'notification_name_error': 'Lütfen adınızı girin',
            'notification_phone_error': 'Lütfen geçerli bir telefon numarası girin',
            'notification_email_error': 'Lütfen geçerli bir email girin',
            'notification_payment_error': 'Lütfen ödeme yöntemi seçin',
            'notification_time_error': 'Lütfen uygun iletişim zamanı seçin',
            'notification_year_reset': 'Yıl aralığı sıfırlandı',
            'notification_form_reset': 'Form sıfırlandı. Yeni bir talep başlatın.',
            'notification_category_selected': 'Kategori seçildi: ',
            'notification_service_selected': 'Hizmet seçildi: ',
            
            // Успешная отправка
            'success_title': 'Talep başarıyla gönderildi!',
            'success_message': 'Kişisel yöneticiniz uygun zamanınızda sizinle iletişime geçecektir.',
            
            // Сводка
            'summary_title': 'Talebinizin özeti',
            'summary_category': 'Kategori:',
            'summary_service': 'Hizmet:',
            'summary_details': 'Detaylar:',
            'summary_price': 'Bütçе:',
            'summary_financing': 'Ödeme yöntemi:',
            'summary_contacts': 'İletişim bilgileri:',
            'summary_time': 'İletişim zamanı:',
            'summary_additional': 'Ek istekler:',
            'summary_datetime': 'Gönderim tarihi ve saati:',
            
            // Кнопки
            'btn_next': 'İleri',
            'btn_back': 'Geri',
            'btn_submit': 'Talebi Gönder',
            'btn_new_request': 'Yeni Talep',
            'btn_print': 'Yazdır',
            'btn_reset': 'Sıfırla',
            
            // Услуги (таб)
            'services_title': 'Hizmetlerimiz',
            'service_card_realty': 'Emlak',
            'service_card_realty_desc': 'Emlak sektöründe tam kapsamlı hizmetler: satın alma, satış, kiralama, ipotek, yasal destek.',
            'service_realty_item1': 'Emlak satın alma',
            'service_realty_item2': 'Emlak satışı',
            'service_realty_item3': 'Konut kiralama',
            'service_realty_item4': 'İpotek kredisi',
            'service_realty_item5': 'Yasal destek',
            'service_card_auto': 'Otomobiller',
            'service_card_auto_desc': 'Araç satın alma ve satışı, takas, belge kaydı, araç geçmişi kontrolü.',
            'service_auto_item1': 'Araç satın alma',
            'service_auto_item2': 'Araç satışı',
            'service_auto_item3': 'Takas programı',
            'service_auto_item4': 'Belge kaydı',
            'service_auto_item5': 'Geçmiş kontrolü',
            'service_card_business': 'İş Hizmetleri',
            'service_card_business_desc': 'ŞTİ/Şahıs Şirketi kaydı, muhasebe desteği, vergi danışmanlığı, lisanslama.',
            'service_business_item1': 'ŞTİ/Şahıs Şirketi kaydı',
            'service_business_item2': 'Muhasebe hizmetleri',
            'service_business_item3': 'Vergi danışmanlığı',
            'service_business_item4': 'Lisanslama',
            'service_business_item5': 'Banka hesabı açma',
            'service_card_legal': 'Yasal Hizmetler',
            'service_card_legal_desc': 'Yasal danışmanlık, işlem desteği, dava takibi, sözleşme hazırlama.',
            'service_legal_item1': 'Yasal danışmanlık',
            'service_legal_item2': 'İşlem desteği',
            'service_legal_item3': 'Dava takibi',
            'service_legal_item4': 'Sözleşme hazırlama',
            'service_legal_item5': 'Hak kaydı',
            
            // О компании
            'about_title': 'Hakkımızda',
            'about_subtitle': 'Brokerok - Güvenilir partneriniz',
            'about_description': '2008 yılından beri premium hizmetler pazarında faaliyet gösteriyoruz. Bu süre zarfında binlerce müşterinin emlak, otomotiv işi ve girişimcilik alanındaki planlarını gerçekleştirmelerine yardımcı olduk.',
            'stat_years': 'Piyasa deneyimi',
            'stat_clients': 'Memnun müşteri',
            'stat_success': 'Başarılı işlem',
            'stat_support': 'Müşteri desteği',
            'principles_title': 'İlkelerimiz',
            'principle1_title': 'Güvenilirlik',
            'principle1_desc': 'Her işlemin güvenliğini garanti ediyoruz',
            'principle2_title': 'Kalite',
            'principle2_desc': 'Yüksek hizmet standartları',
            'principle3_title': 'Bireysel yaklaşım',
            'principle3_desc': 'Tüm müşteri isteklerinin dikkate alınması',
            'principle4_title': 'Gizlilik',
            'principle4_desc': 'Verilerinizin tam korunması',
            
            // Контакты
            'contacts_title': 'İletişim',
            'contact_address': 'Ofis adresi',
            'address_text': 'Moskova, Tverskaya cad., 10, ofis 305',
            'contact_phones': 'Telefonlar',
            'contact_email': 'Email',
            'contact_hours': 'Çalışma saatleri',
            'work_weekdays': 'Pzt-Cum: 9:00-20:00',
            'work_saturday': 'Cmt: 10:00-18:00',
            'work_sunday': 'Paz: kapalı',
            'map_placeholder': 'Ofis konumu haritası',
            'footer_text': '© 2023 Brokerok. Tüm hakları saklıdır. Emlak, otomobil ve iş dünyasında premium hizmetler.',
            'footer_address': 'Moskova, Tverskaya cad., 10',
            
            // Модальное окно мессенджера
            'messenger_title': 'Uygun iletişим yöntemini seçin',
            'messenger_subtitle': 'Şirketle iletişime geçin',
            'messenger_whatsapp': 'WhatsApp',
            'messenger_whatsapp_desc': 'WhatsApp üzerinden anında iletişim',
            'messenger_telegram': 'Telegram',
            'messenger_telegram_desc': 'Başvuruyu Telegram\'a gönder',
            'form_telegram': 'Telegram kullanıcı adı',
            'form_telegram_placeholder': '@kullaniciadi',
            'form_message': 'Mesaj',
            'form_message_placeholder': 'Mesajınız veya sorunuz...',
            'btn_open_whatsapp': 'WhatsApp\'ı Aç',
            'btn_send_telegram': 'Telegram\'a Gönder',
            'notification_whatsapp_opened': 'WhatsApp önceden doldurulmuş mesajla açıldı',
            'notification_telegram_ready': 'Başvuru Telegram\'a gönderilmeye hazır. Gerçek uygulamada Telegram Bot API entegrasyonu olacaktır.'
        }
    };
    
    // Данные формы
    let formData = {
        category: 'realty',
        service: null,
        details: [],
        minPrice: 100000,
        maxPrice: 10000000,
        financing: null,
        contactTime: null,
        additional: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        realtyLocation: '',
        yearRange: '2000-2023'
    };
    
    // Данные для мессенджера
    let selectedMessenger = null;
    let messengerFormData = {};
    
    let currentStep = 1;
    let currentYearMin = 2000;
    let currentYearMax = 2023;
    
    // Переводы для сервисов и категорий (хранятся отдельно для удобства)
    const categoryTranslations = {
        'ru': {
            'realty': 'Недвижимость',
            'auto': 'Автомобили',
            'business': 'Бизнес-услуги',
            'legal': 'Юридические услуги'
        },
        'en': {
            'realty': 'Real Estate',
            'auto': 'Automobiles',
            'business': 'Business Services',
            'legal': 'Legal Services'
        },
        'tr': {
            'realty': 'Emlak',
            'auto': 'Otomobiller',
            'business': 'İş Hizmetleri',
            'legal': 'Yasal Hizmetler'
        }
    };
    
    const serviceTranslations = {
        'ru': {
            // Недвижимость
            'purchase': 'Покупка недвижимости',
            'sale': 'Продажа недвижимости',
            'rent': 'Аренда недвижимости',
            'support': 'Сопровождение сделки',
            // Автомобили
            'purchase-auto': 'Покупка автомобиля',
            'sale-auto': 'Продажа автомобиля',
            'trade-in': 'Трейд-ин',
            'registration': 'Оформление документов',
            // Бизнес
            'open-ip': 'Открытие ИП',
            'open-ooo': 'Открытие ООО',
            'accounting': 'Бухгалтерские услуги',
            'licensing': 'Лицензирование',
            // Юридические
            'consultation': 'Юридическая консультация',
            'deal-support': 'Сопровождение сделок',
            'court': 'Судебные споры',
            'contracts': 'Составление договоров'
        },
        'en': {
            // Недвижимость
            'purchase': 'Real Estate Purchase',
            'sale': 'Real Estate Sale',
            'rent': 'Rental',
            'support': 'Transaction Support',
            // Автомобили
            'purchase-auto': 'Car Purchase',
            'sale-auto': 'Car Sale',
            'trade-in': 'Trade-in',
            'registration': 'Document Registration',
            // Бизнес
            'open-ip': 'Open IE',
            'open-ooo': 'Open LLC',
            'accounting': 'Accounting Services',
            'licensing': 'Licensing',
            // Юридические
            'consultation': 'Legal Consultation',
            'deal-support': 'Deal Support',
            'court': 'Litigation',
            'contracts': 'Contract Preparation'
        },
        'tr': {
            // Недвижимость
            'purchase': 'Emlak Satın Alma',
            'sale': 'Emlak Satışı',
            'rent': 'Kiralama',
            'support': 'İşlem Desteği',
            // Автомобили
            'purchase-auto': 'Araç Satın Alma',
            'sale-auto': 'Araç Satışı',
            'trade-in': 'Takas',
            'registration': 'Belge Kaydı',
            // Бизнес
            'open-ip': 'Şahıs Şirketi Açma',
            'open-ooo': 'ŞTİ Açma',
            'accounting': 'Muhasebe Hizmetleri',
            'licensing': 'Lisanslama',
            // Юридические
            'consultation': 'Yasal Danışmanlık',
            'deal-support': 'İşlem Desteği',
            'court': 'Dava Takibi',
            'contracts': 'Sözleşme Hazırlama'
        }
    };
    
    const detailTranslations = {
        'ru': {
            // Недвижимость
            'apartment': 'Квартира',
            'house': 'Частный дом',
            'cottage': 'Коттедж',
            'commercial': 'Коммерческая недвижимость',
            'land': 'Земельный участок',
            'studio': 'Студия',
            '1': '1-комнатная',
            '2': '2-комнатная',
            '3': '3-комнатная',
            '4+': '4+ комнат',
            // Автомобили
            'sedan': 'Седан',
            'suv': 'Внедорожник',
            'hatchback': 'Хэтчбек',
            'coupe': 'Купе',
            'minivan': 'Минивэн',
            'petrol': 'Бензин',
            'diesel': 'Дизель',
            'hybrid': 'Гибрид',
            'electric': 'Электро',
            'manual': 'Механика',
            'automatic': 'Автомат',
            'robot': 'Робот',
            'cvt': 'Вариатор',
            // Бизнес
            'trade': 'Торговля',
            'services': 'Услуги',
            'production': 'Производство',
            'it': 'IT-технологии',
            'construction': 'Строительство',
            '1-5': '1-5 человек',
            '6-20': '6-20 человек',
            '21-50': '21-50 человек',
            '50+': 'Более 50 человек',
            'under500k': 'До 500 тыс. ₽',
            '500k-2m': '500 тыс. - 2 млн ₽',
            '2m-10m': '2-10 млн ₽',
            'over10m': 'Более 10 млн ₽',
            // Юридические
            'civil': 'Гражданское право',
            'criminal': 'Уголовное право',
            'arbitration': 'Арбитражное право',
            'family': 'Семейное право',
            'labor': 'Трудовое право',
            'individual': 'Физическое лицо',
            'business': 'Юридическое лицо',
            'entrepreneur': 'Индивидуальный предприниматель',
            'urgent': 'Срочно (до 3 дней)',
            'normal': 'Обычная (1-2 недели)',
            'longterm': 'Долгосрочное сопровождение',
            // Финансирование
            'cash': 'Наличные',
            'credit': 'Кредит',
            'installment': 'Рассрочка',
            'mixed': 'Смешанная',
            // Время
            'morning': 'Утро (9:00-12:00)',
            'day': 'День (12:00-18:00)',
            'evening': 'Вечер (18:00-21:00)',
            'any': 'Любое время'
        },
        'en': {
            // Недвижимость
            'apartment': 'Apartment',
            'house': 'Private House',
            'cottage': 'Cottage',
            'commercial': 'Commercial',
            'land': 'Land Plot',
            'studio': 'Studio',
            '1': '1-room',
            '2': '2-room',
            '3': '3-room',
            '4+': '4+ rooms',
            // Автомобили
            'sedan': 'Sedan',
            'suv': 'SUV',
            'hatchback': 'Hatchback',
            'coupe': 'Coupe',
            'minivan': 'Minivan',
            'petrol': 'Petrol',
            'diesel': 'Diesel',
            'hybrid': 'Hybrid',
            'electric': 'Electric',
            'manual': 'Manual',
            'automatic': 'Automatic',
            'robot': 'Robot',
            'cvt': 'CVT',
            // Бизнес
            'trade': 'Trade',
            'services': 'Services',
            'production': 'Production',
            'it': 'IT Technologies',
            'construction': 'Construction',
            '1-5': '1-5 people',
            '6-20': '6-20 people',
            '21-50': '21-50 people',
            '50+': 'More than 50 people',
            'under500k': 'Up to 500k ₽',
            '500k-2m': '500k - 2m ₽',
            '2m-10m': '2-10m ₽',
            'over10m': 'More than 10m ₽',
            // Юридические
            'civil': 'Civil law',
            'criminal': 'Criminal law',
            'arbitration': 'Arbitration law',
            'family': 'Family law',
            'labor': 'Labor law',
            'individual': 'Individual',
            'business': 'Legal entity',
            'entrepreneur': 'Individual entrepreneur',
            'urgent': 'Urgent (up to 3 days)',
            'normal': 'Normal (1-2 weeks)',
            'longterm': 'Long-term support',
            // Финансирование
            'cash': 'Cash',
            'credit': 'Credit',
            'installment': 'Installment',
            'mixed': 'Mixed',
            // Время
            'morning': 'Morning (9:00-12:00)',
            'day': 'Day (12:00-18:00)',
            'evening': 'Evening (18:00-21:00)',
            'any': 'Any time'
        },
        'tr': {
            // Недвижимость
            'apartment': 'Daire',
            'house': 'Özel Ev',
            'cottage': 'Köşk',
            'commercial': 'Ticari',
            'land': 'Arsa',
            'studio': 'Stüdyo',
            '1': '1+1',
            '2': '2+1',
            '3': '3+1',
            '4+': '4+ oda',
            // Автомобили
            'sedan': 'Sedan',
            'suv': 'SUV',
            'hatchback': 'Hatchback',
            'coupe': 'Coupe',
            'minivan': 'Minivan',
            'petrol': 'Benzin',
            'diesel': 'Dizel',
            'hybrid': 'Hibrit',
            'electric': 'Elektrikli',
            'manual': 'Manuel',
            'automatic': 'Otomatik',
            'robot': 'Robot',
            'cvt': 'CVT',
            // Бизнес
            'trade': 'Ticaret',
            'services': 'Hizmetler',
            'production': 'Üretim',
            'it': 'IT Teknolojileri',
            'construction': 'İnşaat',
            '1-5': '1-5 kişi',
            '6-20': '6-20 kişi',
            '21-50': '21-50 kişi',
            '50+': '50+ kişi',
            'under500k': '500 bin ₽ altı',
            '500k-2m': '500 bin - 2 milyon ₽',
            '2m-10m': '2-10 milyon ₽',
            'over10m': '10 milyon ₽ üstü',
            // Юридические
            'civil': 'Medeni hukuk',
            'criminal': 'Ceza hukuku',
            'arbitration': 'Tahkim hukuku',
            'family': 'Aile hukuku',
            'labor': 'İş hukuku',
            'individual': 'Bireysel',
            'business': 'Tüzel kişi',
            'entrepreneur': 'Bireysel girişimci',
            'urgent': 'Acil (3 güne kadar)',
            'normal': 'Normal (1-2 hafta)',
            'longterm': 'Uzun vadeli destek',
            // Финансирование
            'cash': 'Nakit',
            'credit': 'Kredi',
            'installment': 'Taksit',
            'mixed': 'Karma',
            // Время
            'morning': 'Sabah (9:00-12:00)',
            'day': 'Gün (12:00-18:00)',
            'evening': 'Akşam (18:00-21:00)',
            'any': 'Herhangi bir zaman'
        }
    };
    
    // Функция форматирования цены
    function formatPrice(price) {
        if (price >= 1000000) {
            return (price / 1000000).toFixed(1).replace('.0', '') + ' млн ₽';
        }
        return new Intl.NumberFormat('ru-RU', {style: 'decimal'}).format(price) + ' ₽';
    }
    
    // Показать уведомление
    function showNotification(message, type = 'success') {
        if (type === 'success') {
            notificationTitle.textContent = translations[currentLanguage]['notification_success'];
        } else {
            notificationTitle.textContent = translations[currentLanguage]['notification_error'];
        }
        
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    // Обновление визуального диапазона слайдера
    function updateSliderRange() {
        const min = parseInt(priceMinSlider.value);
        const max = parseInt(priceMaxSlider.value);
        const minPercent = (min / 50000000) * 100;
        const maxPercent = (max / 50000000) * 100;
        
        sliderRange.style.left = minPercent + "%";
        sliderRange.style.width = (maxPercent - minPercent) + "%";
        
        minPriceLabel.textContent = formatPrice(min);
        maxPriceLabel.textContent = formatPrice(max);
        
        formData.minPrice = min;
        formData.maxPrice = max;
    }
    
    // Обновление отображения ползунка годов
    function updateYearDisplay() {
        const minYear = parseInt(yearSliderMin.value);
        const maxYear = parseInt(yearSliderMax.value);
        
        // Обновляем отображение
        displayMinYear.textContent = minYear;
        displayMaxYear.textContent = maxYear;
        
        // Обновляем активное состояние
        if (minYear === 1990 && maxYear === 2023) {
            minYearBox.classList.remove('active');
            maxYearBox.classList.remove('active');
        } else {
            minYearBox.classList.add('active');
            maxYearBox.classList.add('active');
        }
        
        // Обновляем метки
        yearTicks.forEach(tick => {
            const year = parseInt(tick.getAttribute('data-year'));
            if (year >= minYear && year <= maxYear) {
                tick.classList.add('active');
            } else {
                tick.classList.remove('active');
            }
        });
        
        // Сохраняем в данные формы
        formData.yearRange = `${minYear}-${maxYear}`;
        currentYearMin = minYear;
        currentYearMax = maxYear;
    }
    
    // Переключение категории услуг
    function switchCategory(category) {
        formData.category = category;
        
        // Обновляем активную категорию в выборе
        categoryCards.forEach(card => {
            card.classList.remove('active');
            if (card.getAttribute('data-category') === category) {
                card.classList.add('active');
            }
        });
        
        // Обновляем заголовок формы
        updateFormTitles();
        
        // Переключаем видимые категории услуг
        serviceCategories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.getAttribute('data-category') === category) {
                cat.classList.add('active');
            }
        });
        
        // Переключаем видимые категории деталей
        detailsCategories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.getAttribute('data-category') === category) {
                cat.classList.add('active');
            }
        });
        
        // Сбрасываем выбор услуги
        resetServiceSelection();
        
        // Сбрасываем детали
        resetDetailsSelection();
        
        // Возвращаемся к первому шагу формы при смене категории
        if (currentStep > 1) {
            resetFormToFirstStep();
        }
        
        showNotification(translations[currentLanguage]['notification_category_selected'] + getTranslatedCategory(category));
    }
    
    // Сброс выбора услуги
    function resetServiceSelection() {
        optionCards.forEach(card => card.classList.remove('selected'));
        formData.service = null;
        nextBtn1.disabled = true;
    }
    
    // Сброс выбора деталей
    function resetDetailsSelection() {
        allOptionTags.forEach(tag => tag.classList.remove('selected'));
        formData.details = [];
        formData.financing = null;
        formData.contactTime = null;
        realtyLocation.value = '';
        additionalInfo.value = '';
    }
    
    // Сброс формы к первому шагу
    function resetFormToFirstStep() {
        goToStep(1);
    }
    
    // Обновление заголовков формы
    function updateFormTitles() {
        formTitle.textContent = translations[currentLanguage]['form_title'] + ': ' + getTranslatedCategory(formData.category);
        formSubtitle.textContent = translations[currentLanguage]['form_subtitle'];
    }
    
    // Получить перевод категории
    function getTranslatedCategory(category) {
        return categoryTranslations[currentLanguage][category] || category;
    }
    
    // Получить перевод услуги
    function getTranslatedService(service) {
        return serviceTranslations[currentLanguage][service] || service;
    }
    
    // Получить перевод детали
    function getTranslatedDetail(detail) {
        return detailTranslations[currentLanguage][detail] || detail;
    }
    
    // Выбор услуги
    function initServiceSelection() {
        optionCards.forEach(card => {
            card.addEventListener('click', function() {
                // Убираем выделение со всех карточек в активной категории
                const activeCategory = document.querySelector('.service-category.active');
                const cardsInCategory = activeCategory.querySelectorAll('.option-card');
                cardsInCategory.forEach(c => c.classList.remove('selected'));
                
                // Выделяем выбранную карточку
                this.classList.add('selected');
                
                // Сохраняем выбранную услугу
                formData.service = this.getAttribute('data-service');
                
                // Активируем кнопку "Далее"
                nextBtn1.disabled = false;
                
                showNotification(translations[currentLanguage]['notification_service_selected'] + getTranslatedService(formData.service));
            });
        });
    }
    
    // Выбор деталей, финансирования и времени
    function initTagSelection() {
        allOptionTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const dataType = this.getAttribute('data-detail') || 
                                this.getAttribute('data-financing') || 
                                this.getAttribute('data-time');
                
                if (this.getAttribute('data-financing')) {
                    // Финансирование - выбор одного варианта
                    financingTags.forEach(t => t.classList.remove('selected'));
                    this.classList.add('selected');
                    formData.financing = dataType;
                } else if (this.getAttribute('data-time')) {
                    // Время - выбор одного варианта
                    timeTags.forEach(t => t.classList.remove('selected'));
                    this.classList.add('selected');
                    formData.contactTime = dataType;
                } else {
                    // Детали - множественный выбор
                    this.classList.toggle('selected');
                    
                    // Обновляем массив деталей
                    formData.details = [];
                    const selectedDetails = document.querySelectorAll('.option-tag[data-detail].selected');
                    selectedDetails.forEach(detail => {
                        formData.details.push(detail.getAttribute('data-detail'));
                    });
                }
            });
        });
    }
    
    // Переход между шагами формы
    function goToStep(step) {
        // Анимация исчезновения текущего шага
        const currentActive = document.querySelector('.form-step.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        
        // Показываем новый шаг
        setTimeout(() => {
            document.getElementById(`step-${step}`).classList.add('active');
            
            // Обновляем прогресс-бар
            progressSteps.forEach((progressStep, index) => {
                if (index < step) {
                    progressStep.classList.add('completed');
                    progressStep.classList.remove('active');
                } else if (index === step - 1) {
                    progressStep.classList.add('active');
                    progressStep.classList.remove('completed');
                } else {
                    progressStep.classList.remove('active', 'completed');
                }
            });
            
            currentStep = step;
            
            // На последнем шаге обновляем сводку
            if (step === 4) {
                updateSummary();
            }
        }, 300);
    }
    
    // Обновление сводки
    function updateSummary() {
        // Категория
        summaryCategory.textContent = getTranslatedCategory(formData.category) || translations[currentLanguage]['not_specified'];
        
        // Услуга
        summaryService.textContent = getTranslatedService(formData.service) || translations[currentLanguage]['not_specified'];
        
        // Детали
        const detailsText = formData.details.map(detail => getTranslatedDetail(detail) || detail).join(', ');
        summaryDetails.textContent = detailsText || translations[currentLanguage]['not_specified'];
        
        // Бюджет
        summaryPrice.textContent = `${formatPrice(formData.minPrice)} - ${formatPrice(formData.maxPrice)}`;
        
        // Финансирование
        summaryFinancing.textContent = getTranslatedDetail(formData.financing) || translations[currentLanguage]['not_specified'];
        
        // Контактные данные
        const contactText = [];
        if (formData.clientName) contactText.push(formData.clientName);
        if (formData.clientPhone) contactText.push(formData.clientPhone);
        if (formData.clientEmail) contactText.push(formData.clientEmail);
        summaryContacts.textContent = contactText.join(', ') || translations[currentLanguage]['not_specified'];
        
        // Время связи
        summaryTime.textContent = getTranslatedDetail(formData.contactTime) || translations[currentLanguage]['not_specified'];
        
        // Дополнительные пожелания
        if (formData.additional.trim()) {
            summaryAdditional.textContent = formData.additional;
            summaryAdditionalContainer.style.display = 'flex';
        } else {
            summaryAdditionalContainer.style.display = 'none';
        }
        
        // Дата и время
        const now = new Date();
        const dateTimeString = now.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        summaryDateTime.textContent = dateTimeString;
    }
    
    // Валидация формы
    function validateStep(step) {
        switch(step) {
            case 1:
                if (!formData.service) {
                    showNotification(translations[currentLanguage]['notification_select_service'], 'error');
                    return false;
                }
                return true;
                
            case 2:
                if (formData.details.length === 0) {
                    showNotification(translations[currentLanguage]['notification_select_details'], 'error');
                    return false;
                }
                return true;
                
            case 3:
                // Сохраняем текстовые поля
                formData.additional = additionalInfo.value.trim();
                formData.clientName = clientName.value.trim();
                formData.clientPhone = clientPhone.value.trim();
                formData.clientEmail = clientEmail.value.trim();
                formData.realtyLocation = realtyLocation.value.trim();
                
                // Проверяем контактные данные
                if (!formData.clientName || formData.clientName.length < 2) {
                    showNotification(translations[currentLanguage]['notification_name_error'], 'error');
                    return false;
                }
                
                if (!formData.clientPhone || formData.clientPhone.length < 10) {
                    showNotification(translations[currentLanguage]['notification_phone_error'], 'error');
                    return false;
                }
                
                if (!formData.clientEmail || !formData.clientEmail.includes('@')) {
                    showNotification(translations[currentLanguage]['notification_email_error'], 'error');
                    return false;
                }
                
                if (!formData.financing) {
                    showNotification(translations[currentLanguage]['notification_payment_error'], 'error');
                    return false;
                }
                
                if (!formData.contactTime) {
                    showNotification(translations[currentLanguage]['notification_time_error'], 'error');
                    return false;
                }
                
                return true;
                
            default:
                return true;
        }
    }
    
    // Отправка данных формы
    async function submitFormData() {
        // 1. Проверяем, что все данные есть
        if (!formData.service || !formData.clientName || !formData.clientPhone) {
            showNotification('❌ Заполните обязательные поля!', 'error');
            return;
        }
        
        // 2. Формируем красивую анкету
        const applicationText = `📋 <b>НОВАЯ ЗАЯВКА BROKEROK</b>
        
👤 <b>КЛИЕНТ:</b>
• Имя: ${formData.clientName || 'Не указано'}
• Телефон: ${formData.clientPhone || 'Не указано'}
• Email: ${formData.clientEmail || 'Не указано'}
        
🏠 <b>УСЛУГА:</b>
• Категория: ${getTranslatedCategory(formData.category) || 'Не указано'}
• Конкретная услуга: ${getTranslatedService(formData.service) || 'Не указано'}
• Бюджет: ${formatPrice(formData.minPrice)} - ${formatPrice(formData.maxPrice)}
        
📋 <b>ДЕТАЛИ:</b>
${formData.details.map(d => `• ${getTranslatedDetail(d) || d}`).join('\n') || '• Не указаны'}
        
💳 <b>СПОСОБ ОПЛАТЫ:</b> ${getTranslatedDetail(formData.financing) || 'Не указан'}
🕐 <b>УДОБНОЕ ВРЕМЯ:</b> ${getTranslatedDetail(formData.contactTime) || 'Не указано'}
        
${formData.additional ? `📝 <b>ДОП. ПОЖЕЛАНИЯ:</b>\n${formData.additional}` : ''}
        
📅 <b>Дата отправки:</b> ${new Date().toLocaleString('ru-RU')}
        
🚀 <b>СРОЧНО СВЯЗАТЬСЯ С КЛИЕНТОМ!</b>`;
        
        // 3. Ваши данные Telegram (ЗАМЕНИТЕ НА СВОИ!)
        const botToken = '8412708945:AAEPdeJ9jd1N_Hlo-o7A0rOZjv3t-mq6gjA'; // Ваш токен от @BotFather
        const chatId = '8039700599'; // Ваш ID или ID группы
        
        try {
            // 4. Отправляем в Telegram
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: applicationText,
                    parse_mode: 'HTML'
                })
            });
            
            const data = await response.json();
            
            // 5. Проверяем результат
            if (data.ok) {
                // УСПЕХ!
                goToStep(4);
                showNotification('Ваша анкета отправлена! Ожидайте.');
                
                // // Можно дополнительно отправить в WhatsApp
                // const whatsappText = applicationText.replace(/<[^>]*>/g, ''); // Убираем HTML теги
                // setTimeout(() => {
                //     window.open(`https://wa.me/905355266776?text=${encodeURIComponent(whatsappText)}`, '_blank');
                // }, 1000);
                
            } else {
                // ОШИБКА
                showNotification('❌ Ошибка отправки: ' + (data.description || 'Неизвестная ошибка'), 'error');
                console.error('Telegram Error:', data);
            }
            
        } catch (error) {
            // ОШИБКА СЕТИ
            showNotification('❌ Ошибка сети. Попробуйте еще раз', 'error');
            console.error('Network Error:', error);
            
            // Резервный вариант - открыть WhatsApp
            const whatsappText = applicationText.replace(/<[^>]*>/g, '');
            window.open(`https://wa.me/905355266776?text=${encodeURIComponent(whatsappText)}`, '_blank');
            
            goToStep(4);
        }
    }
    
    // Переключение между вкладками
    function switchTab(tabName) {
        // Обновляем активную навигацию
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-tab') === tabName) {
                link.classList.add('active');
            }
        });
        
        // Показываем активную вкладку
        contentTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.id === `${tabName}-tab`) {
                tab.classList.add('active');
            }
        });
    }
    
    // Печать сводки
    function printSummary() {
        const printContent = `
            <html>
            <head>
                <title>${translations[currentLanguage]['summary_title']} - Brokerok</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
                    h1 { color: #0a2540; text-align: center; }
                    h2 { color: #2d5b8a; border-bottom: 2px solid #c8a165; padding-bottom: 10px; }
                    .summary-item { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
                    .summary-label { font-weight: bold; color: #0a2540; display: inline-block; width: 250px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; padding-top: 20px; border-top: 1px solid #ddd; }
                    @media print {
                        body { font-size: 12pt; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Brokerok</h1>
                    <h2>${translations[currentLanguage]['summary_title']}</h2>
                    <p>${new Date().toLocaleDateString('ru-RU')}</p>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_category']}</span>
                    <span>${summaryCategory.textContent}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_service']}</span>
                    <span>${summaryService.textContent}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_details']}</span>
                    <span>${summaryDetails.textContent}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_price']}</span>
                    <span>${summaryPrice.textContent}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_financing']}</span>
                    <span>${summaryFinancing.textContent}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_contacts']}</span>
                    <span>${summaryContacts.textContent}</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_time']}</span>
                    <span>${summaryTime.textContent}</span>
                </div>
                
                ${summaryAdditionalContainer.style.display !== 'none' ? `
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_additional']}</span>
                    <span>${summaryAdditional.textContent}</span>
                </div>
                ` : ''}
                
                <div class="summary-item">
                    <span class="summary-label">${translations[currentLanguage]['summary_datetime']}</span>
                    <span>${summaryDateTime.textContent}</span>
                </div>
                
                <div class="footer">
                    <p>${translations[currentLanguage]['success_message']}</p>
                    <p>Brokerok | Moscow, Tverskaya str., 10 | +7 (495) 123-45-67 | info@brokerok.ru</p>
                </div>
                
                <div class="no-print" style="margin-top: 30px; text-align: center;">
                    <button onclick="window.print()" style="padding: 10px 20px; background: #0a2540; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        ${translations[currentLanguage]['btn_print']}
                    </button>
                    <button onclick="window.close()" style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                        ${translations[currentLanguage]['btn_back']}
                    </button>
                </div>
            </body>
            </html>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Даем время на загрузку стилей перед печатью
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }
    
    // Сброс формы
    function resetForm() {
        formData = {
            category: 'realty',
            service: null,
            details: [],
            minPrice: 100000,
            maxPrice: 10000000,
            financing: null,
            contactTime: null,
            additional: '',
            clientName: '',
            clientPhone: '',
            clientEmail: '',
            realtyLocation: '',
            yearRange: '2000-2023'
        };
        
        // Сброс выбора категории
        switchCategory('realty');
        
        // Сброс выбора услуг
        optionCards.forEach(card => card.classList.remove('selected'));
        
        // Сброс слайдеров
        priceMinSlider.value = 100000;
        priceMaxSlider.value = 10000000;
        updateSliderRange();
        
        // Сброс слайдера годов
        yearSliderMin.value = 2000;
        yearSliderMax.value = 2023;
        updateYearDisplay();
        
        // Сброс тегов
        allOptionTags.forEach(tag => tag.classList.remove('selected'));
        
        // Сброс текстовых полей
        additionalInfo.value = '';
        clientName.value = '';
        clientPhone.value = '';
        clientEmail.value = '';
        realtyLocation.value = '';
        
        // Возврат к первому шагу
        goToStep(1);
        nextBtn1.disabled = true;
        
        showNotification(translations[currentLanguage]['notification_form_reset']);
    }
    
    // Инициализация слайдеров
    function initSliders() {
        updateSliderRange();
        
        priceMinSlider.addEventListener('input', function() {
            const minValue = parseInt(this.value);
            const maxValue = parseInt(priceMaxSlider.value);
            
            if (minValue > maxValue) {
                this.value = maxValue;
            }
            
            updateSliderRange();
        });
        
        priceMaxSlider.addEventListener('input', function() {
            const maxValue = parseInt(this.value);
            const minValue = parseInt(priceMinSlider.value);
            
            if (maxValue < minValue) {
                this.value = minValue;
            }
            
            updateSliderRange();
        });
        
        // Инициализация слайдера годов
        updateYearDisplay();
        
        yearSliderMin.addEventListener('input', function() {
            const minValue = parseInt(this.value);
            const maxValue = parseInt(yearSliderMax.value);
            
            if (minValue > maxValue) {
                this.value = maxValue;
            }
            
            updateYearDisplay();
        });
        
        yearSliderMax.addEventListener('input', function() {
            const maxValue = parseInt(this.value);
            const minValue = parseInt(yearSliderMin.value);
            
            if (maxValue < minValue) {
                this.value = minValue;
            }
            
            updateYearDisplay();
        });
        
        // Кнопка сброса слайдера годов
        resetYearBtn.addEventListener('click', function() {
            yearSliderMin.value = 1990;
            yearSliderMax.value = 2023;
            updateYearDisplay();
            showNotification(translations[currentLanguage]['notification_year_reset']);
        });
        
        // Клик по меткам лет
        yearTicks.forEach(tick => {
            tick.addEventListener('click', function() {
                const year = parseInt(this.getAttribute('data-year'));
                
                // Определяем, какой ползунок обновлять
                const minYear = parseInt(yearSliderMin.value);
                const maxYear = parseInt(yearSliderMax.value);
                
                if (year < minYear || (Math.abs(year - minYear) < Math.abs(year - maxYear))) {
                    yearSliderMin.value = year;
                } else {
                    yearSliderMax.value = year;
                }
                
                updateYearDisplay();
            });
        });
    }
    
    // Инициализация навигации по вкладкам
    function initTabNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tabName = this.getAttribute('data-tab');
                switchTab(tabName);
            });
        });
        
        // Кнопка консультации теперь открывает модальное окно
        consultationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openMessengerModal();
        });
    }
    
    // Инициализация выбора категорий
    function initCategorySelection() {
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                switchCategory(category);
            });
        });
    }
    
    // Инициализация обработчиков формы
    function initFormHandlers() {
        // Шаг 1
        nextBtn1.addEventListener('click', function() {
            if (validateStep(1)) {
                goToStep(2);
            }
        });
        
        // Шаг 2
        nextBtn2.addEventListener('click', function() {
            if (validateStep(2)) {
                goToStep(3);
            }
        });
        
        prevBtn2.addEventListener('click', function() {
            goToStep(1);
        });
        
        // Шаг 3
        nextBtn3.addEventListener('click', function() {
            if (validateStep(3)) {
                submitFormData();
            }
        });
        
        prevBtn3.addEventListener('click', function() {
            goToStep(2);
        });
        
        // Кнопки на последнем шаге
        newRequestBtn.addEventListener('click', resetForm);
        printBtn.addEventListener('click', printSummary);
    }
    
    // Функции для модального окна мессенджера
    function openMessengerModal() {
        // Собираем данные из формы для предзаполнения
        messengerFormData = {
            name: clientName.value || '',
            phone: clientPhone.value || '',
            email: clientEmail.value || '',
            service: getTranslatedService(formData.service) || translations[currentLanguage]['not_specified'],
            category: getTranslatedCategory(formData.category) || translations[currentLanguage]['not_specified'],
            budget: `${formatPrice(formData.minPrice)} - ${formatPrice(formData.maxPrice)}`,
            details: formData.details.map(d => getTranslatedDetail(d) || d).join(', ') || translations[currentLanguage]['not_specified'],
            yearRange: formData.yearRange || translations[currentLanguage]['not_specified']
        };
        
        // Сброс состояния
        messengerOptions.forEach(opt => opt.classList.remove('selected'));
        whatsappForm.classList.remove('active');
        telegramForm.classList.remove('active');
        selectedMessenger = null;
        
        // Предзаполняем формы
        whatsappName.value = messengerFormData.name;
        telegramName.value = messengerFormData.name;
        
        // Формируем сообщение для Telegram
        const telegramMessageText = `${translations[currentLanguage]['messenger_subtitle']}: ${messengerFormData.service}\n\n${translations[currentLanguage]['summary_title']}:\n• ${translations[currentLanguage]['summary_category']}: ${messengerFormData.category}\n• ${translations[currentLanguage]['summary_price']}: ${messengerFormData.budget}\n• ${translations[currentLanguage]['detail_year']}: ${messengerFormData.yearRange}\n• ${translations[currentLanguage]['summary_details']}: ${messengerFormData.details}\n\n${translations[currentLanguage]['form_message_placeholder']}`;
        telegramMessage.value = telegramMessageText;
        
        // Показываем модальное окно
        messengerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMessengerModal() {
        messengerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Сбрасываем формы
        messengerOptions.forEach(opt => opt.classList.remove('selected'));
        whatsappForm.classList.remove('active');
        telegramForm.classList.remove('active');
        selectedMessenger = null;
    }
    
    function selectMessenger(messenger) {
        selectedMessenger = messenger;
        
        // Обновляем выбор
        messengerOptions.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.getAttribute('data-messenger') === messenger) {
                opt.classList.add('selected');
            }
        });
        
        // Показываем соответствующую форму
        if (messenger === 'whatsapp') {
            whatsappForm.classList.add('active');
            telegramForm.classList.remove('active');
        } else if (messenger === 'telegram') {
            telegramForm.classList.add('active');
            whatsappForm.classList.remove('active');
        }
    }
    
    function sendToWhatsApp() {
        const name = whatsappName.value.trim();
        const countryCode = whatsappCode.value;
        const phone = whatsappPhone.value.trim();
        
        if (!name) {
            showNotification(translations[currentLanguage]['notification_name_error'], 'error');
            return;
        }
        
        if (!phone) {
            showNotification(translations[currentLanguage]['notification_phone_error'], 'error');
            return;
        }
        
        // Формируем сообщение
        const message = `${translations[currentLanguage]['messenger_subtitle']} ${name}. ${translations[currentLanguage]['summary_service']}: ${messengerFormData.service}.\n\n${translations[currentLanguage]['summary_title']}:\n• ${translations[currentLanguage]['summary_category']}: ${messengerFormData.category}\n• ${translations[currentLanguage]['summary_price']}: ${messengerFormData.budget}\n• ${translations[currentLanguage]['detail_year']}: ${messengerFormData.yearRange}\n• ${translations[currentLanguage]['summary_details']}: ${messengerFormData.details}\n\n${translations[currentLanguage]['success_message']}`;
        
        // Формируем номер телефона
        const cleanPhone = phone.replace(/\D/g, '');
        const fullPhone = countryCode + cleanPhone;
        
        // Проверяем номер телефона
        if (cleanPhone.length < 10) {
            showNotification(translations[currentLanguage]['notification_phone_error'], 'error');
            return;
        }
        
        // Создаем ссылку WhatsApp
        const whatsappUrl = `https://wa.me/79888075848?text=${encodeURIComponent(message)}`;
        
        // Открываем WhatsApp в новом окне
        window.open(whatsappUrl, '_blank');
        
        // Закрываем модальное окно
        closeMessengerModal();
        showNotification(translations[currentLanguage]['notification_whatsapp_opened']);
    }
    
    function sendToTelegram() {
        const name = telegramName.value.trim();
        const username = telegramUsername.value.trim();
        const message = telegramMessage.value.trim();
        
        if (!name) {
            showNotification(translations[currentLanguage]['notification_name_error'], 'error');
            return;
        }
        
        if (!username || !username.startsWith('@')) {
            showNotification(translations[currentLanguage]['notification_phone_error'], 'error'); // Используем общее сообщение об ошибке
            return;
        }
        
        if (!message) {
            showNotification(translations[currentLanguage]['notification_email_error'], 'error'); // Используем общее сообщение об ошибке
            return;
        }
        
        // Формируем полное сообщение с анкетой
        const fullMessage = `📋 ${translations[currentLanguage]['summary_title']} ${name} (${username}):\n\n${message}\n\n---\n📊 ${translations[currentLanguage]['form_subtitle']}:\n• ${translations[currentLanguage]['summary_category']}: ${messengerFormData.category}\n• ${translations[currentLanguage]['summary_service']}: ${messengerFormData.service}\n• ${translations[currentLanguage]['summary_price']}: ${messengerFormData.budget}\n• ${translations[currentLanguage]['detail_year']}: ${messengerFormData.yearRange}\n• ${translations[currentLanguage]['summary_details']}: ${messengerFormData.details}\n• Email: ${messengerFormData.email || translations[currentLanguage]['not_specified']}\n• ${translations[currentLanguage]['form_phone']}: ${messengerFormData.phone || translations[currentLanguage]['not_specified']}`;
        
        // Для демо показываем уведомление
        console.log('Отправка в Telegram:', fullMessage);
        
        // Показываем информацию о том, как будет работать в реальном приложении
        closeMessengerModal();
        showNotification(translations[currentLanguage]['notification_telegram_ready']);
    }
    
    function initMessengerModalHandlers() {
        // Обработчики выбора мессенджера
        messengerOptions.forEach(option => {
            option.addEventListener('click', function() {
                const messenger = this.getAttribute('data-messenger');
                selectMessenger(messenger);
            });
        });
        
        // Кнопки "Назад"
        backToChoiceBtn.addEventListener('click', function() {
            selectMessenger(null);
            messengerOptions.forEach(opt => opt.classList.remove('selected'));
            whatsappForm.classList.remove('active');
            telegramForm.classList.remove('active');
        });
        
        backToChoiceBtnTg.addEventListener('click', function() {
            selectMessenger(null);
            messengerOptions.forEach(opt => opt.classList.remove('selected'));
            whatsappForm.classList.remove('active');
            telegramForm.classList.remove('active');
        });
        
        // Кнопки отправки
        sendWhatsAppBtn.addEventListener('click', sendToWhatsApp);
        sendTelegramBtn.addEventListener('click', sendToTelegram);
        
        // Закрытие модального окна
        closeModalBtn.addEventListener('click', closeMessengerModal);
        
        // Закрытие по клику вне окна
        messengerModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeMessengerModal();
            }
        });
        
        // Закрытие по клавише Esc
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && messengerModal.classList.contains('active')) {
                closeMessengerModal();
            }
        });
        
        // Автоматический выбор страны по номеру телефона
        clientPhone.addEventListener('input', function() {
            const phone = this.value;
            if (phone.startsWith('+1')) {
                whatsappCode.value = '+1';
            } else if (phone.startsWith('+44')) {
                whatsappCode.value = '+44';
            } else if (phone.startsWith('+49')) {
                whatsappCode.value = '+49';
            } else {
                whatsappCode.value = '+7';
            }
        });
    }
    
    // Смена языка
    function changeLanguage(lang) {
        currentLanguage = lang;
        
        // Обновляем активную кнопку языка
        languageBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Обновляем все тексты на странице
        updatePageTexts();
        
        // Обновляем заголовки формы
        updateFormTitles();
        
        // Сохраняем язык в localStorage
        localStorage.setItem('preferredLanguage', lang);
        
        // Обновляем мета-тег языка
        document.documentElement.lang = lang;
    }
    
    // Обновление текстов на странице
    function updatePageTexts() {
        // Обновляем все элементы с data-i18n атрибутом
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });
        
        // Обновляем placeholder'ы
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[currentLanguage][key]) {
                element.setAttribute('placeholder', translations[currentLanguage][key]);
            }
        });
    }
    
    // Инициализация переключателя языка
    function initLanguageSwitcher() {
        languageBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });
        
        // Проверяем сохраненный язык или язык браузера
        const savedLanguage = localStorage.getItem('preferredLanguage');
        const browserLanguage = navigator.language.substring(0, 2);
        
        if (savedLanguage && ['ru', 'en', 'tr'].includes(savedLanguage)) {
            changeLanguage(savedLanguage);
        } else if (['ru', 'en', 'tr'].includes(browserLanguage)) {
            changeLanguage(browserLanguage);
        }
    }
    
    // Инициализация всего приложения
    function initApp() {
        initSliders();
        initServiceSelection();
        initTagSelection();
        initTabNavigation();
        initCategorySelection();
        initFormHandlers();
        initMessengerModalHandlers();
        initLanguageSwitcher();
        
        // Начальная настройка кнопки "Далее" на первом шаге
        nextBtn1.disabled = true;
        
        // Анимация для навигационных ссылок
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Анимация для карточек категорий
        categoryCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-5px)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Предзаполняем поле Telegram username, если есть имя
        clientName.addEventListener('blur', function() {
            if (this.value && !telegramUsername.value) {
                const username = '@' + this.value.toLowerCase().replace(/\s+/g, '_');
                telegramUsername.value = username;
            }
        });
        
        console.log('Приложение инициализировано');
    }
    
    // Запуск приложения
    initApp();
});