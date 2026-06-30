import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const caseService = {
  // Get all cases
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CASES.BASE)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cases' }
    }
  },

  // Get case by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CASES.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch case' }
    }
  },

  // Create case
  create: async (caseData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CASES.BASE, caseData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create case' }
    }
  },

  // Update case
  update: async (id, caseData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.CASES.DETAIL(id), caseData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update case' }
    }
  },

  // Delete case
  delete: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CASES.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete case' }
    }
  },

  // Update case status
  updateStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.CASES.STATUS(id), { status })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update status' }
    }
  },

  // Get case timeline
  getTimeline: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CASES.TIMELINE(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch timeline' }
    }
  },
}

export default caseService
