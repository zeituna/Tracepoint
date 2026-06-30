import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const trackingService = {
  // Get all tracking data
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRACKING.BASE)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch tracking data' }
    }
  },

  // Get tracking by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRACKING.LOCATION(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch location' }
    }
  },

  // Update location
  updateLocation: async (id, locationData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.TRACKING.LOCATION(id), locationData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update location' }
    }
  },

  // Get location history
  getHistory: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRACKING.HISTORY(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch history' }
    }
  },
}

export default trackingService
