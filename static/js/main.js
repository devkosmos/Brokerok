// Global state
let currentPage = 1;
let currentFilters = {
    city_id: null,
    district_id: null,
    type: null,
    min_price: null,
    max_price: null,
    min_area: null,
    max_area: null,
    rooms: null,
    status: 'available'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCities();
    loadProperties();
});

// Load cities
async function loadCities() {
    try {
        const response = await fetch('/api/cities');
        const cities = await response.json();
        
        const citySelect = document.getElementById('cityFilter');
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.id;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });

        // Initialize districts
        citySelect.addEventListener('change', function() {
            loadDistricts(this.value);
        });
    } catch (error) {
        console.error('Error loading cities:', error);
    }
}

// Load districts
async function loadDistricts(cityId) {
    try {
        const districtSelect = document.getElementById('districtFilter');
        districtSelect.innerHTML = '<option value="">All Districts</option>';
        
        if (!cityId) return;

        const response = await fetch(`/api/cities/${cityId}/districts`);
        const districts = await response.json();
        
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district.id;
            option.textContent = district.name;
            districtSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading districts:', error);
    }
}

// Load properties
async function loadProperties(page = 1) {
    try {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('per_page', 12);

        if (currentFilters.city_id) params.append('city_id', currentFilters.city_id);
        if (currentFilters.district_id) params.append('district_id', currentFilters.district_id);
        if (currentFilters.type) params.append('type', currentFilters.type);
        if (currentFilters.min_price) params.append('min_price', currentFilters.min_price);
        if (currentFilters.max_price) params.append('max_price', currentFilters.max_price);
        if (currentFilters.min_area) params.append('min_area', currentFilters.min_area);
        if (currentFilters.max_area) params.append('max_area', currentFilters.max_area);
        if (currentFilters.rooms) params.append('rooms', currentFilters.rooms);
        params.append('status', currentFilters.status);

        const response = await fetch(`/api/properties?${params}`);
        const data = await response.json();

        renderProperties(data.properties);
        renderPagination(data.pages, page);
        currentPage = page;
    } catch (error) {
        console.error('Error loading properties:', error);
    }
}

// Render properties
function renderProperties(properties) {
    const grid = document.getElementById('propertiesGrid');
    grid.innerHTML = '';

    if (properties.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No properties found</p>';
        return;
    }

    properties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        
        const imageUrl = property.main_image || 'https://via.placeholder.com/280x200?text=No+Image';
        const roomsText = property.rooms ? `${property.rooms} Rooms` : 'N/A';
        const areaText = property.area ? `${property.area} m²` : 'N/A';

        card.innerHTML = `
            <img src="${imageUrl}" alt="${property.title}" class="property-image" onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'">
            <div class="property-info">
                <span class="property-type">${property.type.toUpperCase()}</span>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-price">$${property.price.toLocaleString()}</p>
                <div class="property-details">
                    <div class="detail-item">
                        <i class="fas fa-door-open"></i>
                        <span>${roomsText}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${areaText}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${property.city || 'N/A'}</span>
                    </div>
                </div>
                <p class="property-location">
                    <i class="fas fa-map-pin"></i> ${property.district || property.street || 'Location'}
                </p>
                <div class="property-actions">
                    <button class="view-btn" onclick="viewPropertyDetails(${property.id})">View Details</button>
                    <button class="favorite-btn" onclick="toggleFavorite(${property.id}, this)">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Render pagination
function renderPagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.onclick = () => loadProperties(currentPage - 1);
        pagination.appendChild(prevBtn);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === currentPage) btn.classList.add('active');
            btn.onclick = () => loadProperties(i);
            pagination.appendChild(btn);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            const span = document.createElement('span');
            span.textContent = '...';
            span.style.padding = '10px 5px';
            pagination.appendChild(span);
        }
    }

    // Next button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = () => loadProperties(currentPage + 1);
        pagination.appendChild(nextBtn);
    }
}

// Filter by type
function filterByType(type) {
    // Update active button
    document.querySelectorAll('.quick-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    currentFilters.type = type;
    currentPage = 1;
    loadProperties();
}

// Apply filters
function applyFilters() {
    currentFilters.city_id = document.getElementById('cityFilter').value || null;
    currentFilters.district_id = document.getElementById('districtFilter').value || null;
    currentFilters.type = document.getElementById('typeFilter').value || null;
    currentPage = 1;
    loadProperties();
}

// Apply advanced filters
function applyAdvancedFilters() {
    currentFilters.min_price = document.getElementById('minPrice').value || null;
    currentFilters.max_price = document.getElementById('maxPrice').value || null;
    currentFilters.min_area = document.getElementById('minArea').value || null;
    currentFilters.max_area = document.getElementById('maxArea').value || null;
    currentFilters.rooms = document.getElementById('roomsFilter').value || null;
    currentPage = 1;
    loadProperties();
}

// View property details
async function viewPropertyDetails(propertyId) {
    try {
        const response = await fetch(`/api/properties/${propertyId}`);
        const property = await response.json();

        const modal = document.getElementById('propertyModal');
        const detailDiv = document.getElementById('propertyDetail');

        const imageUrl = property.main_image || 'https://via.placeholder.com/400x300?text=No+Image';
        const images = property.images && property.images.length > 0 
            ? property.images 
            : [imageUrl];

        const thumbnailsHtml = images.map((img, idx) => `
            <img src="${img}" alt="Image ${idx + 1}" class="thumbnail ${idx === 0 ? 'active' : ''}" 
                 onclick="switchImage('${img}')" onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'">
        `).join('');

        const featuresHtml = property.features && Object.keys(property.features).length > 0
            ? Object.entries(property.features).map(([key, value]) => 
                `<div class="feature-item">${key}: ${value}</div>`
            ).join('')
            : '<div class="feature-item">No additional features</div>';

        detailDiv.innerHTML = `
            <div class="property-gallery">
                <img src="${imageUrl}" alt="${property.title}" class="main-image" id="mainImage" 
                     onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                <div class="thumbnail-images">
                    ${thumbnailsHtml}
                </div>
            </div>
            <div class="property-info-detail">
                <h2>${property.title}</h2>
                <p class="property-price-detail">$${property.price.toLocaleString()}</p>
                
                <div class="property-specs">
                    <div class="spec-item">
                        <i class="fas fa-door-open"></i>
                        <span>${property.rooms || 'N/A'} Rooms</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-bath"></i>
                        <span>${property.bathrooms || 'N/A'} Bathrooms</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.area || 'N/A'} m²</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-layer-group"></i>
                        <span>Floor ${property.floor || 'N/A'}/${property.total_floors || 'N/A'}</span>
                    </div>
                </div>

                <div class="property-description">
                    <h3>Description</h3>
                    <p>${property.description || 'No description available'}</p>
                </div>

                <div class="property-features">
                    <h3>Features</h3>
                    <div class="features-list">
                        ${featuresHtml}
                    </div>
                </div>

                <div class="property-specs">
                    <div class="spec-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${property.city?.name || 'N/A'}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-map-pin"></i>
                        <span>${property.district?.name || 'N/A'}</span>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="contact-btn" onclick="contactManager(${property.id})">
                        <i class="fas fa-phone"></i> Contact Manager
                    </button>
                    <button class="purchase-btn" onclick="purchaseProperty(${property.id})">
                        <i class="fas fa-credit-card"></i> Purchase
                    </button>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading property details:', error);
        alert('Error loading property details');
    }
}

// Switch image in modal
function switchImage(imageUrl) {
    document.getElementById('mainImage').src = imageUrl;
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Close property modal
function closePropertyModal() {
    document.getElementById('propertyModal').style.display = 'none';
}

// Toggle favorite
async function toggleFavorite(propertyId, button) {
    const userId = localStorage.getItem('userId') || 1; // Mock user ID

    try {
        if (button.classList.contains('active')) {
            // Remove from favorites
            await fetch(`/api/favorites?user_id=${userId}&property_id=${propertyId}`, {
                method: 'DELETE'
            });
            button.classList.remove('active');
        } else {
            // Add to favorites
            const response = await fetch('/api/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, property_id: propertyId })
            });
            if (response.ok) {
                button.classList.add('active');
            }
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Contact manager
function contactManager(propertyId) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Please login first to contact the manager');
        return;
    }
    alert('Manager contact form would open here. Property ID: ' + propertyId);
}

// Purchase property
function purchaseProperty(propertyId) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Please login first to purchase a property');
        return;
    }
    alert('Crypto payment form would open here. Property ID: ' + propertyId);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('propertyModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
