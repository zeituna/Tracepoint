const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Generic request function
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.msg || 'API Error');
    }
    return response.json();
  },
  
  // CRUD Operations
  get: (endpoint) => api.request(endpoint),
  post: (endpoint, data) => api.request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => api.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => api.request(endpoint, { method: 'DELETE' }),
};
