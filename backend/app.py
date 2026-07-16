from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config
from database import db
from models import User
from routes.auth import auth_bp
from routes.reports import reports_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Extensions
    db.init_app(app)
    JWTManager(app)
    Migrate(app, db)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(reports_bp, url_prefix="/api/reports")

    # Health check
    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok", "message": "TracePoint API is running"}), 200

    # Seed admin user (only in development)
    def seed_admin():
        admin_email = "admin@tracepoint.org"
        admin = User.query.filter_by(email=admin_email).first()
        if not admin:
            # Find an available phone
            phone = "+254700000000"
            counter = 0
            while User.query.filter_by(phone=phone).first() and counter < 100:
                counter += 1
                phone = f"+25470000000{counter}"
            if counter >= 100:
                print("❌ Could not find an available phone number for admin.")
                return

            admin = User(
                username="admin",
                email=admin_email,
                phone=phone,
                full_name="System Administrator",
                role="admin",
                is_active=True,
                email_verified=True,
                phone_verified=True,
            )
            admin.set_password("admin123")
            db.session.add(admin)
            db.session.commit()
            print(f"✅ Admin user created: {admin_email} (username: admin, password: admin123)")
        else:
            print(f"ℹ️ Admin user already exists: {admin_email}")

    # Create tables and seed
    with app.app_context():
        db.create_all()
        seed_admin()

        # Print routes
        print("\n📋 Registered Routes:")
        for rule in app.url_map.iter_rules():
            methods = ",".join(sorted(rule.methods))
            print(f"   {rule.rule:55} [{methods}]")
        print()

    return app

if __name__ == "__main__":
    app = create_app()
    print("🚀 TracePoint server running on http://localhost:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)