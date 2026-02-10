# Brokerok - Real Estate Platform for Turkey

A modern, elegant real estate platform built with Python Flask for discovering and managing properties across Turkish cities.

## Features

### 🏠 Main Features
- **Central Search** - Elegant search interface with city, district, and property type filters
- **Advanced Filtering** - Filter by price range, area, number of rooms, and more
- **Property Catalog** - Beautiful grid layout with property cards showing photos, prices, and key details
- **Detailed Pages** - Full property information with photo gallery, map integration, and characteristics
- **Favorites System** - Save properties to favorites for later viewing
- **Activity Logging** - Track user actions and system events

### 🌍 Turkish Coverage
- **8 Major Cities**: Istanbul, Ankara, Izmir, Antalya, Bursa, Gaziantep, Konya, Kayseri
- **Multiple Districts** - Each city has its main districts for detailed location filtering
- **Property Types** - Apartments, Villas, Houses, and Land

### 🔐 Security & Authorization
- User authentication system
- Role-based access control (user, admin, agent)
- Protected routes for sensitive operations

### 💳 Payment System
- Cryptocurrency payment integration ready
- Transaction tracking and logging
- Payment status management

### 📊 Admin Dashboard
- Analytics and statistics
- Property management (create, edit, delete)
- User activity logs
- Transaction monitoring

## Technology Stack

### Backend
- **Framework**: Flask 3.1.2
- **Database**: SQLAlchemy ORM with MySQL/TiDB support
- **Authentication**: Flask-JWT-Extended
- **API**: RESTful API with JSON responses

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript** - Vanilla JS for interactivity
- **Responsive Design** - Mobile-first approach

### Database Models
- **User** - User accounts with roles
- **City** - Turkish cities with coordinates
- **District** - City districts with geographic data
- **Property** - Real estate listings with full details
- **Favorite** - User favorites tracking
- **Transaction** - Payment and transaction records
- **ActivityLog** - User actions and system events

## Installation

### Prerequisites
- Python 3.11+
- pip and virtualenv

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/brokerok.git
cd brokerok

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create database
python -c "from app import app, db; app.app_context().push(); db.create_all()"

# Initialize Turkish cities and districts
curl -X POST http://localhost:5000/api/init/cities
curl -X POST http://localhost:5000/api/init/districts

# Run the application
python wsgi.py
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Cities & Districts
- `GET /api/cities` - Get all cities
- `GET /api/cities/<id>/districts` - Get districts for a city

### Properties
- `GET /api/properties` - Get properties with filtering
  - Query params: `city_id`, `district_id`, `type`, `min_price`, `max_price`, `min_area`, `max_area`, `rooms`, `page`, `per_page`
- `GET /api/properties/<id>` - Get property details

### Favorites
- `GET /api/favorites?user_id=<id>` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites?user_id=<id>&property_id=<id>` - Remove from favorites

### Transactions
- `POST /api/transactions` - Create a transaction

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/logs` - Get activity logs

## Project Structure

```
brokerok/
├── app.py              # Main Flask application
├── models.py           # Database models
├── wsgi.py             # WSGI entry point
├── requirements.txt    # Python dependencies
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── README.md           # This file
├── templates/
│   └── index.html      # Main HTML template
└── static/
    ├── css/
    │   └── style.css   # Main stylesheet
    └── js/
        └── main.js     # JavaScript functionality
```

## Configuration

Create a `.env` file in the project root:

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=mysql+pymysql://user:password@host:port/database
JWT_SECRET_KEY=your-jwt-secret-key-here
```

## Design Features

### Color Scheme
- **Primary**: #2c3e50 (Dark Blue)
- **Secondary**: #e74c3c (Red)
- **Accent**: #3498db (Light Blue)
- **Background**: #ecf0f1 (Light Gray)

### Typography
- Font Family: Poppins
- Responsive sizing with mobile-first approach

### User Experience
- Smooth transitions and hover effects
- Intuitive navigation
- Clear call-to-action buttons
- Accessible design with proper contrast

## Future Enhancements

- [ ] Manus OAuth integration
- [ ] Cryptocurrency payment gateway
- [ ] Google Maps integration for property locations
- [ ] Image upload to S3 storage
- [ ] Email notifications
- [ ] Admin panel with AdminLTE styling
- [ ] Property search with AI recommendations
- [ ] Mobile app (React Native)
- [ ] Real-time chat with agents
- [ ] Property comparison tool

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@brokerok.com or open an issue on GitHub.

## Author

Brokerok Development Team

---

**Made with ❤️ for the Turkish Real Estate Market**
