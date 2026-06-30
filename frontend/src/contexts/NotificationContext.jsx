import React, { createContext, useContext, useState, useCallback } from 'react'
import toast from 'react-hot-toast'

const NotificationContext = createContext(null)

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider')
  }
  return context
}

export const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const showToast = useCallback((message, type = 'success', options = {}) => {
    const toastFn = {
      success: toast.success,
      error: toast.error,
      loading: toast.loading,
    }
    return toastFn[type]?.(message, options) || toast(message, options)
  }, [])

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [{
      id: Date.now().toString(),
      ...notification,
      createdAt: new Date().toISOString(),
      read: false,
    }, ...prev])
    setUnreadCount((prev) => prev + 1)
    showToast(notification.message, notification.type || 'info')
  }, [showToast])

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
  }, [])

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    showToast,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
