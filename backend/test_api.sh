#!/bin/bash

echo "🔐 Getting token..."
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"leila@gmail.com","password":"password123"}' \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

echo "✅ Token: ${TOKEN:0:50}..."
echo ""

echo "📋 Testing /api/users..."
curl -s -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool 2>/dev/null || echo "❌ API not found"

echo ""
echo "📋 Testing /api/cases..."
curl -s -X GET http://localhost:5000/api/cases \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool 2>/dev/null || echo "❌ API not found"

echo ""
echo "📋 Creating a case..."
curl -s -X POST http://localhost:5000/api/cases \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Test Case","description":"Testing","status":"active"}' \
  | python3 -m json.tool 2>/dev/null || echo "❌ Create failed"

echo ""
echo "💬 Testing /api/messages..."
curl -s -X GET http://localhost:5000/api/messages \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool 2>/dev/null || echo "❌ API not found"
