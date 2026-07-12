#!/usr/bin/env python3
"""Database Initialization for Tracepoint"""

from app import create_app
from app.extensions import db
from app.models import User, Trace, Span, Service

def init_database():
    app = create_app()
    with app.app_context():
        db.create_all()
        print("✅ Database tables created!")
        
        # Create admin user
        if not User.query.filter_by(email="admin@tracepoint.com").first():
            admin = User(
                email="admin@tracepoint.com",
                username="admin",
                password="admin123",
                full_name="Tracepoint Admin"
            )
            admin.is_verified = True
            admin.role = "admin"
            db.session.add(admin)
            db.session.commit()
            print("✅ Admin user created: admin@tracepoint.com / admin123")
        
        # Create sample service
        if not Service.query.filter_by(service_name="sample-service").first():
            service = Service(
                service_name="sample-service",
                description="Sample microservice for testing",
                version="1.0.0",
                environment="development"
            )
            db.session.add(service)
            db.session.commit()
            print("✅ Sample service created!")
        
        print("\n🎉 Database initialization complete!")

if __name__ == "__main__":
    init_database()
