"""
Flask Application Factory
"""

from flask import Flask
from app.extensions import init_extensions

def create_app(config_object=None):
    """Application factory function"""
    app = Flask(__name__)
    
    if config_object:
        app.config.from_object(config_object)
    else:
        app.config.from_object("app.config.Config")
    
    # Initialize extensions
    init_extensions(app)
    
    # Register blueprints
    try:
        from app.api.auth import bp as auth_bp
        from app.api.users import bp as users_bp
        from app.api.messages import bp as messages_bp
        from app.api.cases import bp as cases_bp
        from app.api.health import bp as health_bp
        from app.api.ingest import bp as ingest_bp
        from app.api.query import bp as query_bp
        
        # Register blueprints with correct prefixes
        app.register_blueprint(auth_bp, url_prefix="/api/auth")
        app.register_blueprint(users_bp, url_prefix="/api")  # Changed from /api/users to /api
        app.register_blueprint(messages_bp, url_prefix="/api")  # Added
        app.register_blueprint(cases_bp, url_prefix="/api")  # Added
        app.register_blueprint(health_bp, url_prefix="/api/health")
        app.register_blueprint(ingest_bp, url_prefix="/api/ingest")
        app.register_blueprint(query_bp, url_prefix="/api/query")
    except ImportError as e:
        print(f"Warning: Could not import blueprint: {e}")
    
    @app.route("/")
    def index():
        return {
            "service": "Tracepoint",
            "version": "1.0.0",
            "status": "running",
            "endpoints": {
                "auth": "/api/auth/register, /api/auth/login",
                "users": "/api/users",
                "cases": "/api/cases",
                "messages": "/api/messages",
                "ingest": "/api/ingest/traces",
                "query": "/api/query/traces",
                "health": "/api/health"
            }
        }
    
    return app
