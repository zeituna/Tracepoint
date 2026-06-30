import apiClient from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'

export const facialService = {
  // Upload face image
  upload: async (imageFile) => {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      
      const response = await apiClient.post(API_ENDPOINTS.FACIAL.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Upload failed' }
    }
  },

  // Match face
  match: async (imageFile) => {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      
      const response = await apiClient.post(API_ENDPOINTS.FACIAL.MATCH, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Face matching failed' }
    }
  },

  // Get gallery
  getGallery: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FACIAL.GALLERY)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch gallery' }
    }
  },

  // Delete face
  delete: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.FACIAL.DELETE(id))
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete face' }
    }
  },
}

export default facialService
