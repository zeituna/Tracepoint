// Centralised endpoint map consumed by src/services/*.js.
// NOTE: only AUTH.* and REPORTS.* currently exist on the Flask backend
// (see backend/routes/auth.py and backend/routes/reports.py). The other
// sections are wired up on the frontend for when those backend routes
// are added; calling them today will 404 until they're implemented.
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register/complete',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/register/verify-email',
    ME: '/auth/profile',
  },
  REPORTS: {
    BASE: '/reports',
    DETAIL: (id) => `/reports/${id}`,
    SEARCH: '/reports/search',
    STATUS: (id) => `/reports/${id}/status`,
    COMMENT: (id) => `/reports/${id}/comments`,
  },
  USERS: {
    BASE: '/users',
    DETAIL: (id) => `/users/${id}`,
    PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },
  CASES: {
    BASE: '/cases',
    DETAIL: (id) => `/cases/${id}`,
    STATUS: (id) => `/cases/${id}/status`,
    TIMELINE: (id) => `/cases/${id}/timeline`,
  },
  ALERTS: {
    BASE: '/alerts',
    DETAIL: (id) => `/alerts/${id}`,
    READ: (id) => `/alerts/${id}/read`,
    READ_ALL: '/alerts/read-all',
  },
  ORGANIZATIONS: {
    BASE: '/organizations',
    DETAIL: (id) => `/organizations/${id}`,
    MEMBERS: (id) => `/organizations/${id}/members`,
  },
  FACIAL: {
    UPLOAD: '/facial/upload',
    MATCH: '/facial/match',
    GALLERY: '/facial/gallery',
    DELETE: (id) => `/facial/${id}`,
  },
  STATISTICS: {
    DASHBOARD: '/statistics/dashboard',
    REPORTS: '/statistics/reports',
    USERS: '/statistics/users',
    CASES: '/statistics/cases',
  },
  TRACKING: {
    BASE: '/tracking',
    LOCATION: (id) => `/tracking/${id}/location`,
    HISTORY: (id) => `/tracking/${id}/history`,
  },
}
