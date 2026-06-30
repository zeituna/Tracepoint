import apiClient from '../api/client'

export const uploadService = {
  // Upload single file
  uploadFile: async (file, type = 'image') => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)
      
      const response = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Upload failed' }
    }
  },

  // Upload multiple files
  uploadMultiple: async (files) => {
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      
      const response = await apiClient.post('/upload/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Upload failed' }
    }
  },

  // Delete file
  deleteFile: async (filename) => {
    try {
      const response = await apiClient.delete(`/upload/${filename}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete file' }
    }
  },
}

export default uploadService
