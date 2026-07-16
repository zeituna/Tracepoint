from datetime import datetime
from database import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import re

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)

    full_name = db.Column(db.String(100))
    phone = db.Column(db.String(20), unique=True)
    location = db.Column(db.String(100))

    role = db.Column(db.String(20), default='volunteer')  # admin, officer, volunteer, family

    is_active = db.Column(db.Boolean, default=True)
    email_verified = db.Column(db.Boolean, default=False)
    phone_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)

    # Relationships
    reported_cases = db.relationship('MissingPerson', backref='reporter', lazy=True)

    def set_password(self, plain_password):
        self.password_hash = generate_password_hash(plain_password)

    def check_password(self, plain_password):
        return check_password_hash(self.password_hash, plain_password)

    def generate_jwt(self):
        return create_access_token(identity=str(self.id), additional_claims={'role': self.role})

    @staticmethod
    def validate_email(email):
        return re.match(r"^[^@]+@[^@]+\.[^@]+$", email) is not None

    @staticmethod
    def validate_phone(phone):
        return re.match(r"^\+?[0-9]{10,15}$", phone) is not None

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'phone': self.phone,
            'role': self.role,
            'location': self.location,
            'is_active': self.is_active,
            'email_verified': self.email_verified,
            'phone_verified': self.phone_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None,
        }