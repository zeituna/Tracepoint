"""Messages API - Full CRUD"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Message, User
from app.extensions import db
from datetime import datetime

bp = Blueprint("messages", __name__)

@bp.route("/messages", methods=["GET"])
@jwt_required()
def get_messages():
    user_id = int(get_jwt_identity())
    messages = Message.query.filter(
        (Message.sender_id == user_id) | (Message.recipient_id == user_id)
    ).order_by(Message.created_at.desc()).all()
    return jsonify([m.to_dict() for m in messages]), 200

@bp.route("/messages", methods=["POST"])
@jwt_required()
def send_message():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    if not data or not data.get("recipient_id") or not data.get("content"):
        return jsonify({"error": "Missing recipient or content"}), 400
    recipient = User.query.get(data["recipient_id"])
    if not recipient:
        return jsonify({"error": "Recipient not found"}), 404
    message = Message(
        sender_id=user_id,
        recipient_id=data["recipient_id"],
        content=data["content"]
    )
    db.session.add(message)
    db.session.commit()
    return jsonify({"message": "Message sent", "data": message.to_dict()}), 201

@bp.route("/messages/<int:message_id>/read", methods=["PUT"])
@jwt_required()
def mark_as_read(message_id):
    user_id = int(get_jwt_identity())
    message = Message.query.get(message_id)
    if not message:
        return jsonify({"error": "Message not found"}), 404
    if message.recipient_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    message.is_read = True
    db.session.commit()
    return jsonify({"message": "Message marked as read"}), 200

@bp.route("/messages/unread/count", methods=["GET"])
@jwt_required()
def unread_count():
    user_id = int(get_jwt_identity())
    count = Message.query.filter_by(recipient_id=user_id, is_read=False).count()
    return jsonify({"unread_count": count}), 200

@bp.route("/messages/conversations", methods=["GET"])
@jwt_required()
def get_conversations():
    user_id = int(get_jwt_identity())
    messages = Message.query.filter(
        (Message.sender_id == user_id) | (Message.recipient_id == user_id)
    ).all()
    user_ids = set()
    for m in messages:
        if m.sender_id != user_id:
            user_ids.add(m.sender_id)
        if m.recipient_id != user_id:
            user_ids.add(m.recipient_id)
    users = User.query.filter(User.id.in_(user_ids)).all()
    return jsonify([{"id": u.id, "username": u.username, "email": u.email} for u in users]), 200

@bp.route("/messages/<int:message_id>", methods=["DELETE"])
@jwt_required()
def delete_message(message_id):
    user_id = int(get_jwt_identity())
    message = Message.query.get(message_id)
    if not message:
        return jsonify({"error": "Message not found"}), 404
    
    if message.sender_id != user_id and message.recipient_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message deleted successfully"}), 200
