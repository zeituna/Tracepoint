/**
 * Local storage utilities
 */

// Get item from storage
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error getting item from storage: ${key}`, error)
    return null
  }
}

// Set item in storage
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error setting item in storage: ${key}`, error)
    return false
  }
}

// Remove item from storage
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing item from storage: ${key}`, error)
    return false
  }
}

// Clear all storage
export const clearAll = () => {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error('Error clearing storage:', error)
    return false
  }
}

// Check if key exists
export const hasItem = (key) => {
  try {
    return localStorage.getItem(key) !== null
  } catch {
    return false
  }
}

// Get item with default value
export const getItemWithDefault = (key, defaultValue) => {
  const item = getItem(key)
  return item !== null ? item : defaultValue
}

// Storage service with methods
export const storage = {
  get: getItem,
  set: setItem,
  remove: removeItem,
  clear: clearAll,
  has: hasItem,
  getDefault: getItemWithDefault,
}

// Session storage utilities
export const sessionStorageUtils = {
  get: (key) => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    try {
      sessionStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },
  clear: () => {
    try {
      sessionStorage.clear()
      return true
    } catch {
      return false
    }
  },
}

export default {
  getItem,
  setItem,
  removeItem,
  clearAll,
  hasItem,
  getItemWithDefault,
  storage,
  sessionStorageUtils,
}
