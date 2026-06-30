/**
 * Error handling utilities
 */

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: 'Resource not found.',
  SERVER: 'Server error. Please try again later.',
  VALIDATION: 'Please check your input and try again.',
  DEFAULT: 'An unexpected error occurred. Please try again.',
}

// Handle API errors
export const handleApiError = (error) => {
  console.error('API Error:', error)

  if (!error.response) {
    return {
      message: ERROR_MESSAGES.NETWORK,
      status: 0,
      type: 'network',
    }
  }

  const { status, data } = error.response
  const message = data?.message || data?.error || ERROR_MESSAGES.DEFAULT

  switch (status) {
    case 401:
      return { message: ERROR_MESSAGES.UNAUTHORIZED, status, type: 'auth' }
    case 403:
      return { message: ERROR_MESSAGES.FORBIDDEN, status, type: 'permission' }
    case 404:
      return { message: ERROR_MESSAGES.NOT_FOUND, status, type: 'notfound' }
    case 400:
      return { message: data?.message || ERROR_MESSAGES.VALIDATION, status, type: 'validation' }
    case 500:
      return { message: ERROR_MESSAGES.SERVER, status, type: 'server' }
    default:
      return { message, status, type: 'unknown' }
  }
}

// Format error for display
export const formatError = (error) => {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  return ERROR_MESSAGES.DEFAULT
}

// Show error toast helper
export const showErrorToast = (error, toastFn) => {
  const formattedError = formatError(error)
  if (toastFn) {
    toastFn(formattedError)
  } else {
    console.error('Error:', formattedError)
  }
}

// Extract validation errors
export const getValidationErrors = (error) => {
  const errors = {}
  if (error?.response?.data?.errors) {
    Object.entries(error.response.data.errors).forEach(([key, value]) => {
      errors[key] = Array.isArray(value) ? value[0] : value
    })
  }
  return errors
}

// Check if error is validation error
export const isValidationError = (error) => {
  return error?.response?.status === 400 && error?.response?.data?.errors
}

// Check if error is auth error
export const isAuthError = (error) => {
  return error?.response?.status === 401
}

// Check if error is network error
export const isNetworkError = (error) => {
  return !error?.response && error?.message === 'Network Error'
}

export default {
  ERROR_MESSAGES,
  handleApiError,
  formatError,
  showErrorToast,
  getValidationErrors,
  isValidationError,
  isAuthError,
  isNetworkError,
}
