/**
 * Validation utility functions
 */

// Validate email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Validate phone number
export const validatePhone = (phone) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return regex.test(phone)
}

// Validate password (min 6 chars, at least 1 letter and 1 number)
export const validatePassword = (password) => {
  if (password.length < 6) return false
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  return hasLetter && hasNumber
}

// Validate password strength
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Weak', color: 'red-500' }
  
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++
  
  if (score <= 2) return { score, label: 'Weak', color: 'red-500' }
  if (score <= 4) return { score, label: 'Medium', color: 'yellow-500' }
  return { score, label: 'Strong', color: 'green-500' }
}

// Validate URL
export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Validate required field
export const isRequired = (value) => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

// Validate min length
export const minLength = (value, min) => {
  if (typeof value === 'string') return value.length >= min
  if (Array.isArray(value)) return value.length >= min
  return false
}

// Validate max length
export const maxLength = (value, max) => {
  if (typeof value === 'string') return value.length <= max
  if (Array.isArray(value)) return value.length <= max
  return false
}

// Validate numeric
export const isNumeric = (value) => {
  return /^[0-9]+$/.test(value)
}

// Validate alphanumeric
export const isAlphanumeric = (value) => {
  return /^[a-zA-Z0-9]+$/.test(value)
}

// Validator object for forms
export const validators = {
  required: (message = 'This field is required') => ({
    required: message,
  }),
  email: (message = 'Invalid email address') => ({
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message,
    },
  }),
  minLength: (min, message) => ({
    minLength: {
      value: min,
      message: message || `Minimum ${min} characters required`,
    },
  }),
  maxLength: (max, message) => ({
    maxLength: {
      value: max,
      message: message || `Maximum ${max} characters allowed`,
    },
  }),
  validate: (fn, message) => ({
    validate: {
      validator: (value) => fn(value) || message,
    },
  }),
}

export default {
  validateEmail,
  validatePhone,
  validatePassword,
  getPasswordStrength,
  validateUrl,
  isRequired,
  minLength,
  maxLength,
  isNumeric,
  isAlphanumeric,
  validators,
}
