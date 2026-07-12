"""Trace Ingestion API"""

from flask import Blueprint, request, jsonify
from datetime import datetime
from app.extensions import db
from app.models.trace import Trace
from app.models.span import Span
from app.models.service import Service

bp = Blueprint("ingest", __name__)

@bp.route("/traces", methods=["POST"])
def ingest_traces():
    data = request.get_json()
    if not data or "spans" not in data:
        return jsonify({"error": "Invalid trace data"}), 400
    
    traces_saved = 0
    spans_saved = 0
    
    for span_data in data.get("spans", []):
        trace_id = span_data.get("trace_id")
        service_name = span_data.get("service_name")
        
        # Update or create service
        if service_name:
            service = Service.query.filter_by(service_name=service_name).first()
            if not service:
                service = Service(service_name=service_name)
                db.session.add(service)
            service.last_seen = datetime.utcnow()
        
        # Check if trace exists
        trace = Trace.query.get(trace_id)
        if not trace:
            trace = Trace(
                service_name=service_name,
                operation_name=span_data.get("operation_name", "unknown"),
                start_time=datetime.fromisoformat(span_data["start_time"]),
                end_time=datetime.fromisoformat(span_data["end_time"])
            )
            db.session.add(trace)
            traces_saved += 1
        
        # Create span
        span = Span(
            trace_id=trace.trace_id,
            service_name=span_data.get("service_name"),
            operation_name=span_data.get("operation_name"),
            start_time=datetime.fromisoformat(span_data["start_time"]),
            end_time=datetime.fromisoformat(span_data["end_time"]),
            parent_span_id=span_data.get("parent_span_id"),
            kind=span_data.get("kind", "internal"),
            tags=span_data.get("tags", {})
        )
        db.session.add(span)
        spans_saved += 1
    
    db.session.commit()
    return jsonify({
        "message": "Traces ingested successfully",
        "traces_saved": traces_saved,
        "spans_saved": spans_saved
    }), 202
