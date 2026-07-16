cat > models/missing_person.py << 'EOF'
from database import db
from datetime import datetime

class MissingPerson(db.Model):
    __tablename__ = 'missing_persons'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    county = db.Column(db.String(80))
    last_seen_location = db.Column(db.String(200))
    last_seen_date = db.Column(db.DateTime)
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='missing')
    reported_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    reported_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'age': self.age,
            'gender': self.gender,
            'county': self.county,
            'last_seen_location': self.last_seen_location,
            'last_seen_date': self.last_seen_date.isoformat() if self.last_seen_date else None,
            'description': self.description,
            'status': self.status,
            'reported_by': self.reported_by,
            'reported_at': self.reported_at.isoformat() if self.reported_at else None
        }
EOF