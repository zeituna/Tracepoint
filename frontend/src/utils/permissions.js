/**
 * Permission utility functions
 */

// Permission definitions
export const PERMISSIONS = {
  VIEW_REPORTS: 'view_reports',
  CREATE_REPORT: 'create_report',
  EDIT_REPORT: 'edit_report',
  DELETE_REPORT: 'delete_report',
  VIEW_CASES: 'view_cases',
  CREATE_CASE: 'create_case',
  EDIT_CASE: 'edit_case',
  DELETE_CASE: 'delete_case',
  VIEW_USERS: 'view_users',
  CREATE_USER: 'create_user',
  EDIT_USER: 'edit_user',
  DELETE_USER: 'delete_user',
  VIEW_ORGANIZATIONS: 'view_organizations',
  CREATE_ORGANIZATION: 'create_organization',
  EDIT_ORGANIZATION: 'edit_organization',
  DELETE_ORGANIZATION: 'delete_organization',
  VIEW_ALERTS: 'view_alerts',
  CREATE_ALERT: 'create_alert',
  EDIT_ALERT: 'edit_alert',
  DELETE_ALERT: 'delete_alert',
}

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  admin: Object.values(PERMISSIONS),
  moderator: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.CREATE_REPORT,
    PERMISSIONS.EDIT_REPORT,
    PERMISSIONS.VIEW_CASES,
    PERMISSIONS.CREATE_CASE,
    PERMISSIONS.EDIT_CASE,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_ORGANIZATIONS,
    PERMISSIONS.VIEW_ALERTS,
    PERMISSIONS.CREATE_ALERT,
  ],
  user: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.CREATE_REPORT,
    PERMISSIONS.VIEW_CASES,
    PERMISSIONS.VIEW_ALERTS,
  ],
}

// Check if user has permission
export const hasPermission = (userRole, permission) => {
  if (!userRole) return false
  const permissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.includes(permission)
}

// Check if user has any of the given permissions
export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole) return false
  const userPermissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.some(permission => userPermissions.includes(permission))
}

// Check if user has all of the given permissions
export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole) return false
  const userPermissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.every(permission => userPermissions.includes(permission))
}

// Get user permissions
export const getUserPermissions = (userRole) => {
  return ROLE_PERMISSIONS[userRole] || []
}

// Check if user is admin
export const isAdmin = (userRole) => {
  return userRole === 'admin'
}

// Check if user is moderator
export const isModerator = (userRole) => {
  return userRole === 'moderator' || userRole === 'admin'
}

// Check if user is user
export const isUser = (userRole) => {
  return userRole === 'user' || !userRole
}

// Check if user can access admin panel
export const canAccessAdmin = (userRole) => {
  return userRole === 'admin' || userRole === 'moderator'
}

export default {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getUserPermissions,
  isAdmin,
  isModerator,
  isUser,
  canAccessAdmin,
}
