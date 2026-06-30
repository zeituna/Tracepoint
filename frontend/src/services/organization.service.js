import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const organizationService = {
  // Get all organizations
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORGANIZATIONS.BASE)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch organizations' }
    }
  },

  // Get organization by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORGANIZATIONS.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch organization' }
    }
  },

  // Create organization
  create: async (orgData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ORGANIZATIONS.BASE, orgData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create organization' }
    }
  },

  // Update organization
  update: async (id, orgData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.ORGANIZATIONS.DETAIL(id), orgData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update organization' }
    }
  },

  // Delete organization
  delete: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.ORGANIZATIONS.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete organization' }
    }
  },

  // Get organization members
  getMembers: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORGANIZATIONS.MEMBERS(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch members' }
    }
  },
}

export default organizationService
