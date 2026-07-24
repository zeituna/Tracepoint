from database import db
from datetime import datetime


class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    type = db.Column(db.String(50))          # ngo, police, hospital, government, other
    contact_email = db.Column(db.String(120))
    contact_phone = db.Column(db.String(20))
    location = db.Column(db.String(150))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'location': self.location,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
