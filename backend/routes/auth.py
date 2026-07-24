from flask import Blueprint, request, jsonify
import sqlite3
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
import random
import string
import re

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

def get_db():
    return sqlite3.connect('tracepoint.db')

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def generate_code():
    return ''.join(random.choices(string.digits, k=6))

def validate_email(email):
    return re.match(r"^[^@]+@[^@]+\.[^@]+$", email) is not None

def validate_phone(phone):
    return re.match(r"^\+?[0-9]{10,15}$", phone) is not None

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    identifier = data.get("username") or data.get("email")
    password = data.get("password", "")

    if not identifier or not password:
        return jsonify({"message": "Username/email and password are required"}), 400

    try:
        conn = get_db()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM users WHERE username = ? OR email = ?", (identifier, identifier.lower()))
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({"message": "Invalid credentials"}), 401
        
        if not check_password_hash(user['password_hash'], password):
            return jsonify({"message": "Invalid credentials"}), 401
        
        token = jwt.encode(
            {'user_id': user['id'], 'username': user['username'], 'role': user['role']},
            os.environ.get('JWT_SECRET_KEY', 'dev-secret-key'),
            algorithm='HS256'
        )
        
        return jsonify({
            'access_token': token,
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'full_name': user['full_name'],
                'role': user['role']
            }
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    phone = data.get('phone')
    
    if not username or not email or not password:
        return jsonify({"message": "Username, email and password are required"}), 400
    
    if not validate_email(email):
        return jsonify({"message": "Invalid email format"}), 400
    
    if phone and not validate_phone(phone):
        return jsonify({"message": "Invalid phone format"}), 400
    
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM users WHERE username = ? OR email = ?", (username, email))
        if cursor.fetchone():
            conn.close()
            return jsonify({"message": "User already exists"}), 400
        
        hashed_password = generate_password_hash(password)
        cursor.execute("""
            INSERT INTO users (username, email, password_hash, full_name, phone, role, created_at)
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        """, (username, email, hashed_password, full_name, phone, 'volunteer'))
        
        conn.commit()
        conn.close()
        
        return jsonify({"message": "User created successfully"}), 201
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@auth_bp.route('/register/start', methods=['POST'])
def register_start():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    full_name = data.get('full_name', 'User').strip()
    
    if not validate_email(email):
        return jsonify({"message": "Invalid email format"}), 400
    
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        if cursor.fetchone():
            conn.close()
            return jsonify({"message": "Email already registered"}), 409
        
        cursor.execute("DELETE FROM email_verifications WHERE email = ?", (email,))
        
        code = generate_code()
        expires_at = datetime.utcnow() + timedelta(minutes=10)
        
        cursor.execute("""
            INSERT INTO email_verifications (email, code, expires_at, used)
            VALUES (?, ?, ?, 0)
        """, (email, code, expires_at.isoformat()))
        
        conn.commit()
        conn.close()
        
        print(f"📧 Verification code for {email}: {code}")
        
        return jsonify({
            "message": "Verification code sent to your email",
            "email": email,
            "code": code
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@auth_bp.route('/register/verify-email', methods=['POST'])
def verify_email():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    code = data.get('code', '').strip()
    
    if not email or not code:
        return jsonify({"message": "Email and code are required"}), 400
    
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM email_verifications 
            WHERE email = ? AND code = ? AND used = 0
        """, (email, code))
        
        record = cursor.fetchone()
        
        if not record:
            conn.close()
            return jsonify({"message": "Invalid verification code"}), 400
        
        expires_at = datetime.fromisoformat(record[3])
        if expires_at < datetime.utcnow():
            conn.close()
            return jsonify({"message": "Code expired. Request a new one."}), 400
        
        cursor.execute("UPDATE email_verifications SET used = 1 WHERE email = ? AND code = ?", (email, code))
        conn.commit()
        conn.close()
        
        return jsonify({"message": "Email verified successfully"}), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@auth_bp.route('/register/resend-code', methods=['POST'])
def resend_code():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    
    if not email:
        return jsonify({"message": "Email is required"}), 400
    
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        if cursor.fetchone():
            conn.close()
            return jsonify({"message": "Email already registered. Please login."}), 409
        
        cursor.execute("DELETE FROM email_verifications WHERE email = ?", (email,))
        
        code = generate_code()
        expires_at = datetime.utcnow() + timedelta(minutes=10)
        
        cursor.execute("""
            INSERT INTO email_verifications (email, code, expires_at, used)
            VALUES (?, ?, ?, 0)
        """, (email, code, expires_at.isoformat()))
        
        conn.commit()
        conn.close()
        
        print(f"📧 New verification code for {email}: {code}")
        
        return jsonify({
            "message": "New verification code sent to your email",
            "email": email,
            "code": code
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@auth_bp.route('/register/complete', methods=['POST'])
def register_complete():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    phone = data.get('phone')
    role = data.get('role', 'volunteer')
    
    required = ['username', 'email', 'phone', 'password', 'full_name']
    for field in required:
        if not data.get(field):
            return jsonify({"message": f"{field} is required"}), 400
    
    if not validate_email(email):
        return jsonify({"message": "Invalid email format"}), 400
    
    if phone and not validate_phone(phone):
        return jsonify({"message": "Invalid phone format"}), 400
    
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM users WHERE username = ? OR email = ? OR phone = ?", (username, email, phone))
        if cursor.fetchone():
            conn.close()
            return jsonify({"message": "Username, email or phone already registered"}), 409
        
        cursor.execute("SELECT * FROM email_verifications WHERE email = ? AND used = 1", (email,))
        if not cursor.fetchone():
            conn.close()
            return jsonify({"message": "Email must be verified first"}), 400
        
        hashed_password = generate_password_hash(password)
        cursor.execute("""
            INSERT INTO users (username, email, password_hash, full_name, phone, role, created_at)
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        """, (username, email, hashed_password, full_name, phone, role))
        
        conn.commit()
        
        cursor.execute("DELETE FROM email_verifications WHERE email = ?", (email,))
        conn.commit()
        conn.close()
        
        return jsonify({"message": "Account created successfully"}), 201
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    return jsonify({"message": "Profile endpoint"}), 200