const API_BASE_URL = 'http://127.0.0.1:5000/api';

const api = {
  async health() {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.json();
  },
  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },
  async queryTraces(token) {
    const res = await fetch(`${API_BASE_URL}/query/traces`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  async listServices(token) {
    const res = await fetch(`${API_BASE_URL}/query/services`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  async ingestTrace(token, traceData) {
    const res = await fetch(`${API_BASE_URL}/ingest/traces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(traceData)
    });
    return res.json();
  }
};

export default api;
