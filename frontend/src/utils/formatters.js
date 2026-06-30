import dayjs from 'dayjs'

/**
 * Formatting utility functions
 */

// Format date
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  if (!date) return 'N/A'
  return dayjs(date).format(format)
}

// Format date with time
export const formatDateTime = (date, format = 'MMM DD, YYYY HH:mm') => {
  if (!date) return 'N/A'
  return dayjs(date).format(format)
}

// Format time ago
export const timeAgo = (date) => {
  if (!date) return 'N/A'
  return dayjs(date).fromNow()
}

// Format currency
export const formatCurrency = (amount, currency = 'KES') => {
  if (!amount && amount !== 0) return 'N/A'
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format number with commas
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0'
  return new Intl.NumberFormat().format(num)
}

// Format percentage
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined) return 'N/A'
  return `${value.toFixed(decimals)}%`
}

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Capitalize each word
export const capitalizeWords = (str) => {
  if (!str) return ''
  return str.replace(/\b\w/g, l => l.toUpperCase())
}

// Format phone number
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format status
export const formatStatus = (status) => {
  const statusMap = {
    active: 'Active',
    pending: 'Pending',
    resolved: 'Resolved',
    closed: 'Closed',
    open: 'Open',
    'in-progress': 'In Progress',
    in_progress: 'In Progress',
  }
  return statusMap[status?.toLowerCase()] || status
}

// Get status color
export const getStatusColor = (status) => {
  const colorMap = {
    active: 'green',
    pending: 'yellow',
    resolved: 'blue',
    closed: 'gray',
    open: 'red',
    'in-progress': 'orange',
    in_progress: 'orange',
  }
  return colorMap[status?.toLowerCase()] || 'gray'
}

export default {
  formatDate,
  formatDateTime,
  timeAgo,
  formatCurrency,
  formatNumber,
  formatPercentage,
  truncateText,
  capitalize,
  capitalizeWords,
  formatPhone,
  formatFileSize,
  formatStatus,
  getStatusColor,
}
