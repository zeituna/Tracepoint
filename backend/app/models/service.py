"""Service Model - Registered services in Tracepoint"""

from datetime import datetime
from app.extensions import db

class Service(db.Model):
    __tablename__ = "services"
    
    id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String(100), unique=True, nullable=False, index=True)
    description = db.Column(db.String(500))
    
    version = db.Column(db.String(20))
    environment = db.Column(db.String(20), default="production")
    
    tags = db.Column(db.JSON, default={})
    
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "service_name": self.service_name,
            "description": self.description,
            "version": self.version,
            "environment": self.environment,
            "tags": self.tags,
            "last_seen": self.last_seen.isoformat(),
            "created_at": self.created_at.isoformat()
        }
    
    def __repr__(self):
        return f"<Service {self.service_name}>"
