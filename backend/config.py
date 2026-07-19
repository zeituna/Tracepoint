import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask / Security
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///instance/tracepoint.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ─── Email configuration ────────────────────────────────────
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'true').lower() == 'true'
    MAIL_USE_SSL = os.getenv('MAIL_USE_SSL', 'false').lower() == 'true'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    # Default sender must match the authenticated user
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', MAIL_USERNAME)

    # ─── Verification settings ─────────────────────────────────
    VERIFICATION_CODE_LENGTH = int(os.getenv('VERIFICATION_CODE_LENGTH', 6))
    VERIFICATION_CODE_EXPIRY_MINUTES = int(os.getenv('VERIFICATION_CODE_EXPIRY_MINUTES', 10))

    # ─── Google OAuth ───────────────────────────────────────────
    GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
    GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
    GOOGLE_REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI', 
                                     'http://localhost:5000/api/auth/google-callback')
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5174')