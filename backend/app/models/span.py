"""Span Model - Individual operation within a trace"""

from datetime import datetime
from app.extensions import db
import uuid

class Span(db.Model):
    __tablename__ = "spans"
    
    span_id = db.Column(db.String(36), primary_key=True)
    trace_id = db.Column(db.String(36), db.ForeignKey("traces.trace_id"), nullable=False)
    parent_span_id = db.Column(db.String(36), nullable=True)
    
    service_name = db.Column(db.String(100), nullable=False, index=True)
    operation_name = db.Column(db.String(200), nullable=False)
    
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    duration_us = db.Column(db.BigInteger, nullable=False)
    
    kind = db.Column(db.String(20), default="internal")
    status_code = db.Column(db.String(20), default="ok")
    status_message = db.Column(db.Text)
    
    tags = db.Column(db.JSON, default={})
    logs = db.Column(db.JSON, default=[])
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __init__(self, trace_id, service_name, operation_name, start_time, end_time, 
                 parent_span_id=None, kind="internal", tags=None):
        self.span_id = str(uuid.uuid4())
        self.trace_id = trace_id
        self.parent_span_id = parent_span_id
        self.service_name = service_name
        self.operation_name = operation_name
        self.start_time = start_time
        self.end_time = end_time
        self.duration_us = int((end_time - start_time).total_seconds() * 1000000)
        self.kind = kind
        self.tags = tags or {}
    
    def to_dict(self):
        return {
            "span_id": self.span_id,
            "trace_id": self.trace_id,
            "parent_span_id": self.parent_span_id,
            "service_name": self.service_name,
            "operation_name": self.operation_name,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat(),
            "duration_us": self.duration_us,
            "duration_ms": round(self.duration_us / 1000, 2),
            "kind": self.kind,
            "status_code": self.status_code,
            "status_message": self.status_message,
            "tags": self.tags,
            "logs": self.logs
        }
    
    def __repr__(self):
        return f"<Span {self.span_id} - {self.operation_name}>"
