"""Health Check API"""

from flask import Blueprint, jsonify
from datetime import datetime

bp = Blueprint("health", __name__)

@bp.route("", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Tracepoint"
    }), 200

@bp.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "pong"}), 200
