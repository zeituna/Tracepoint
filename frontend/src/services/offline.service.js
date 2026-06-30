import { 
  isOnline, 
  queueOfflineRequest, 
  saveOfflineData, 
  getOfflineData,
  processOfflineQueue 
} from '../utils/ruralAccess'

export const offlineService = {
  // Save data for offline access
  saveForOffline: async (key, data) => {
    try {
      return await saveOfflineData(key, data)
    } catch (error) {
      console.error('Error saving for offline:', error)
      return false
    }
  },

  // Get offline data
  getOffline: async (key) => {
    try {
      return await getOfflineData(key)
    } catch (error) {
      console.error('Error getting offline data:', error)
      return null
    }
  },

  // Queue request for later
  queueRequest: (request) => {
    return queueOfflineRequest(request)
  },

  // Process offline queue
  processQueue: async (processFn) => {
    return await processOfflineQueue(processFn)
  },

  // Sync data when online
  syncWhenOnline: async (syncFn) => {
    if (isOnline()) {
      try {
        return await syncFn()
      } catch (error) {
        console.error('Sync error:', error)
        return null
      }
    } else {
      // Queue for later
      queueOfflineRequest({ type: 'sync', fn: syncFn.toString() })
      return { queued: true, message: 'Will sync when online' }
    }
  },

  // Check if online
  isOnline: () => isOnline(),
}

export default offlineService
