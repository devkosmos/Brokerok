// Property Detail Page JavaScript

let currentLanguage = 'en';
let propertyId = null;
let currentCrypto = null;
let currentStep = 1;

// Translations
const translations = {
    'en': {
        'backBtn': 'Back',
        'adminBtn': 'Admin',
        'contactTitle': 'Contact Manager',
        'contactBtn': 'Send Message',
        'purchaseTitle': 'Purchase Property',
        'paymentLabel': 'Payment Method:',
        'amountLabel': 'Amount:',
        'walletLabel': 'Wallet Address:',
        'purchaseBtn': 'Buy Now',
        'shareTitle': 'Share Property',
        'mapTitle': 'Location on Map',
        'similarTitle': 'Similar Properties',
        'descriptionTitle': 'Description',
        'featuresTitle': 'Features',
        'amenitiesTitle': 'Amenities',
        'cityLabel': 'City:',
        'districtLabel': 'District:',
        'streetLabel': 'Street:',
        'areaLabel': 'Area',
        'roomsLabel': 'Rooms',
        'bathroomsLabel': 'Bathrooms',
        'floorLabel': 'Floor',
        'typeLabel': 'Type',
        'statusLabel': 'Status',
        'contactModalTitle': 'Send Message to Manager',
        'nameLabel': 'Name:',
        'emailLabel': 'Email:',
        'phoneLabel': 'Phone:',
        'messageLabel': 'Message:',
        'sendMessageBtn': 'Send Message',
        'paymentModalTitle': 'Complete Payment',
        'step1Title': 'Send Payment',
        'step1Desc': 'Send exactly this amount to the wallet address below',
        'step2Title': 'Confirm Transaction',
        'step2Desc': 'Enter your transaction hash',
        'step3Title': 'Verification',
        'step3Desc': 'We\'ll verify your payment on the blockchain',
        'paymentAmountLabel': 'Amount:',
        'walletAddressLabel': 'Wallet:',
        'cancelBtn': 'Cancel',
        'submitPaymentBtn': 'Submit Payment',
        'favoriteText': 'Add to Favorites'
    },
    'ru': {
        'backBtn': 'Назад',
        'adminBtn': 'Админ',
        'contactTitle': 'Связаться с менеджером',
        'contactBtn': 'Отправить сообщение',
        'purchaseTitle': 'Купить объект',
        'paymentLabel': 'Способ оплаты:',
        'amountLabel': 'Сумма:',
        'walletLabel': 'Адрес кошелька:',
        'purchaseBtn': 'Купить сейчас',
        'shareTitle': 'Поделиться',
        'mapTitle': 'Местоположение на карте',
        'similarTitle': 'Похожие объекты',
        'descriptionTitle': 'Описание',
        'featuresTitle': 'Характеристики',
        'amenitiesTitle': 'Удобства',
        'cityLabel': 'Город:',
        'districtLabel': 'Район:',
        'streetLabel': 'Улица:',
        'areaLabel': 'Площадь',
        'roomsLabel': 'Комнаты',
        'bathroomsLabel': 'Ванные',
        'floorLabel': 'Этаж',
        'typeLabel': 'Тип',
        'statusLabel': 'Статус',
        'contactModalTitle': 'Отправить сообщение менеджеру',
        'nameLabel': 'Имя:',
        'emailLabel': 'Email:',
        'phoneLabel': 'Телефон:',
        'messageLabel': 'Сообщение:',
        'sendMessageBtn': 'Отправить',
        'paymentModalTitle': 'Завершить платеж',
        'step1Title': 'Отправить платеж',
        'step1Desc': 'Отправьте ровно эту сумму на адрес кошелька ниже',
        'step2Title': 'Подтвердить транзакцию',
        'step2Desc': 'Введите хеш вашей транзакции',
        'step3Title': 'Проверка',
        'step3Desc': 'Мы проверим ваш платеж в блокчейне',
        'paymentAmountLabel': 'Сумма:',
        'walletAddressLabel': 'Кошелек:',
        'cancelBtn': 'Отмена',
        'submitPaymentBtn': 'Отправить платеж',
        'favoriteText': 'Добавить в избранное'
    },
    'tr': {
        'backBtn': 'Geri',
        'adminBtn': 'Yönetici',
        'contactTitle': 'Yöneticiyle İletişim Kurun',
        'contactBtn': 'Mesaj Gönder',
        'purchaseTitle': 'Mülkü Satın Al',
        'paymentLabel': 'Ödeme Yöntemi:',
        'amountLabel': 'Tutar:',
        'walletLabel': 'Cüzdan Adresi:',
        'purchaseBtn': 'Şimdi Satın Al',
        'shareTitle': 'Paylaş',
        'mapTitle': 'Haritada Konum',
        'similarTitle': 'Benzer Mülkler',
        'descriptionTitle': 'Açıklama',
        'featuresTitle': 'Özellikler',
        'amenitiesTitle': 'Olanaklar',
        'cityLabel': 'Şehir:',
        'districtLabel': 'İlçe:',
        'streetLabel': 'Sokak:',
        'areaLabel': 'Alan',
        'roomsLabel': 'Odalar',
        'bathroomsLabel': 'Banyo',
        'floorLabel': 'Kat',
        'typeLabel': 'Tür',
        'statusLabel': 'Durum',
        'contactModalTitle': 'Yöneticiye Mesaj Gönder',
        'nameLabel': 'Ad:',
        'emailLabel': 'Email:',
        'phoneLabel': 'Telefon:',
        'messageLabel': 'Mesaj:',
        'sendMessageBtn': 'Mesaj Gönder',
        'paymentModalTitle': 'Ödemeyi Tamamla',
        'step1Title': 'Ödeme Gönder',
        'step1Desc': 'Aşağıdaki cüzdan adresine tam olarak bu tutarı gönderin',
        'step2Title': 'İşlemi Onayla',
        'step2Desc': 'İşlem hash\'inizi girin',
        'step3Title': 'Doğrulama',
        'step3Desc': 'Ödemenizi blokzincirde doğrulayacağız',
        'paymentAmountLabel': 'Tutar:',
        'walletAddressLabel': 'Cüzdan:',
        'cancelBtn': 'İptal',
        'submitPaymentBtn': 'Ödemeyi Gönder',
        'favoriteText': 'Favorilere Ekle'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupLanguageSelector();
    setupEventListeners();
    initializeMap();
    loadSimilarProperties();
});

function setupLanguageSelector() {
    const langSelect = document.getElementById('languageSelect');
    langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
    
    // Load saved language
    const savedLang = localStorage.getItem('propertyLanguage') || 'en';
    langSelect.value = savedLang;
    changeLanguage(savedLang);
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('propertyLanguage', lang);
    updatePageLanguage();
}

function updatePageLanguage() {
    const trans = translations[currentLanguage] || translations['en'];
    
    Object.keys(trans).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = trans[key];
        }
    });
}

function setupEventListeners() {
    const cryptoSelect = document.getElementById('cryptoSelect');
    cryptoSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            calculateCryptoAmount(e.target.value);
        } else {
            document.getElementById('cryptoAmount').style.display = 'none';
        }
    });
}

// ==================== CRYPTO CONVERSION ====================
function calculateCryptoAmount(cryptoType) {
    const priceText = document.getElementById('propertyPrice').textContent;
    const price = parseFloat(priceText.replace(/[$,]/g, ''));
    
    fetch('/api/crypto/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usd_amount: price,
            crypto_type: cryptoType
        })
    })
    .then(response => response.json())
    .then(data => {
        currentCrypto = data;
        document.getElementById('cryptoAmount').style.display = 'block';
        document.getElementById('cryptoAmountValue').textContent = `${data.crypto_amount} ${cryptoType}`;
        document.getElementById('walletAddress').value = data.merchant_address;
        document.getElementById('paymentAmount').textContent = `${data.crypto_amount} ${cryptoType}`;
        document.getElementById('walletAddressModal').value = data.merchant_address;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error calculating crypto amount');
    });
}

// ==================== FAVORITES ====================
function toggleFavorite() {
    const btn = document.querySelector('.btn-favorite');
    btn.classList.toggle('active');
    
    const text = btn.classList.contains('active') ? 'Remove from Favorites' : 'Add to Favorites';
    btn.querySelector('span').textContent = text;
    
    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const propertyId = getPropertyIdFromUrl();
    
    if (btn.classList.contains('active')) {
        if (!favorites.includes(propertyId)) {
            favorites.push(propertyId);
        }
    } else {
        favorites = favorites.filter(id => id !== propertyId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function getPropertyIdFromUrl() {
    const url = window.location.pathname;
    return parseInt(url.split('/').pop());
}

// ==================== CONTACT MANAGER ====================
function contactManager() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}

function sendMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;
    
    // Save to localStorage (in production, send to server)
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push({
        name, email, phone, message,
        propertyId: getPropertyIdFromUrl(),
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('messages', JSON.stringify(messages));
    
    alert('Message sent successfully! Manager will contact you soon.');
    closeContactModal();
    document.getElementById('contactForm').reset();
}

// ==================== PAYMENT ====================
function initiatePurchase() {
    const cryptoSelect = document.getElementById('cryptoSelect');
    if (!cryptoSelect.value) {
        alert('Please select a cryptocurrency');
        return;
    }
    
    document.getElementById('paymentModal').style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    currentStep = 1;
}

function submitPayment() {
    const txHash = document.getElementById('txHash').value;
    
    if (!txHash) {
        alert('Please enter transaction hash');
        return;
    }
    
    // Verify transaction (in production, verify on blockchain)
    document.getElementById('verificationStatus').style.display = 'block';
    
    setTimeout(() => {
        alert('Payment verified successfully! Property is now yours.');
        closePaymentModal();
        document.getElementById('txHash').value = '';
    }, 2000);
}

function copyWallet() {
    const wallet = document.getElementById('walletAddress');
    wallet.select();
    document.execCommand('copy');
    alert('Wallet address copied!');
}

function copyWalletModal() {
    const wallet = document.getElementById('walletAddressModal');
    wallet.select();
    document.execCommand('copy');
    alert('Wallet address copied!');
}

// ==================== SHARING ====================
function shareProperty(platform) {
    const url = window.location.href;
    const title = document.getElementById('propertyTitle').textContent;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
        case 'copy':
            navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
}

// ==================== MAP ====================
function initializeMap() {
    // Mock map initialization
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;"><i class="fas fa-map"></i> Google Maps Integration Ready</div>';
}

// ==================== SIMILAR PROPERTIES ====================
function loadSimilarProperties() {
    const similarContainer = document.getElementById('similarProperties');
    
    // Mock similar properties
    const similar = [
        {
            id: 1,
            title: 'Modern Apartment',
            price: 750000,
            image: 'https://via.placeholder.com/250x200'
        },
        {
            id: 2,
            title: 'Luxury Villa',
            price: 1200000,
            image: 'https://via.placeholder.com/250x200'
        },
        {
            id: 3,
            title: 'Beach House',
            price: 950000,
            image: 'https://via.placeholder.com/250x200'
        }
    ];
    
    similarContainer.innerHTML = similar.map(prop => `
        <div class="property-card" onclick="window.location.href='/property/${prop.id}'">
            <img src="${prop.image}" alt="${prop.title}">
            <div class="property-card-info">
                <div class="property-card-title">${prop.title}</div>
                <div class="property-card-price">$${prop.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

// ==================== GALLERY ====================
function changeMainImage(src) {
    document.getElementById('mainImage').src = src;
}

// Close modals when clicking outside
window.onclick = function(event) {
    const contactModal = document.getElementById('contactModal');
    const paymentModal = document.getElementById('paymentModal');
    
    if (event.target == contactModal) {
        contactModal.style.display = 'none';
    }
    if (event.target == paymentModal) {
        paymentModal.style.display = 'none';
    }
}
