from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    role = db.Column(db.String(20), default='user')  # user, admin, agent
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    favorites = db.relationship('Favorite', backref='user', lazy=True, cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', backref='user', lazy=True, cascade='all, delete-orphan')

class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    slug = db.Column(db.String(100), unique=True)
    description = db.Column(db.Text)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    image_url = db.Column(db.String(500))
    
    districts = db.relationship('District', backref='city', lazy=True, cascade='all, delete-orphan')
    properties = db.relationship('Property', backref='city', lazy=True)

class District(db.Model):
    __tablename__ = 'districts'
    id = db.Column(db.Integer, primary_key=True)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100))
    description = db.Column(db.Text)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    
    properties = db.relationship('Property', backref='district', lazy=True)

class Property(db.Model):
    __tablename__ = 'properties'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    property_type = db.Column(db.String(50), nullable=False)  # apartment, villa, house, land
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    district_id = db.Column(db.Integer, db.ForeignKey('districts.id'))
    street_address = db.Column(db.String(200))
    price = db.Column(db.Float, nullable=False)
    area = db.Column(db.Float)  # in square meters
    rooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    floor = db.Column(db.Integer)
    total_floors = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    
    # Additional features stored as JSON
    features = db.Column(db.Text)  # JSON string
    
    # Images
    main_image = db.Column(db.String(500))
    images = db.Column(db.Text)  # JSON array of image URLs
    
    # Status
    status = db.Column(db.String(20), default='available')  # available, sold, rented
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    favorites = db.relationship('Favorite', backref='property', lazy=True, cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', backref='property', lazy=True)
    
    def get_features(self):
        if self.features:
            return json.loads(self.features)
        return {}
    
    def set_features(self, features_dict):
        self.features = json.dumps(features_dict)
    
    def get_images(self):
        if self.images:
            return json.loads(self.images)
        return []
    
    def set_images(self, images_list):
        self.images = json.dumps(images_list)

class Favorite(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), default='USD')
    crypto_type = db.Column(db.String(20))  # BTC, ETH, USDT, etc
    wallet_address = db.Column(db.String(255))
    transaction_hash = db.Column(db.String(255))
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ActivityLog(db.Model):
    __tablename__ = 'activity_logs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    action = db.Column(db.String(100), nullable=False)
    entity_type = db.Column(db.String(50))  # property, user, transaction, etc
    entity_id = db.Column(db.Integer)
    details = db.Column(db.Text)  # JSON string
    ip_address = db.Column(db.String(45))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
