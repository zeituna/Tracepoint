from app import create_app
from database import db
from models import User, MissingPerson

app = create_app()
with app.app_context():
    db.create_all()
    print("✅ Database created!")
