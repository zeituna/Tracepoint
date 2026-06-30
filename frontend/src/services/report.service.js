import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const reportService = {
  // Get all reports
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTS.BASE, { params })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch reports' }
    }
  },

  // Get single report
  getById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTS.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch report' }
    }
  },

  // Create report
  create: async (reportData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REPORTS.BASE, reportData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create report' }
    }
  },

  // Update report
  update: async (id, reportData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.REPORTS.DETAIL(id), reportData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update report' }
    }
  },

  // Delete report
  delete: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.REPORTS.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete report' }
    }
  },

  // Update report status
  updateStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.REPORTS.STATUS(id), { status })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update status' }
    }
  },

  // Search reports
  search: async (query) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTS.SEARCH, { params: { q: query } })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Search failed' }
    }
  },

  // Add comment to report
  addComment: async (id, comment) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REPORTS.COMMENT(id), { comment })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add comment' }
    }
  },
}

export default reportService
