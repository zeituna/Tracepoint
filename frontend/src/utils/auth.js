/**
 * Authentication utility functions
 * Independent of API calls - pure helper functions
 */

// Decode JWT token
export const decodeToken = (token) => {
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

// Check if JWT token is expired
export const isTokenExpired = (token) => {
  if (!token) return true
  try {
    const payload = decodeToken(token)
    if (!payload) return true
    const expiryTime = payload.exp * 1000 // Convert to milliseconds
    return Date.now() >= expiryTime
  } catch (error) {
    console.error('Error checking token expiry:', error)
    return true
  }
}

// Get user role from token
export const getUserRole = (token) => {
  if (!token) return null
  try {
    const payload = decodeToken(token)
    return payload?.role || null
  } catch (error) {
    console.error('Error getting user role:', error)
    return null
  }
}

// Get user ID from token
export const getUserId = (token) => {
  if (!token) return null
  try {
    const payload = decodeToken(token)
    return payload?.sub || payload?.userId || null
  } catch (error) {
    console.error('Error getting user ID:', error)
    return null
  }
}

// Get user name from token
export const getUserName = (token) => {
  if (!token) return null
  try {
    const payload = decodeToken(token)
    return payload?.name || null
  } catch (error) {
    console.error('Error getting user name:', error)
    return null
  }
}

// Get user email from token
export const getUserEmail = (token) => {
  if (!token) return null
  try {
    const payload = decodeToken(token)
    return payload?.email || null
  } catch (error) {
    console.error('Error getting user email:', error)
    return null
  }
}

// Check if user is logged in
export const isLoggedIn = (token) => {
  return !isTokenExpired(token)
}

// Check if user has a specific role
export const hasRole = (token, roles) => {
  const userRole = getUserRole(token)
  if (!userRole) return false
  if (Array.isArray(roles)) {
    return roles.includes(userRole)
  }
  return userRole === roles
}

// Check if user is admin
export const isAdmin = (token) => {
  return hasRole(token, 'admin')
}

// Check if user is moderator
export const isModerator = (token) => {
  return hasRole(token, ['admin', 'moderator'])
}

// Get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken')
  if (token && !isTokenExpired(token)) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

// Set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('accessToken', token)
  } else {
    localStorage.removeItem('accessToken')
  }
}

// Remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}

export default {
  decodeToken,
  isTokenExpired,
  getUserRole,
  getUserId,
  getUserName,
  getUserEmail,
  isLoggedIn,
  hasRole,
  isAdmin,
  isModerator,
  getAuthHeaders,
  setAuthToken,
  removeAuthToken,
}
