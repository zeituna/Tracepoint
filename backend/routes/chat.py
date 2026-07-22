from flask import Blueprint, request, jsonify
import sqlite3

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')

def get_db():
    return sqlite3.connect('instance/tracepoint.db')

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@chat_bp.route('/users', methods=['GET'])
def get_users():
    try:
        conn = get_db()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute("SELECT id, full_name, email, phone, role, online FROM users WHERE role != 'admin' ORDER BY full_name")
        users = cursor.fetchall()
        conn.close()
        return jsonify(users)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/conversations/<int:user_id>', methods=['GET'])
def get_conversations(user_id):
    try:
        conn = get_db()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute("""
            SELECT c.*, u.full_name as user_name, u.online as user_online
            FROM conversations c
            LEFT JOIN users u ON c.user_id = u.id
            WHERE c.user_id = ? OR c.admin_id = ?
            ORDER BY c.last_message_at DESC
        """, (user_id, user_id))
        conversations = cursor.fetchall()
        conn.close()
        return jsonify(conversations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/messages/<int:conversation_id>', methods=['GET'])
def get_messages(conversation_id):
    try:
        conn = get_db()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC", (conversation_id,))
        messages = cursor.fetchall()
        conn.close()
        return jsonify(messages)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/conversations', methods=['POST'])
def create_conversation():
    try:
        data = request.json
        subject = data.get('subject')
        target_user_id = data.get('targetUserId', data.get('userId'))
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT full_name FROM users WHERE id = ?", (target_user_id,))
        user = cursor.fetchone()
        user_name = user[0] if user else 'User'
        cursor.execute("INSERT INTO conversations (user_id, admin_id, subject, user_name, user_type, created_at) VALUES (?, 1, ?, ?, 'user', datetime('now'))", (target_user_id, subject, user_name))
        conversation_id = cursor.lastrowid
        conn.commit()
        cursor.execute("SELECT * FROM conversations WHERE id = ?", (conversation_id,))
        conv = cursor.fetchone()
        conn.close()
        return jsonify({'id': conv[0], 'user_id': conv[1], 'admin_id': conv[2], 'subject': conv[3], 'last_message': conv[4], 'last_message_at': conv[5], 'unread_count': conv[6], 'user_name': conv[7], 'user_type': conv[8], 'created_at': conv[9]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/messages/read', methods=['PUT'])
def mark_read():
    try:
        data = request.json
        conversation_id = data.get('conversationId')
        user_id = data.get('userId')
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("UPDATE messages SET read = 1 WHERE conversation_id = ? AND sender_id != ?", (conversation_id, user_id))
        cursor.execute("UPDATE conversations SET unread_count = 0 WHERE id = ?", (conversation_id,))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
