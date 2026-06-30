import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const alertService = {
  // Get all alerts
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ALERTS.BASE)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch alerts' }
    }
  },

  // Get alert by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ALERTS.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch alert' }
    }
  },

  // Create alert
  create: async (alertData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ALERTS.BASE, alertData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create alert' }
    }
  },

  // Update alert
  update: async (id, alertData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.ALERTS.DETAIL(id), alertData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update alert' }
    }
  },

  // Delete alert
  delete: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.ALERTS.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete alert' }
    }
  },

  // Mark alert as read
  markAsRead: async (id) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.ALERTS.READ(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark alert as read' }
    }
  },

  // Mark all alerts as read
  markAllAsRead: async () => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.ALERTS.READ_ALL)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark all alerts as read' }
    }
  },
}

export default alertService
