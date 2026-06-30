import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Logout failed' }
    }
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Token refresh failed' }
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send reset link' }
    }
  },

  // Reset password
  resetPassword: async (token, password) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' }
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'OTP verification failed' }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user' }
    }
  },
}

export default authService
