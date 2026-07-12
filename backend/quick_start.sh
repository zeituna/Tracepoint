#!/bin/bash
echo "🚀 Starting Tracepoint Setup..."

# Create venv if not exists
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install
pip install Flask Flask-SQLAlchemy Flask-Migrate Flask-Bcrypt Flask-JWT-Extended Flask-CORS Flask-Mail celery redis psutil python-dotenv

# Init DB
python3 init_db.py

echo ""
echo "✅ Setup complete! Run: python3 run.py"
