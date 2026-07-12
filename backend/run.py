#!/usr/bin/env python3
"""
Application Entry Point
"""

import os
from app import create_app

# Create app with default config
app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
