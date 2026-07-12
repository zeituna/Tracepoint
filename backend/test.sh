#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc4MzY4NTY2MSwianRpIjoiY2NmYTJlNjItYWU0Ni00NjBiLWIzZTctZDE1YzM0ZDFkNWUyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NCwibmJmIjoxNzgzNjg1NjYxLCJjc3JmIjoiNDI5YTE4YmQtZWVkZS00NGQ0LWIzNGEtYTBlM2JkN2U4MTE3IiwiZXhwIjoxNzgzNjg5MjYxfQ.Tq9j1-xLU0IVYT7mQzp2kJfW8aZPC93UXIKyx2mmOY8"

echo "🔐 Token: ${TOKEN:0:30}..."
echo ""

echo "📋 Testing /api/users..."
curl -s -X GET http://localhost:5000/api/users -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo ""
echo "📋 Testing /api/cases..."
curl -s -X GET http://localhost:5000/api/cases -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

echo ""
echo "📋 Creating a case..."
curl -s -X POST http://localhost:5000/api/cases \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Test API Case","description":"Created via API","status":"active"}' \
  | python3 -m json.tool

echo ""
echo "💬 Testing /api/messages..."
curl -s -X GET http://localhost:5000/api/messages -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
