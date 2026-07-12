"""
Trace Model - Core entity for distributed tracing
"""

from datetime import datetime
from app.extensions import db
import uuid

class Trace(db.Model):
    __tablename__ = "traces"
    
    # Primary key
    trace_id = db.Column(db.String(36), primary_key=True)
    
    # Metadata
    service_name = db.Column(db.String(100), nullable=False, index=True)
    operation_name = db.Column(db.String(200), nullable=False)
    
    # Timing
    start_time = db.Column(db.DateTime, nullable=False, index=True)
    end_time = db.Column(db.DateTime, nullable=False)
    duration_us = db.Column(db.BigInteger, nullable=False)  # Microseconds
    
    # Status
    status_code = db.Column(db.String(20), default="ok")  # ok, error, timeout
    status_message = db.Column(db.Text)
    
    # Tags/Attributes (JSON)
    tags = db.Column(db.JSON, default={})
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    spans = db.relationship("Span", backref="trace", lazy="dynamic", cascade="all, delete-orphan")
    
    def __init__(self, service_name, operation_name, start_time, end_time, tags=None):
        self.trace_id = str(uuid.uuid4())
        self.service_name = service_name
        self.operation_name = operation_name
        self.start_time = start_time
        self.end_time = end_time
        self.duration_us = int((end_time - start_time).total_seconds() * 1000000)
        self.tags = tags or {}
    
    def to_dict(self):
        return {
            "trace_id": self.trace_id,
            "service_name": self.service_name,
            "operation_name": self.operation_name,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat(),
            "duration_us": self.duration_us,
            "duration_ms": round(self.duration_us / 1000, 2),
            "status_code": self.status_code,
            "status_message": self.status_message,
            "tags": self.tags,
            "span_count": self.spans.count()
        }
    
    def __repr__(self):
        return f"<Trace {self.trace_id} - {self.service_name}>"
