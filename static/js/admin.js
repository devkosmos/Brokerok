// Admin Panel JavaScript

let currentLanguage = 'en';
let adminData = {
    properties: [],
    users: [],
    transactions: [],
    logs: []
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    loadAdminData();
    setupEventListeners();
});

function setupEventListeners() {
    // Language change
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
    }
}

// ==================== SECTION NAVIGATION ====================
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Add active class to nav item
    event.target.closest('.nav-item').classList.add('active');

    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'properties': 'Properties Management',
        'users': 'Users Management',
        'transactions': 'Transactions',
        'logs': 'Activity Logs',
        'settings': 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionId] || 'Dashboard';
}

// ==================== LANGUAGE MANAGEMENT ====================
const translations = {
    'en': {
        'pageTitle': 'Dashboard',
        'totalPropertiesLabel': 'Total Properties',
        'totalUsersLabel': 'Total Users',
        'totalViewsLabel': 'Total Views',
        'totalTransactionsLabel': 'Total Transactions',
        'recentActivityLabel': 'Recent Activity',
        'recentTransactionsLabel': 'Recent Transactions',
        'propertiesTitle': 'Properties Management',
        'usersTitle': 'Users Management',
        'transactionsTitle': 'Transactions',
        'logsTitle': 'Activity Logs',
        'settingsTitle': 'Settings',
        'generalSettingsLabel': 'General Settings',
        'cryptoSettingsLabel': 'Crypto Settings',
        'siteTitleLabel': 'Site Title:',
        'maintenanceModeLabel': 'Maintenance Mode:',
        'btcAddressLabel': 'Bitcoin Address:',
        'ethAddressLabel': 'Ethereum Address:',
        'propertyModalTitle': 'Add Property',
        'formTitle': 'Title:',
        'formCity': 'City:',
        'formPrice': 'Price (USD):',
        'formType': 'Type:',
        'thId': 'ID',
        'thTitle': 'Title',
        'thCity': 'City',
        'thPrice': 'Price',
        'thType': 'Type',
        'thStatus': 'Status',
        'thActions': 'Actions',
        'thUserId': 'User ID',
        'thUsername': 'Username',
        'thEmail': 'Email',
        'thRole': 'Role',
        'thJoined': 'Joined',
        'thTxId': 'ID',
        'thUserId2': 'User ID',
        'thPropertyId': 'Property ID',
        'thAmount': 'Amount',
        'thCrypto': 'Crypto Type',
        'thTxStatus': 'Status',
        'thTxDate': 'Date',
        'thLogId': 'ID',
        'thLogUserId': 'User ID',
        'thAction': 'Action',
        'thEntity': 'Entity',
        'thLogDate': 'Date'
    },
    'ru': {
        'pageTitle': 'Панель управления',
        'totalPropertiesLabel': 'Всего объектов',
        'totalUsersLabel': 'Всего пользователей',
        'totalViewsLabel': 'Всего просмотров',
        'totalTransactionsLabel': 'Всего транзакций',
        'recentActivityLabel': 'Недавняя активность',
        'recentTransactionsLabel': 'Недавние транзакции',
        'propertiesTitle': 'Управление объектами',
        'usersTitle': 'Управление пользователями',
        'transactionsTitle': 'Транзакции',
        'logsTitle': 'Логи активности',
        'settingsTitle': 'Настройки',
        'generalSettingsLabel': 'Общие настройки',
        'cryptoSettingsLabel': 'Настройки крипто',
        'siteTitleLabel': 'Название сайта:',
        'maintenanceModeLabel': 'Режим обслуживания:',
        'btcAddressLabel': 'Адрес Bitcoin:',
        'ethAddressLabel': 'Адрес Ethereum:',
        'propertyModalTitle': 'Добавить объект',
        'formTitle': 'Название:',
        'formCity': 'Город:',
        'formPrice': 'Цена (USD):',
        'formType': 'Тип:',
        'thId': 'ID',
        'thTitle': 'Название',
        'thCity': 'Город',
        'thPrice': 'Цена',
        'thType': 'Тип',
        'thStatus': 'Статус',
        'thActions': 'Действия',
        'thUserId': 'ID пользователя',
        'thUsername': 'Имя пользователя',
        'thEmail': 'Email',
        'thRole': 'Роль',
        'thJoined': 'Присоединился',
        'thTxId': 'ID',
        'thUserId2': 'ID пользователя',
        'thPropertyId': 'ID объекта',
        'thAmount': 'Сумма',
        'thCrypto': 'Тип крипто',
        'thTxStatus': 'Статус',
        'thTxDate': 'Дата',
        'thLogId': 'ID',
        'thLogUserId': 'ID пользователя',
        'thAction': 'Действие',
        'thEntity': 'Сущность',
        'thLogDate': 'Дата'
    },
    'tr': {
        'pageTitle': 'Kontrol Paneli',
        'totalPropertiesLabel': 'Toplam Mülk',
        'totalUsersLabel': 'Toplam Kullanıcı',
        'totalViewsLabel': 'Toplam Görüntüleme',
        'totalTransactionsLabel': 'Toplam İşlem',
        'recentActivityLabel': 'Son Aktivite',
        'recentTransactionsLabel': 'Son İşlemler',
        'propertiesTitle': 'Mülk Yönetimi',
        'usersTitle': 'Kullanıcı Yönetimi',
        'transactionsTitle': 'İşlemler',
        'logsTitle': 'Aktivite Günlükleri',
        'settingsTitle': 'Ayarlar',
        'generalSettingsLabel': 'Genel Ayarlar',
        'cryptoSettingsLabel': 'Kripto Ayarları',
        'siteTitleLabel': 'Site Başlığı:',
        'maintenanceModeLabel': 'Bakım Modu:',
        'btcAddressLabel': 'Bitcoin Adresi:',
        'ethAddressLabel': 'Ethereum Adresi:',
        'propertyModalTitle': 'Mülk Ekle',
        'formTitle': 'Başlık:',
        'formCity': 'Şehir:',
        'formPrice': 'Fiyat (USD):',
        'formType': 'Tür:',
        'thId': 'ID',
        'thTitle': 'Başlık',
        'thCity': 'Şehir',
        'thPrice': 'Fiyat',
        'thType': 'Tür',
        'thStatus': 'Durum',
        'thActions': 'İşlemler',
        'thUserId': 'Kullanıcı ID',
        'thUsername': 'Kullanıcı Adı',
        'thEmail': 'Email',
        'thRole': 'Rol',
        'thJoined': 'Katıldı',
        'thTxId': 'ID',
        'thUserId2': 'Kullanıcı ID',
        'thPropertyId': 'Mülk ID',
        'thAmount': 'Tutar',
        'thCrypto': 'Kripto Türü',
        'thTxStatus': 'Durum',
        'thTxDate': 'Tarih',
        'thLogId': 'ID',
        'thLogUserId': 'Kullanıcı ID',
        'thAction': 'İşlem',
        'thEntity': 'Varlık',
        'thLogDate': 'Tarih'
    }
};

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('adminLanguage', lang);
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

// ==================== DATA LOADING ====================
function loadAdminData() {
    // Load statistics
    loadStatistics();
    
    // Load properties
    loadProperties();
    
    // Load users
    loadUsers();
    
    // Load transactions
    loadTransactions();
    
    // Load activity logs
    loadActivityLogs();
}

function loadStatistics() {
    // Mock data - in production, fetch from API
    document.getElementById('totalProperties').textContent = '24';
    document.getElementById('totalUsers').textContent = '156';
    document.getElementById('totalViews').textContent = '3,245';
    document.getElementById('totalTransactions').textContent = '18';
    
    // Load recent activity
    loadRecentActivity();
}

function loadRecentActivity() {
    const activities = [
        { action: 'New property added', entity: 'Luxury Apartment in Beyoglu', time: '2 hours ago' },
        { action: 'User registered', entity: 'John Doe', time: '4 hours ago' },
        { action: 'Transaction completed', entity: 'Property #5', time: '6 hours ago' },
        { action: 'Property updated', entity: 'Villa in Antalya', time: '8 hours ago' }
    ];
    
    const list = document.getElementById('recentActivityList');
    list.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div>
                <strong>${activity.action}</strong>
                <p>${activity.entity}</p>
            </div>
            <span class="activity-time">${activity.time}</span>
        </div>
    `).join('');
}

function loadProperties() {
    const properties = [
        { id: 1, title: 'Luxury Apartment in Beyoglu', city: 'Istanbul', price: '$850,000', type: 'Apartment', status: 'Available' },
        { id: 2, title: 'Villa with Pool in Antalya', city: 'Antalya', price: '$1,500,000', type: 'Villa', status: 'Available' },
        { id: 3, title: 'Cozy Apartment in Fatih', city: 'Istanbul', price: '$450,000', type: 'Apartment', status: 'Sold' },
        { id: 4, title: 'Modern House in Ankara', city: 'Ankara', price: '$650,000', type: 'House', status: 'Available' }
    ];
    
    const table = document.getElementById('propertiesTable');
    table.innerHTML = properties.map(prop => `
        <tr>
            <td>${prop.id}</td>
            <td>${prop.title}</td>
            <td>${prop.city}</td>
            <td>${prop.price}</td>
            <td>${prop.type}</td>
            <td><span class="status-badge ${prop.status.toLowerCase()}">${prop.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editProperty(${prop.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProperty(${prop.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function loadUsers() {
    const users = [
        { id: 1, username: 'john_doe', email: 'john@example.com', role: 'User', joined: '2024-01-15' },
        { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'User', joined: '2024-01-20' },
        { id: 3, username: 'admin_user', email: 'admin@example.com', role: 'Admin', joined: '2024-01-01' }
    ];
    
    const table = document.getElementById('usersTable');
    table.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.joined}</td>
        </tr>
    `).join('');
}

function loadTransactions() {
    const transactions = [
        { id: 1, userId: 1, propertyId: 5, amount: '$850,000', crypto: 'ETH', status: 'Completed', date: '2024-02-08' },
        { id: 2, userId: 2, propertyId: 8, amount: '$1,500,000', crypto: 'BTC', status: 'Pending', date: '2024-02-09' },
        { id: 3, userId: 3, propertyId: 12, amount: '$450,000', crypto: 'USDT', status: 'Completed', date: '2024-02-10' }
    ];
    
    const table = document.getElementById('transactionsTable');
    table.innerHTML = transactions.map(tx => `
        <tr>
            <td>${tx.id}</td>
            <td>${tx.userId}</td>
            <td>${tx.propertyId}</td>
            <td>${tx.amount}</td>
            <td>${tx.crypto}</td>
            <td><span class="status-badge ${tx.status.toLowerCase()}">${tx.status}</span></td>
            <td>${tx.date}</td>
        </tr>
    `).join('');
    
    // Also load recent transactions in dashboard
    const recentList = document.getElementById('recentTransactionsList');
    recentList.innerHTML = transactions.slice(0, 3).map(tx => `
        <div class="transaction-item">
            <div>
                <strong>Property #${tx.propertyId}</strong>
                <p>${tx.amount} in ${tx.crypto}</p>
            </div>
            <span class="transaction-time">${tx.date}</span>
        </div>
    `).join('');
}

function loadActivityLogs() {
    const logs = [
        { id: 1, userId: 1, action: 'Viewed Property', entity: 'Property #5', date: '2024-02-10 14:30' },
        { id: 2, userId: 2, action: 'Added to Favorites', entity: 'Property #8', date: '2024-02-10 13:45' },
        { id: 3, userId: 3, action: 'Initiated Payment', entity: 'Property #12', date: '2024-02-10 12:20' }
    ];
    
    const table = document.getElementById('logsTable');
    table.innerHTML = logs.map(log => `
        <tr>
            <td>${log.id}</td>
            <td>${log.userId}</td>
            <td>${log.action}</td>
            <td>${log.entity}</td>
            <td>${log.date}</td>
        </tr>
    `).join('');
}

// ==================== PROPERTY MANAGEMENT ====================
function showAddPropertyForm() {
    document.getElementById('propertyModal').style.display = 'block';
    document.getElementById('propertyModalTitle').textContent = 'Add Property';
    document.getElementById('propertyForm').reset();
}

function closePropertyModal() {
    document.getElementById('propertyModal').style.display = 'none';
}

function editProperty(propertyId) {
    document.getElementById('propertyModal').style.display = 'block';
    document.getElementById('propertyModalTitle').textContent = 'Edit Property';
    // Load property data
}

function deleteProperty(propertyId) {
    if (confirm('Are you sure you want to delete this property?')) {
        // Delete property
        alert('Property deleted successfully');
        loadProperties();
    }
}

function saveProperty(event) {
    event.preventDefault();
    // Save property
    alert('Property saved successfully');
    closePropertyModal();
    loadProperties();
}

// ==================== SETTINGS ====================
function saveSettings() {
    alert('Settings saved successfully');
}

// ==================== LOGOUT ====================
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/logout';
    }
}

// ==================== SIDEBAR TOGGLE ====================
function toggleSidebar() {
    const nav = document.querySelector('.sidebar-nav');
    nav.classList.toggle('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('propertyModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Load language preference
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('adminLanguage') || 'en';
    document.getElementById('languageSelect').value = savedLang;
    changeLanguage(savedLang);
});
