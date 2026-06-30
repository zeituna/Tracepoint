import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const userService = {
  // Get all users
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.BASE)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' }
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user' }
    }
  },

  // Update user
  update: async (id, userData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USERS.DETAIL(id), userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user' }
    }
  },

  // Delete user
  delete: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.USERS.DETAIL(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete user' }
    }
  },

  // Get profile
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.PROFILE)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' }
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USERS.PROFILE, profileData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' }
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, passwordData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' }
    }
  },
}

export default userService
