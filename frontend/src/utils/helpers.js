/**
 * General helper functions
 */

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

// Generate random string
export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Generate random color
export const generateRandomColor = () => {
  const colors = [
    '#3b82f6', '#ef4444', '#22c55e', '#f59e0b',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// Compare objects
export const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

// Get nested value from object
export const getNestedValue = (obj, path, defaultValue = null) => {
  try {
    const keys = path.split('.')
    let result = obj
    for (const key of keys) {
      result = result[key]
      if (result === undefined || result === null) return defaultValue
    }
    return result
  } catch {
    return defaultValue
  }
}

// Set nested value in object
export const setNestedValue = (obj, path, value) => {
  const keys = path.split('.')
  const result = { ...obj }
  let current = result
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]] = { ...current[keys[i]] }
  }
  current[keys[keys.length - 1]] = value
  return result
}

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key]
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {})
}

// Sort array by key
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

// Filter array by search term
export const filterBySearch = (array, searchTerm, keys) => {
  if (!searchTerm) return array
  const term = searchTerm.toLowerCase()
  return array.filter(item => {
    return keys.some(key => {
      const value = item[key]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term)
      }
      if (typeof value === 'number') {
        return value.toString().includes(term)
      }
      return false
    })
  })
}

// Debounce function
export const debounce = (fn, delay = 500) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Throttle function
export const throttle = (fn, limit = 500) => {
  let inThrottle = false
  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// Download file
export const downloadFile = (content, filename, type = 'text/plain') => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default {
  generateId,
  generateRandomString,
  generateRandomColor,
  deepClone,
  isEqual,
  getNestedValue,
  setNestedValue,
  groupBy,
  sortBy,
  filterBySearch,
  debounce,
  throttle,
  copyToClipboard,
  downloadFile,
}
