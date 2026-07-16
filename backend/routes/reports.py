from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from models import MissingPerson, User

reports_bp = Blueprint('reports', __name__)

@reports_bp.route('/', methods=['GET'])
@jwt_required()
def list_reports():
    reports = MissingPerson.query.all()
    return jsonify([r.to_dict() for r in reports]), 200

@reports_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_report(id):
    report = MissingPerson.query.get_or_404(id)
    return jsonify(report.to_dict()), 200

@reports_bp.route('/', methods=['POST'])
@jwt_required()
def create_report():
    data = request.get_json() or {}
    required = ['full_name', 'last_seen_location', 'last_seen_date']
    for field in required:
        if not data.get(field):
            return jsonify({'message': f'{field} is required'}), 400

    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    report = MissingPerson(
        full_name=data['full_name'],
        age=data.get('age'),
        gender=data.get('gender'),
        county=data.get('county'),
        last_seen_location=data['last_seen_location'],
        last_seen_date=data.get('last_seen_date'),
        description=data.get('description'),
        status=data.get('status', 'missing'),
        reported_by=user_id,
    )
    db.session.add(report)
    db.session.commit()
    return jsonify(report.to_dict()), 201

@reports_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_report(id):
    report = MissingPerson.query.get_or_404(id)
    data = request.get_json() or {}
    for key in ['full_name', 'age', 'gender', 'county', 'last_seen_location',
                'last_seen_date', 'description', 'status']:
        if key in data:
            setattr(report, key, data[key])
    db.session.commit()
    return jsonify(report.to_dict()), 200

@reports_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_report(id):
    report = MissingPerson.query.get_or_404(id)
    db.session.delete(report)
    db.session.commit()
    return jsonify({'message': 'Report deleted'}), 200