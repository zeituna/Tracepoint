"""Cases API - Full CRUD"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Report
from app.extensions import db
from datetime import datetime

bp = Blueprint("cases", __name__)

@bp.route("/cases", methods=["GET"])
@jwt_required()
def get_cases():
    user_id = int(get_jwt_identity())
    cases = Report.query.filter_by(user_id=user_id).order_by(Report.created_at.desc()).all()
    return jsonify([c.to_dict() for c in cases]), 200

@bp.route("/cases/<int:case_id>", methods=["GET"])
@jwt_required()
def get_case(case_id):
    user_id = int(get_jwt_identity())
    case = Report.query.filter_by(id=case_id, user_id=user_id).first()
    if not case:
        return jsonify({"error": "Case not found"}), 404
    return jsonify(case.to_dict()), 200

@bp.route("/cases", methods=["POST"])
@jwt_required()
def create_case():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    if not data.get("title") or not data.get("description"):
        return jsonify({"error": "Title and description required"}), 400
    case = Report(
        title=data["title"],
        description=data["description"],
        status=data.get("status", "active"),
        priority=data.get("priority", "medium"),
        location=data.get("location"),
        latitude=data.get("latitude"),
        longitude=data.get("longitude"),
        user_id=user_id
    )
    db.session.add(case)
    db.session.commit()
    return jsonify({"message": "Case created", "data": case.to_dict()}), 201

@bp.route("/cases/<int:case_id>", methods=["PUT"])
@jwt_required()
def update_case(case_id):
    user_id = int(get_jwt_identity())
    case = Report.query.filter_by(id=case_id, user_id=user_id).first()
    if not case:
        return jsonify({"error": "Case not found"}), 404
    data = request.get_json()
    if data.get("title"):
        case.title = data["title"]
    if data.get("description"):
        case.description = data["description"]
    if data.get("status"):
        case.status = data["status"]
    if data.get("priority"):
        case.priority = data["priority"]
    if data.get("location"):
        case.location = data["location"]
    if data.get("latitude"):
        case.latitude = data["latitude"]
    if data.get("longitude"):
        case.longitude = data["longitude"]
    case.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify({"message": "Case updated", "data": case.to_dict()}), 200

@bp.route("/cases/<int:case_id>", methods=["DELETE"])
@jwt_required()
def delete_case(case_id):
    user_id = int(get_jwt_identity())
    case = Report.query.filter_by(id=case_id, user_id=user_id).first()
    if not case:
        return jsonify({"error": "Case not found"}), 404
    db.session.delete(case)
    db.session.commit()
    return jsonify({"message": "Case deleted"}), 200

@bp.route("/cases/stats", methods=["GET"])
@jwt_required()
def get_case_stats():
    user_id = int(get_jwt_identity())
    total = Report.query.filter_by(user_id=user_id).count()
    active = Report.query.filter_by(user_id=user_id, status="active").count()
    resolved = Report.query.filter_by(user_id=user_id, status="resolved").count()
    return jsonify({
        "total": total,
        "active": active,
        "resolved": resolved,
        "pending": total - active - resolved
    }), 200
