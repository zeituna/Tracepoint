"""Trace Query API"""

from flask import Blueprint, request, jsonify
from app.models.trace import Trace
from app.models.span import Span
from app.models.service import Service
from app.extensions import db

bp = Blueprint("query", __name__)

@bp.route("/traces", methods=["GET"])
def list_traces():
    service = request.args.get("service")
    limit = min(int(request.args.get("limit", 20)), 100)
    offset = int(request.args.get("offset", 0))
    
    query = Trace.query
    if service:
        query = query.filter_by(service_name=service)
    
    traces = query.order_by(Trace.start_time.desc()).limit(limit).offset(offset).all()
    total = query.count()
    
    return jsonify({
        "traces": [t.to_dict() for t in traces],
        "pagination": {
            "total": total,
            "limit": limit,
            "offset": offset
        }
    }), 200

@bp.route("/traces/<trace_id>", methods=["GET"])
def get_trace(trace_id):
    trace = Trace.query.get(trace_id)
    if not trace:
        return jsonify({"error": "Trace not found"}), 404
    
    spans = Span.query.filter_by(trace_id=trace_id).order_by(Span.start_time).all()
    result = trace.to_dict()
    result["spans"] = [s.to_dict() for s in spans]
    return jsonify(result), 200

@bp.route("/services", methods=["GET"])
def list_services():
    services = Service.query.order_by(Service.service_name).all()
    return jsonify([s.to_dict() for s in services]), 200
