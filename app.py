import os
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from models import db, User, City, District, Property, Favorite, Transaction, ActivityLog
from datetime import datetime
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
db_url = os.getenv('DATABASE_URL', 'sqlite:////tmp/brokerok.db')
if db_url.startswith('mysql://'):
    db_url = db_url.replace('mysql://', 'mysql+pymysql://', 1)
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)

# Create tables
try:
    with app.app_context():
        db.create_all()
except Exception as e:
    print(f'Warning: Could not create tables: {e}')

# ==================== ROUTES ====================

@app.route('/')
def index():
    """Main page"""
    return render_template('index.html')

@app.route('/api/cities', methods=['GET'])
def get_cities():
    """Get all cities in Turkey"""
    cities = City.query.all()
    return jsonify([{
        'id': city.id,
        'name': city.name,
        'slug': city.slug,
        'description': city.description,
        'latitude': city.latitude,
        'longitude': city.longitude,
        'image_url': city.image_url
    } for city in cities])

@app.route('/api/cities/<int:city_id>/districts', methods=['GET'])
def get_districts(city_id):
    """Get districts for a city"""
    districts = District.query.filter_by(city_id=city_id).all()
    return jsonify([{
        'id': district.id,
        'name': district.name,
        'slug': district.slug,
        'description': district.description,
        'latitude': district.latitude,
        'longitude': district.longitude
    } for district in districts])

@app.route('/api/properties', methods=['GET'])
def get_properties():
    """Get properties with filtering"""
    query = Property.query
    
    # Filters
    city_id = request.args.get('city_id', type=int)
    district_id = request.args.get('district_id', type=int)
    property_type = request.args.get('type')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    min_area = request.args.get('min_area', type=float)
    max_area = request.args.get('max_area', type=float)
    rooms = request.args.get('rooms', type=int)
    status = request.args.get('status', default='available')
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=12, type=int)
    
    if city_id:
        query = query.filter_by(city_id=city_id)
    if district_id:
        query = query.filter_by(district_id=district_id)
    if property_type:
        query = query.filter_by(property_type=property_type)
    if min_price:
        query = query.filter(Property.price >= min_price)
    if max_price:
        query = query.filter(Property.price <= max_price)
    if min_area:
        query = query.filter(Property.area >= min_area)
    if max_area:
        query = query.filter(Property.area <= max_area)
    if rooms:
        query = query.filter_by(rooms=rooms)
    if status:
        query = query.filter_by(status=status)
    
    # Pagination
    paginated = query.paginate(page=page, per_page=per_page)
    
    properties = paginated.items
    return jsonify({
        'properties': [{
            'id': prop.id,
            'title': prop.title,
            'description': prop.description,
            'type': prop.property_type,
            'city': prop.city.name if prop.city else None,
            'district': prop.district.name if prop.district else None,
            'street': prop.street_address,
            'price': prop.price,
            'area': prop.area,
            'rooms': prop.rooms,
            'bathrooms': prop.bathrooms,
            'floor': prop.floor,
            'total_floors': prop.total_floors,
            'latitude': prop.latitude,
            'longitude': prop.longitude,
            'main_image': prop.main_image,
            'images': prop.get_images(),
            'features': prop.get_features(),
            'status': prop.status,
            'created_at': prop.created_at.isoformat()
        } for prop in properties],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    })

@app.route('/api/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Get property details"""
    prop = Property.query.get_or_404(property_id)
    
    # Log view
    user_id = request.args.get('user_id', type=int)
    log = ActivityLog(
        user_id=user_id,
        action='view_property',
        entity_type='property',
        entity_id=property_id,
        ip_address=request.remote_addr
    )
    db.session.add(log)
    db.session.commit()
    
    return jsonify({
        'id': prop.id,
        'title': prop.title,
        'description': prop.description,
        'type': prop.property_type,
        'city': {'id': prop.city.id, 'name': prop.city.name} if prop.city else None,
        'district': {'id': prop.district.id, 'name': prop.district.name} if prop.district else None,
        'street': prop.street_address,
        'price': prop.price,
        'area': prop.area,
        'rooms': prop.rooms,
        'bathrooms': prop.bathrooms,
        'floor': prop.floor,
        'total_floors': prop.total_floors,
        'latitude': prop.latitude,
        'longitude': prop.longitude,
        'main_image': prop.main_image,
        'images': prop.get_images(),
        'features': prop.get_features(),
        'status': prop.status,
        'created_at': prop.created_at.isoformat(),
        'updated_at': prop.updated_at.isoformat()
    })

@app.route('/api/favorites', methods=['GET', 'POST', 'DELETE'])
def manage_favorites():
    """Manage user favorites"""
    user_id = request.args.get('user_id', type=int)
    
    if not user_id:
        return jsonify({'error': 'user_id required'}), 400
    
    if request.method == 'GET':
        favorites = Favorite.query.filter_by(user_id=user_id).all()
        return jsonify([{
            'id': fav.id,
            'property_id': fav.property_id,
            'property': {
                'title': fav.property.title,
                'price': fav.property.price,
                'main_image': fav.property.main_image
            }
        } for fav in favorites])
    
    elif request.method == 'POST':
        data = request.get_json()
        property_id = data.get('property_id')
        
        existing = Favorite.query.filter_by(user_id=user_id, property_id=property_id).first()
        if existing:
            return jsonify({'error': 'Already in favorites'}), 400
        
        favorite = Favorite(user_id=user_id, property_id=property_id)
        db.session.add(favorite)
        db.session.commit()
        
        return jsonify({'id': favorite.id, 'message': 'Added to favorites'}), 201
    
    elif request.method == 'DELETE':
        property_id = request.args.get('property_id', type=int)
        favorite = Favorite.query.filter_by(user_id=user_id, property_id=property_id).first_or_404()
        db.session.delete(favorite)
        db.session.commit()
        
        return jsonify({'message': 'Removed from favorites'})

@app.route('/api/transactions', methods=['POST'])
def create_transaction():
    """Create a new transaction"""
    data = request.get_json()
    
    transaction = Transaction(
        user_id=data.get('user_id'),
        property_id=data.get('property_id'),
        amount=data.get('amount'),
        currency=data.get('currency', 'USD'),
        crypto_type=data.get('crypto_type'),
        wallet_address=data.get('wallet_address'),
        status='pending'
    )
    
    db.session.add(transaction)
    db.session.commit()
    
    # Log activity
    log = ActivityLog(
        user_id=data.get('user_id'),
        action='create_transaction',
        entity_type='transaction',
        entity_id=transaction.id,
        details=json.dumps({'property_id': data.get('property_id'), 'amount': data.get('amount')}),
        ip_address=request.remote_addr
    )
    db.session.add(log)
    db.session.commit()
    
    return jsonify({
        'id': transaction.id,
        'status': transaction.status,
        'created_at': transaction.created_at.isoformat()
    }), 201

@app.route('/api/admin/stats', methods=['GET'])
def get_admin_stats():
    """Get admin dashboard statistics"""
    total_properties = Property.query.count()
    total_users = User.query.count()
    total_transactions = Transaction.query.count()
    total_views = ActivityLog.query.filter_by(action='view_property').count()
    
    # Recent transactions
    recent_transactions = Transaction.query.order_by(Transaction.created_at.desc()).limit(5).all()
    
    return jsonify({
        'total_properties': total_properties,
        'total_users': total_users,
        'total_transactions': total_transactions,
        'total_views': total_views,
        'recent_transactions': [{
            'id': t.id,
            'user_id': t.user_id,
            'property_id': t.property_id,
            'amount': t.amount,
            'status': t.status,
            'created_at': t.created_at.isoformat()
        } for t in recent_transactions]
    })

@app.route('/api/admin/logs', methods=['GET'])
def get_admin_logs():
    """Get activity logs"""
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=20, type=int)
    
    paginated = ActivityLog.query.order_by(ActivityLog.created_at.desc()).paginate(page=page, per_page=per_page)
    
    return jsonify({
        'logs': [{
            'id': log.id,
            'user_id': log.user_id,
            'action': log.action,
            'entity_type': log.entity_type,
            'entity_id': log.entity_id,
            'details': log.details,
            'ip_address': log.ip_address,
            'created_at': log.created_at.isoformat()
        } for log in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    })

# ==================== INITIALIZATION ROUTES ====================

@app.route('/api/init/cities', methods=['POST'])
def init_cities():
    """Initialize Turkish cities"""
    cities_data = [
        {'name': 'Istanbul', 'slug': 'istanbul', 'latitude': 41.0082, 'longitude': 28.9784},
        {'name': 'Ankara', 'slug': 'ankara', 'latitude': 39.9334, 'longitude': 32.8597},
        {'name': 'Izmir', 'slug': 'izmir', 'latitude': 38.4161, 'longitude': 27.1228},
        {'name': 'Antalya', 'slug': 'antalya', 'latitude': 36.8969, 'longitude': 30.7133},
        {'name': 'Bursa', 'slug': 'bursa', 'latitude': 40.1955, 'longitude': 29.1763},
        {'name': 'Gaziantep', 'slug': 'gaziantep', 'latitude': 37.0662, 'longitude': 37.3833},
        {'name': 'Konya', 'slug': 'konya', 'latitude': 37.8713, 'longitude': 32.4844},
        {'name': 'Kayseri', 'slug': 'kayseri', 'latitude': 38.7269, 'longitude': 35.4831},
    ]
    
    for city_data in cities_data:
        existing = City.query.filter_by(slug=city_data['slug']).first()
        if not existing:
            city = City(**city_data)
            db.session.add(city)
    
    db.session.commit()
    return jsonify({'message': 'Cities initialized'})

@app.route('/api/init/districts', methods=['POST'])
def init_districts():
    """Initialize districts for cities"""
    districts_data = {
        'istanbul': [
            'Beyoglu', 'Fatih', 'Sisli', 'Besiktas', 'Kadikoy', 'Uskudar', 'Maltepe', 'Pendik'
        ],
        'ankara': [
            'Cankaya', 'Kecioren', 'Mamak', 'Altindag', 'Yenimahalle', 'Pursaklar'
        ],
        'izmir': [
            'Alsancak', 'Bornova', 'Karsiyaka', 'Konak', 'Gaziemir', 'Cigli'
        ],
        'antalya': [
            'Muratpasa', 'Kepez', 'Dosemealti', 'Aksu', 'Manavgat'
        ],
        'bursa': [
            'Osmangazi', 'Nilüfer', 'Yildirim', 'Inegol', 'Mudanya'
        ],
        'gaziantep': [
            'Sahinbey', 'Sehitkamil', 'Oğuzeli', 'Islahiye'
        ],
        'konya': [
            'Meram', 'Selcuklu', 'Karatay', 'Cihanbeyli'
        ],
        'kayseri': [
            'Melikgazi', 'Kocasinan', 'Talas', 'Develi'
        ],
    }
    
    for city_slug, district_names in districts_data.items():
        city = City.query.filter_by(slug=city_slug).first()
        if city:
            for district_name in district_names:
                existing = District.query.filter_by(city_id=city.id, name=district_name).first()
                if not existing:
                    district = District(city_id=city.id, name=district_name, slug=district_name.lower())
                    db.session.add(district)
    
    db.session.commit()
    return jsonify({'message': 'Districts initialized'})

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f'Warning: Could not create tables: {e}')
    app.run(debug=True, host='0.0.0.0', port=5000)
