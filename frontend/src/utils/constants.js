/**
 * Application constants
 */

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
}

// Report statuses
export const REPORT_STATUSES = {
  ACTIVE: 'Active',
  PENDING: 'Pending',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
}

// Case statuses
export const CASE_STATUSES = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  CLOSED: 'Closed',
}

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
}

// Alert types
export const ALERT_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
}

// Notification types
export const NOTIFICATION_TYPES = {
  REPORT_CREATED: 'report_created',
  REPORT_UPDATED: 'report_updated',
  CASE_CREATED: 'case_created',
  CASE_UPDATED: 'case_updated',
  MESSAGE_RECEIVED: 'message_received',
  ALERT_TRIGGERED: 'alert_triggered',
}

// API status codes
export const API_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 20, 50, 100],
}

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_TIME: 'MMM DD, YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_TIME: 'YYYY-MM-DDTHH:mm:ss',
  TIME: 'HH:mm',
  SHORT: 'MM/DD/YYYY',
}

// File upload limits
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  MAX_FILES: 10,
}

// Map defaults
export const MAP_CONFIG = {
  DEFAULT_CENTER: [-1.286389, 36.817223], // Nairobi
  DEFAULT_ZOOM: 12,
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}

// App configuration
export const APP_CONFIG = {
  NAME: 'TracePoint',
  VERSION: '1.0.0',
  DESCRIPTION: 'Missing Person Reporting & Tracking System',
}

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  SETTINGS: 'appSettings',
  REGISTERED_USERS: 'registeredUsers',
}

export default {
  USER_ROLES,
  REPORT_STATUSES,
  CASE_STATUSES,
  PRIORITY_LEVELS,
  ALERT_TYPES,
  NOTIFICATION_TYPES,
  API_STATUS,
  PAGINATION,
  DATE_FORMATS,
  FILE_UPLOAD,
  MAP_CONFIG,
  APP_CONFIG,
  STORAGE_KEYS,
}
