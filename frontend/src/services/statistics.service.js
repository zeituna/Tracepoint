import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const statisticsService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STATISTICS.DASHBOARD)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard stats' }
    }
  },

  // Get reports statistics
  getReportsStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STATISTICS.REPORTS)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch reports stats' }
    }
  },

  // Get cases statistics
  getCasesStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STATISTICS.CASES)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cases stats' }
    }
  },

  // Get users statistics
  getUsersStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STATISTICS.USERS)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users stats' }
    }
  },
}

export default statisticsService
