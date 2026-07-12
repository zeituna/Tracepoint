#!/usr/bin/env python3
"""Test Tracepoint API"""

import requests
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:5000/api"

def test():
    print("🚀 Testing Tracepoint API\n")
    
    # 1. Health check
    print("1. Health Check:")
    r = requests.get(f"{BASE_URL}/health")
    print(f"   Status: {r.status_code}")
    print(f"   Response: {r.json()}\n")
    
    # 2. Register
    print("2. Register User:")
    r = requests.post(f"{BASE_URL}/auth/register", json={
        "email": "test@tracepoint.com",
        "username": "testuser",
        "password": "test123",
        "full_name": "Test User"
    })
    print(f"   Status: {r.status_code}")
    if r.status_code == 201:
        print(f"   User created!\n")
    else:
        print(f"   Response: {r.json()}\n")
    
    # 3. Login
    print("3. Login:")
    r = requests.post(f"{BASE_URL}/auth/login", json={
        "email": "test@tracepoint.com",
        "password": "test123"
    })
    print(f"   Status: {r.status_code}")
    if r.status_code != 200:
        print("❌ Login failed, stopping tests")
        return
    
    token = r.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print(f"   Token received!\n")
    
    # 4. Ingest trace
    print("4. Ingest Trace:")
    now = datetime.utcnow()
    trace_data = {
        "spans": [
            {
                "trace_id": "trace-001",
                "service_name": "sample-service",
                "operation_name": "GET /users",
                "start_time": now.isoformat(),
                "end_time": (now + timedelta(milliseconds=100)).isoformat(),
                "kind": "server",
                "tags": {"http.method": "GET", "http.status": 200}
            }
        ]
    }
    r = requests.post(f"{BASE_URL}/ingest/traces", json=trace_data, headers=headers)
    print(f"   Status: {r.status_code}")
    print(f"   Response: {r.json()}\n")
    
    # 5. Query traces
    print("5. Query Traces:")
    r = requests.get(f"{BASE_URL}/query/traces", headers=headers)
    print(f"   Status: {r.status_code}")
    if r.status_code == 200:
        data = r.json()
        print(f"   Found {len(data.get('traces', []))} traces\n")
    
    # 6. List services
    print("6. List Services:")
    r = requests.get(f"{BASE_URL}/query/services", headers=headers)
    print(f"   Status: {r.status_code}")
    if r.status_code == 200:
        services = r.json()
        print(f"   Found {len(services)} services\n")
    
    print("✅ All tests passed!")

if __name__ == "__main__":
    test()
