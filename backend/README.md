# Tracepoint - Distributed Tracing System

A production-ready distributed tracing system for monitoring microservices.

## Features

- 🔍 **Distributed Tracing**: Track requests across microservices
- 📊 **Service Discovery**: Auto-register and monitor services
- 🔐 **JWT Authentication**: Secure API access
- ⚡ **High Performance**: Optimized for high-volume trace data
- 🏥 **Health Monitoring**: Built-in health checks
- 🎯 **OpenTelemetry Compatible**: Follows industry standards

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Initialize database
python init_db.py

# Run the application
python run.py

# Test the API
python test_tracepoint.py
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/refresh` - Refresh access token

### Trace Ingestion
- `POST /api/ingest/traces` - Ingest trace data

### Trace Query
- `GET /api/query/traces` - List traces
- `GET /api/query/traces/{trace_id}` - Get specific trace
- `GET /api/query/services` - List all services

### Health Checks
- `GET /api/health` - System health check
- `GET /api/health/ping` - Simple ping

## Architecture

Tracepoint uses a clean architecture pattern:
- **Models**: Database models (Trace, Span, Service, User)
- **Repositories**: Data access layer
- **Services**: Business logic
- **API**: Route handlers
- **Tasks**: Async processing with Celery

## Tech Stack

- Flask + SQLAlchemy
- JWT Authentication
- Celery + Redis for async tasks
- SQLite/PostgreSQL support

## Competition Demo

To demonstrate Tracepoint in a competition:

1. Run the server: `python run.py`
2. Register a user: `POST /api/auth/register`
3. Login: `POST /api/auth/login`
4. Ingest traces: `POST /api/ingest/traces`
5. Query traces: `GET /api/query/traces`

For a complete demo, run: `python test_tracepoint.py`
