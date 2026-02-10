"""Authentication module for Brokerok"""

from flask import session, request, jsonify
from functools import wraps
from datetime import datetime, timedelta
import secrets
from models import db, User

class AuthManager:
    """Handle user authentication"""
    
    @staticmethod
    def register(email, password, name=None):
        """Register a new user"""
        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {'error': 'User already exists'}, 400
        
        # Create new user
        user = User(
            email=email,
            name=name or email.split('@')[0],
            password_hash=AuthManager.hash_password(password),
            role='user'
        )
        
        db.session.add(user)
        db.session.commit()
        
        return {'message': 'User registered successfully', 'user_id': user.id}, 201
    
    @staticmethod
    def login(email, password):
        """Login user"""
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return {'error': 'Invalid email or password'}, 401
        
        if not AuthManager.verify_password(password, user.password_hash):
            return {'error': 'Invalid email or password'}, 401
        
        # Update last signed in
        user.last_signed_in = datetime.utcnow()
        db.session.commit()
        
        # Create session token
        token = secrets.token_urlsafe(32)
        session['user_id'] = user.id
        session['user_email'] = user.email
        session['user_role'] = user.role
        session['token'] = token
        
        return {
            'message': 'Login successful',
            'user_id': user.id,
            'email': user.email,
            'name': user.name,
            'role': user.role,
            'token': token
        }, 200
    
    @staticmethod
    def logout():
        """Logout user"""
        session.clear()
        return {'message': 'Logout successful'}, 200
    
    @staticmethod
    def get_current_user():
        """Get current logged in user"""
        user_id = session.get('user_id')
        if not user_id:
            return None
        
        user = User.query.get(user_id)
        return user
    
    @staticmethod
    def hash_password(password):
        """Hash password (simplified - use bcrypt in production)"""
        import hashlib
        return hashlib.sha256(password.encode()).hexdigest()
    
    @staticmethod
    def verify_password(password, hash_value):
        """Verify password"""
        import hashlib
        return hashlib.sha256(password.encode()).hexdigest() == hash_value
    
    @staticmethod
    def is_admin(user):
        """Check if user is admin"""
        return user and user.role == 'admin'
    
    @staticmethod
    def is_authenticated(user):
        """Check if user is authenticated"""
        return user is not None


def login_required(f):
    """Decorator to require login"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = AuthManager.get_current_user()
        if not user:
            return jsonify({'error': 'Login required'}), 401
        return f(*args, **kwargs)
    return decorated_function


def admin_required(f):
    """Decorator to require admin role"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = AuthManager.get_current_user()
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated_function
