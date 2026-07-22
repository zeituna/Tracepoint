
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from flask_socketio import SocketIO, emit, join_room, leave_room
from config import Config
from database import db

# ─── Import Routes ──────────────────────────────────────────────
from routes.auth import auth_bp
from routes.reports import reports_bp
from routes.chat import chat_bp

# ─── Import Models ──────────────────────────────────────────────
from models.user import User

# ─── Import Email Service ──────────────────────────────────────
from services.email_service import mail

app = Flask(__name__)
app.config.from_object(Config)

# ─── Initialize Mail ────────────────────────────────────────────
mail.init_app(app)

# ─── Initialize Extensions ──────────────────────────────────────
CORS(app, supports_credentials=True)
jwt = JWTManager(app)
migrate = Migrate(app, db)
db.init_app(app)

# ─── Initialize SocketIO ──────────────────────────────────────
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

# ─── SocketIO Event Handlers ──────────────────────────────────
@socketio.on('connect')
def handle_connect():
    print(f'Client connected: {request.sid}')

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client disconnected: {request.sid}')

@socketio.on('user_online')
def handle_user_online(data):
    user_id = data.get('userId')
    print(f'User {user_id} is online')
    emit('users_online', [user_id], broadcast=True)

@socketio.on('join_conversation')
def handle_join_conversation(data):
    conversation_id = data.get('conversationId')
    join_room(f'conversation_{conversation_id}')
    print(f'Client joined conversation: {conversation_id}')

@socketio.on('send_message')
def handle_send_message(data):
    try:
        conversation_id = data.get('conversationId')
        message = data.get('message')
        sender_id = data.get('senderId')
        sender_type = data.get('senderType', 'user')
        sender_name = data.get('senderName', 'User')
        
        import sqlite3
        conn = sqlite3.connect('instance/tracepoint.db')
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO messages (conversation_id, message, sender_id, sender_type, sender_name, created_at, status)
            VALUES (?, ?, ?, ?, ?, datetime('now'), 'sent')
        """, (conversation_id, message, sender_id, sender_type, sender_name))
        
        message_id = cursor.lastrowid
        
        cursor.execute("""
            UPDATE conversations 
            SET last_message = ?, last_message_at = datetime('now'), unread_count = unread_count + 1
            WHERE id = ?
        """, (message, conversation_id))
        
        conn.commit()
        
        cursor.execute("SELECT * FROM messages WHERE id = ?", (message_id,))
        msg = cursor.fetchone()
        conn.close()
        
        emit('new_message', {
            'id': msg[0],
            'conversationId': conversation_id,
            'message': msg[2],
            'senderId': msg[3],
            'senderType': msg[4],
            'senderName': msg[5],
            'created_at': msg[9],
            'status': 'sent'
        }, room=f'conversation_{conversation_id}')
        
    except Exception as e:
        print(f'Error sending message: {e}')
        emit('message_error', {'error': str(e)})

@socketio.on('mark_read')
def handle_mark_read(data):
    conversation_id = data.get('conversationId')
    user_id = data.get('userId')
    
    try:
        import sqlite3
        conn = sqlite3.connect('instance/tracepoint.db')
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE messages 
            SET read = 1 
            WHERE conversation_id = ? AND sender_id != ?
        """, (conversation_id, user_id))
        cursor.execute("UPDATE conversations SET unread_count = 0 WHERE id = ?", (conversation_id,))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f'Error marking read: {e}')

@socketio.on('typing')
def handle_typing(data):
    conversation_id = data.get('conversationId')
    user_id = data.get('userId')
    is_typing = data.get('isTyping', False)
    emit('user_typing', {'userId': user_id, 'isTyping': is_typing}, room=f'conversation_{conversation_id}')

# ─── Root Route ──────────────────────────────────────────────────
@app.route('/')
def index():
    return jsonify({
        'message': 'TracePoint API',
        'version': '1.0.0',
        'status': 'running'
    })

# ─── Health Check ──────────────────────────────────────────────
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'database': 'connected' if db.engine else 'disconnected'
    })

# ─── Register Blueprints ──────────────────────────────────────
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(reports_bp, url_prefix='/api/reports')
app.register_blueprint(chat_bp)

# ─── Error Handlers ────────────────────────────────────────────
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ─── Create Tables ─────────────────────────────────────────────
with app.app_context():
    db.create_all()
    print('✅ Database tables created/verified')

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
EOF