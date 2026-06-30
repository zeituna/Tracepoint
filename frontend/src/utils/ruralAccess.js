/**
 * Rural Accessibility Utilities
 * Features for users in areas with limited connectivity
 */

// Check if user has internet connection
export const isOnline = () => {
  return navigator.onLine
}

// Check connection speed (estimated)
export const getConnectionSpeed = () => {
  if (!navigator.connection) return 'unknown'
  
  const { effectiveType, downlink } = navigator.connection
  if (effectiveType === '4g' || effectiveType === '5g') {
    return 'fast'
  } else if (effectiveType === '3g') {
    return 'medium'
  } else if (effectiveType === '2g') {
    return 'slow'
  } else {
    return 'unknown'
  }
}

// Check if in low bandwidth mode
export const isLowBandwidth = () => {
  const speed = getConnectionSpeed()
  return speed === 'slow' || speed === 'unknown'
}

// Enable low bandwidth mode
export const enableLowBandwidth = () => {
  localStorage.setItem('lowBandwidthMode', 'true')
  // Disable images
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy'
  })
  // Reduce animations
  document.querySelectorAll('*').forEach(el => {
    el.style.animationDuration = '0.01s'
    el.style.transitionDuration = '0.01s'
  })
  return true
}

// Disable low bandwidth mode
export const disableLowBandwidth = () => {
  localStorage.removeItem('lowBandwidthMode')
  return true
}

// Check if low bandwidth mode is enabled
export const isLowBandwidthEnabled = () => {
  return localStorage.getItem('lowBandwidthMode') === 'true'
}

// Detect if user is on mobile device
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Detect if user is using USSD/SMS
export const isUsingUSSD = () => {
  // Check if user agent indicates basic phone
  return /Nokia|Samsung|LG|Huawei|ZTE|Alcatel|Micromax|Karbonn|Lava|Intex|Gionee|Oppo|Vivo|OnePlus|Xiaomi|Realme|Tecno|Infinix|Itel/i.test(navigator.userAgent) && isMobileDevice()
}

// Get offline data from cache
export const getOfflineData = async (key) => {
  try {
    const cache = await caches.open('tracepoint-offline')
    const response = await cache.match(key)
    if (response) {
      return await response.json()
    }
    return null
  } catch (error) {
    console.error('Error getting offline data:', error)
    return null
  }
}

// Save data for offline use
export const saveOfflineData = async (key, data) => {
  try {
    const cache = await caches.open('tracepoint-offline')
    const response = new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    })
    await cache.put(key, response)
    return true
  } catch (error) {
    console.error('Error saving offline data:', error)
    return false
  }
}

// Queue request for later sync
export const queueOfflineRequest = (request) => {
  try {
    const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]')
    queue.push({
      id: Date.now().toString(),
      request,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('offlineQueue', JSON.stringify(queue))
    return true
  } catch (error) {
    console.error('Error queueing offline request:', error)
    return false
  }
}

// Process offline queue when online
export const processOfflineQueue = async (processFn) => {
  try {
    const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]')
    if (queue.length === 0) return
    
    const results = []
    for (const item of queue) {
      try {
        const result = await processFn(item.request)
        results.push({ success: true, item, result })
      } catch (error) {
        results.push({ success: false, item, error: error.message })
      }
    }
    
    // Clear processed items
    localStorage.setItem('offlineQueue', JSON.stringify([]))
    return results
  } catch (error) {
    console.error('Error processing offline queue:', error)
    return []
  }
}

// Check if we should use offline mode
export const shouldUseOfflineMode = () => {
  return !isOnline() || isLowBandwidth()
}

// Get USSD code format for reporting
export const getUSSDCode = () => {
  return '*384#1234#' // Example USSD code
}

// Get SMS number for reporting
export const getSMSNumber = () => {
  return '+254700123456' // Example SMS number
}

// Generate SMS report template
export const generateSMSReport = (data) => {
  const { name, location, age, description } = data
  return `Report: Missing Person
Name: ${name}
Location: ${location}
Age: ${age}
Description: ${description}
Please assist in locating.`
}

// Generate USSD report template
export const generateUSSDReport = (data) => {
  const { name, location, age, description } = data
  return `MISSING|${name}|${location}|${age}|${description}`
}

// Check if offline mode should show simplified UI
export const shouldSimplifyUI = () => {
  return isLowBandwidthEnabled() || isLowBandwidth()
}

// Get rural accessibility settings
export const getRuralSettings = () => {
  return {
    offlineMode: !isOnline(),
    lowBandwidth: isLowBandwidth(),
    lowBandwidthEnabled: isLowBandwidthEnabled(),
    mobileDevice: isMobileDevice(),
    usingUSSD: isUsingUSSD(),
    connectionSpeed: getConnectionSpeed(),
    shouldSimplify: shouldSimplifyUI(),
    offlineQueue: JSON.parse(localStorage.getItem('offlineQueue') || '[]').length,
  }
}

export default {
  isOnline,
  getConnectionSpeed,
  isLowBandwidth,
  enableLowBandwidth,
  disableLowBandwidth,
  isLowBandwidthEnabled,
  isMobileDevice,
  isUsingUSSD,
  getOfflineData,
  saveOfflineData,
  queueOfflineRequest,
  processOfflineQueue,
  shouldUseOfflineMode,
  getUSSDCode,
  getSMSNumber,
  generateSMSReport,
  generateUSSDReport,
  shouldSimplifyUI,
  getRuralSettings,
}
