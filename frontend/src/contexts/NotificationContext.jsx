import React, { createContext, useContext, useState } from 'react'

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

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev])
  }

  const value = {
    notifications,
    addNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
