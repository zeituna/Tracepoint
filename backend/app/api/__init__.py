"""API package"""

from app.api import auth, users, messages, cases

def register_blueprints(app):
    app.register_blueprint(auth.bp, url_prefix="/api/auth")
    app.register_blueprint(users.bp, url_prefix="/api")
    app.register_blueprint(messages.bp, url_prefix="/api")
    app.register_blueprint(cases.bp, url_prefix="/api")
