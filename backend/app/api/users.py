"""Users API - Full CRUD"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User
from app.extensions import db

bp = Blueprint("users", __name__)

@bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

@bp.route("/users/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200

@bp.route("/users", methods=["POST"])
@jwt_required()
def create_user():
    data = request.get_json()
    if not data.get("email") or not data.get("username") or not data.get("password"):
        return jsonify({"error": "Missing required fields"}), 400
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 409
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "Username already taken"}), 409
    user = User(
        email=data["email"],
        username=data["username"],
        password=data["password"],
        full_name=data.get("full_name"),
        role=data.get("role", "user"),
        is_active=data.get("is_active", True)
    )
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created", "user": user.to_dict()}), 201

@bp.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.get_json()
    if data.get("email"):
        user.email = data["email"]
    if data.get("username"):
        user.username = data["username"]
    if data.get("full_name"):
        user.full_name = data["full_name"]
    if data.get("role"):
        user.role = data["role"]
    if data.get("is_active") is not None:
        user.is_active = data["is_active"]
    if data.get("password"):
        user.set_password(data["password"])
    db.session.commit()
    return jsonify({"message": "User updated", "user": user.to_dict()}), 200

@bp.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    current_user_id = int(get_jwt_identity())
    if current_user_id == user_id:
        return jsonify({"error": "Cannot delete yourself"}), 400
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

@bp.route("/users/stats", methods=["GET"])
@jwt_required()
def get_user_stats():
    total = User.query.count()
    active = User.query.filter_by(is_active=True).count()
    return jsonify({"total": total, "active": active, "inactive": total - active}), 200
