from flask import Blueprint, request, jsonify, current_app, redirect, session
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from database import db
from models import User, EmailVerification, PhoneVerification
from services.email_service import send_verification_email
from datetime import datetime, timedelta
import random
import string
import secrets
import json
import urllib.parse
from requests_oauthlib import OAuth2Session

auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()


def generate_code():
    length = current_app.config.get("VERIFICATION_CODE_LENGTH", 6)
    return "".join(random.choices(string.digits, k=length))


def create_token_response(user):
    token = create_access_token(
        identity=str(user.id),
        additional_claims={"role": user.role}
    )
    return {"token": token, "user": user.to_dict()}


# ─── DEPRECATED FALLBACK ──────────────────────────────────────
@auth_bp.route("/register", methods=["OPTIONS", "POST"])
def register_deprecated():
    """Catch old single‑step registration requests."""
    if request.method == "OPTIONS":
        return "", 200
    return jsonify({
        "message": "This endpoint is deprecated. Please use /register/start, /register/verify-email, and /register/complete."
    }), 410


# ─── REGISTER START ─────────────────────────────────────────────
@auth_bp.route("/register/start", methods=["POST"])
def register_start():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip()
    full_name = data.get("full_name", "User").strip()

    if not User.validate_email(email):
        return jsonify({"message": "Invalid email format"}), 400
    if not User.validate_phone(phone):
        return jsonify({"message": "Invalid phone format"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "This email is already registered."}), 409
    if User.query.filter_by(phone=phone).first():
        return jsonify({"message": "This phone number is already registered."}), 409

    EmailVerification.query.filter_by(email=email).delete()
    code = generate_code()
    expiry_minutes = current_app.config.get("VERIFICATION_CODE_EXPIRY_MINUTES", 10)
    expires_at = datetime.utcnow() + timedelta(minutes=expiry_minutes)

    record = EmailVerification(email=email, code=code, expires_at=expires_at)
    db.session.add(record)
    db.session.commit()

    try:
        send_verification_email(email, full_name, code)
        current_app.logger.info(f"Verification email sent to {email}")
    except Exception as e:
        current_app.logger.error(f"Email sending failed: {e}")
        print(f"⚠️ Email failed. Code for {email}: {code}")

    return jsonify({
        "message": "Verification code sent to your email",
        "email": email
    }), 200


# ─── VERIFY EMAIL ──────────────────────────────────────────────
@auth_bp.route("/register/verify-email", methods=["POST"])
def verify_email():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    code = data.get("code", "").strip()

    if not email or not code:
        return jsonify({"message": "Email and code are required"}), 400

    record = EmailVerification.query.filter_by(
        email=email,
        code=code,
        used=False
    ).first()

    if not record:
        return jsonify({"message": "Invalid verification code"}), 400
    if record.expires_at < datetime.utcnow():
        return jsonify({"message": "Code expired. Request a new one."}), 400

    record.used = True
    db.session.commit()
    return jsonify({"message": "Email verified successfully"}), 200


# ─── RESEND CODE ──────────────────────────────────────────────
@auth_bp.route("/register/resend-code", methods=["POST"])
def resend_code():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    if not email:
        return jsonify({"message": "Email is required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered. Please login."}), 409

    EmailVerification.query.filter_by(email=email).delete()

    code = generate_code()
    expiry_minutes = current_app.config.get("VERIFICATION_CODE_EXPIRY_MINUTES", 10)
    expires_at = datetime.utcnow() + timedelta(minutes=expiry_minutes)

    record = EmailVerification(email=email, code=code, expires_at=expires_at)
    db.session.add(record)
    db.session.commit()

    try:
        send_verification_email(email, "User", code)
        current_app.logger.info(f"Resent verification email to {email}")
    except Exception as e:
        current_app.logger.error(f"Email resend failed: {e}")
        print(f"⚠️ Email failed. Code for {email}: {code}")

    return jsonify({
        "message": "New verification code sent to your email",
        "email": email
    }), 200


# ─── REGISTER COMPLETE ─────────────────────────────────────────
@auth_bp.route("/register/complete", methods=["POST"])
def register_complete():
    data = request.get_json() or {}
    required = ["username", "email", "phone", "password", "full_name"]
    for field in required:
        if not data.get(field):
            return jsonify({"message": f"{field} is required"}), 400

    username = data["username"].strip()
    email = data["email"].strip().lower()
    phone = data["phone"].strip()
    password = data["password"]
    full_name = data["full_name"].strip()
    role = data.get("role", "volunteer").strip().lower()

    if not User.validate_email(email):
        return jsonify({"message": "Invalid email format"}), 400
    if not User.validate_phone(phone):
        return jsonify({"message": "Invalid phone format"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already taken"}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 409
    if User.query.filter_by(phone=phone).first():
        return jsonify({"message": "Phone already registered"}), 409

    email_verified = EmailVerification.query.filter_by(
        email=email,
        used=True
    ).first()
    if not email_verified:
        return jsonify({"message": "Email must be verified first"}), 400

    user = User(
        username=username,
        email=email,
        phone=phone,
        full_name=full_name,
        role=role,
        location=data.get("location", ""),
        is_active=True,
        email_verified=True,
        phone_verified=True,
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    EmailVerification.query.filter_by(email=email).delete()
    db.session.commit()

    return jsonify({
        "message": "Account created successfully",
        "user": user.to_dict()
    }), 201


# ─── LOGIN ─────────────────────────────────────────────────────
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    identifier = data.get("username") or data.get("email")
    password = data.get("password", "")

    if not identifier or not password:
        return jsonify({"message": "Username/email and password are required"}), 400

    user = User.query.filter(
        (User.username == identifier) | (User.email == identifier.lower())
    ).first()

    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    if not user.is_active:
        return jsonify({"message": "Account is deactivated"}), 403

    user.last_login = datetime.utcnow()
    db.session.commit()

    response = create_token_response(user)
    return jsonify({
        "message": "Login successful",
        **response
    }), 200


# ─── GOOGLE LOGIN ──────────────────────────────────────────────
@auth_bp.route("/google-auth", methods=["GET"])
def google_login():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    client_id = current_app.config.get("GOOGLE_CLIENT_ID")
    redirect_uri = current_app.config.get("GOOGLE_REDIRECT_URI")
    if not client_id:
        return jsonify({"message": "Google OAuth not configured", "missing": "GOOGLE_CLIENT_ID"}), 500
    oauth = OAuth2Session(
        client_id,
        redirect_uri=redirect_uri,
        scope=["openid", "https://www.googleapis.com/auth/userinfo.email",
               "https://www.googleapis.com/auth/userinfo.profile"],
    )
    auth_url, state = oauth.authorization_url(
        "https://accounts.google.com/o/oauth2/auth",
        access_type="offline",
        prompt="select_account",
    )
    session["oauth_state"] = state
    return redirect(auth_url)


@auth_bp.route("/google-callback", methods=["GET"])
def google_callback():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    client_id = current_app.config.get("GOOGLE_CLIENT_ID")
    client_secret = current_app.config.get("GOOGLE_CLIENT_SECRET")
    redirect_uri = current_app.config.get("GOOGLE_REDIRECT_URI")
    frontend_url = current_app.config.get("FRONTEND_URL", "http://localhost:5173")

    if not client_id or not client_secret:
        return jsonify({"message": "Google OAuth not configured"}), 500

    oauth = OAuth2Session(
        client_id,
        redirect_uri=redirect_uri,
        state=session.get("oauth_state")
    )
    try:
        oauth.fetch_token(
            "https://oauth2.googleapis.com/token",
            client_secret=client_secret,
            authorization_response=request.url,
        )
        google_user = oauth.get("https://www.googleapis.com/oauth2/v2/userinfo").json()
    except Exception as e:
        current_app.logger.error(f"Google OAuth error: {e}")
        error = urllib.parse.quote("Google authentication failed")
        return redirect(f"{frontend_url}/login?google_error={error}")

    email = google_user.get("email", "").strip().lower()
    full_name = google_user.get("name", "Google User")
    google_id = google_user.get("id", "")

    if not email:
        error = urllib.parse.quote("Google did not return an email")
        return redirect(f"{frontend_url}/login?google_error={error}")

    user = User.query.filter_by(email=email).first()
    if not user:
        base_username = email.split('@')[0]
        counter = 0
        username = base_username
        while User.query.filter_by(username=username).first():
            counter += 1
            username = f"{base_username}{counter}"
        user = User(
            username=username,
            email=email,
            full_name=full_name,
            phone=f"google-{google_id[:10]}",  # placeholder
            role="volunteer",
            is_active=True,
            email_verified=True,
            phone_verified=True,
        )
        user.set_password(secrets.token_urlsafe(32))
        db.session.add(user)

    user.email_verified = True
    user.phone_verified = True
    user.last_login = datetime.utcnow()
    db.session.commit()

    response = create_token_response(user)
    token = urllib.parse.quote(response["token"])
    user_data = urllib.parse.quote(json.dumps(response["user"]))

    return redirect(
        f"{frontend_url}/auth/google-callback?token={token}&user={user_data}"
    )


# ─── PROFILE ────────────────────────────────────────────────────
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(int(user_id))
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify({"user": user.to_dict()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500