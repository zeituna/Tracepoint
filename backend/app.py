from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from flask_migrate import Migrate
from config import Config
from database import db
from models import User
from routes.auth import auth_bp
from routes.reports import reports_bp
from services.email_service import mail

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    
    try:
        mail.init_app(app)
        if not app.config.get('MAIL_USERNAME') or not app.config.get('MAIL_PASSWORD'):
            print("⚠️ Email credentials not set. Email sending will fail.")
        else:
            print("✅ Mail configured with", app.config.get('MAIL_SERVER'), 
                  "port", app.config.get('MAIL_PORT'))
    except Exception as e:
        print(f"❌ Mail initialization error: {e}")
    
    JWTManager(app)
    Migrate(app, db)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(reports_bp, url_prefix="/api/reports")

    @app.route("/")
    def index():
        return jsonify({"message": "TracePoint API is running. Use /api/ endpoints."}), 200

    @app.route("/favicon.ico")
    def favicon():
        return "", 204

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok", "message": "TracePoint API is running"}), 200

    @app.route("/api/messages/unread/count", methods=["GET"])
    @jwt_required()
    def unread_count():
        try:
            return jsonify({"count": 0}), 200
        except Exception as e:
            print("🔴 ERROR in /api/messages/unread/count:", e)
            return jsonify({"error": str(e)}), 500

    @app.route("/api/users/stats", methods=["GET"])
    @jwt_required()
    def user_stats():
        try:
            return jsonify({
                "totalUsers": 1,
                "activeUsers": 1,
                "pendingVerifications": 0,
                "recentSignups": 0
            }), 200
        except Exception as e:
            print("🔴 ERROR in /api/users/stats:", e)
            return jsonify({"error": str(e)}), 500

    @app.route("/api/cases/stats", methods=["GET"])
    @jwt_required()
    def cases_stats():
        try:
            return jsonify({
                "totalCases": 0,
                "openCases": 0,
                "resolvedCases": 0,
                "pendingCases": 0
            }), 200
        except Exception as e:
            print("🔴 ERROR in /api/cases/stats:", e)
            return jsonify({"error": str(e)}), 500

    @app.route("/api/messages", methods=["GET"])
    @jwt_required()
    def get_messages():
        try:
            return jsonify([]), 200
        except Exception as e:
            print("🔴 ERROR in /api/messages:", e)
            return jsonify({"error": str(e)}), 500

    @app.route("/api/cases", methods=["GET"])
    @jwt_required()
    def get_cases():
        try:
            return jsonify([]), 200
        except Exception as e:
            print("🔴 ERROR in /api/cases:", e)
            return jsonify({"error": str(e)}), 500

    @app.route("/api/notifications", methods=["GET"])
    @jwt_required()
    def get_notifications():
        try:
            return jsonify([]), 200
        except Exception as e:
            print("🔴 ERROR in /api/notifications:", e)
            return jsonify({"error": str(e)}), 500

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": f"Endpoint {request.path} not found"}), 404

    @app.errorhandler(Exception)
    def handle_exception(e):
        print("🔴 Unhandled exception:", e)
        return jsonify({"error": str(e)}), 500

    def seed_admin():
        admin_email = "admin@tracepoint.org"
        admin = User.query.filter_by(email=admin_email).first()
        if not admin:
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

    with app.app_context():
        db.create_all()
        seed_admin()

        print("\n📋 Registered Routes:")
        for rule in app.url_map.iter_rules():
            methods = ",".join(sorted(rule.methods))
            print(f"   {rule.rule:55} [{methods}]")
        print()

    return app

if __name__ == "__main__":
    app = create_app()
    print("\n🚀 TracePoint server running on http://localhost:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)