import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # NOTE: Flask-SQLAlchemy 3.x resolves relative sqlite paths against
    # app.instance_path (already .../backend/instance), so the path here
    # must be just the filename, not 'instance/tracepoint.db', or it
    # resolves to a nonexistent 'instance/instance/tracepoint.db'.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///tracepoint.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key-change-in-production'
    JWT_ACCESS_TOKEN_EXPIRES = 86400
    
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') or True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')
    
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS') or 'http://localhost:5173'
    FRONTEND_URL = os.environ.get('FRONTEND_URL') or 'http://localhost:5173'
