import os
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

    # ==========================
    # DEBUG DATABASE
    # ==========================
    print("=" * 60)
    print("Current Working Directory:")
    print(os.getcwd())
    print()

    print("Database URI:")
    print(app.config["SQLALCHEMY_DATABASE_URI"])
    print()

    print("Database Exists:")
    db_path = app.config["SQLALCHEMY_DATABASE_URI"].replace("sqlite:///", "")
    print(os.path.exists(db_path), db_path)
    print("=" * 60)

    db.init_app(app)

    try:
        mail.init_app(app)

        if not app.config.get("MAIL_USERNAME") or not app.config.get("MAIL_PASSWORD"):
            print("⚠️ Email credentials not configured.")
        else:
            print(
                f"✅ Mail configured with {app.config['MAIL_SERVER']}:{app.config['MAIL_PORT']}"
            )

    except Exception as e:
        print(f"❌ Mail Error: {e}")

    JWTManager(app)
    Migrate(app, db)

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:5173"
                ]
            }
        },
        supports_credentials=True,
    )

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(reports_bp, url_prefix="/api/reports")

    @app.route("/")
    def index():
        return jsonify(
            {
                "message": "TracePoint Backend Running"
            }
        )

    @app.route("/api/health")
    def health():
        return jsonify(
            {
                "status": "success"
            }
        )

    # ─── Placeholder endpoints for frontend ─────────────────────
    @app.route("/api/organizations", methods=["GET"])
    @jwt_required()
    def get_organizations():
        return jsonify([]), 200

    @app.route("/api/organizations", methods=["POST"])
    @jwt_required()
    def create_organization():
        return jsonify({"message": "Organization created"}), 201

    @app.route("/api/messages", methods=["GET"])
    @jwt_required()
    def get_messages():
        return jsonify([]), 200

    @app.route("/api/messages", methods=["POST"])
    @jwt_required()
    def send_message():
        return jsonify({"message": "Message sent"}), 201

    @app.route("/api/users/stats", methods=["GET"])
    @jwt_required()
    def user_stats():
        return jsonify({
            "totalUsers": 1,
            "activeUsers": 1,
            "pendingVerifications": 0,
            "recentSignups": 0
        }), 200

    @app.route("/api/cases/stats", methods=["GET"])
    @jwt_required()
    def cases_stats():
        return jsonify({
            "totalCases": 0,
            "openCases": 0,
            "resolvedCases": 0,
            "pendingCases": 0
        }), 200

    @app.route("/api/cases", methods=["GET"])
    @jwt_required()
    def get_cases():
        return jsonify([]), 200

    @app.route("/api/notifications", methods=["GET"])
    @jwt_required()
    def get_notifications():
        return jsonify([]), 200

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)