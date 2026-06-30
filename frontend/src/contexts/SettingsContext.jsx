import React, { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext(null)

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider')
  }
  return context
}

export const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('appSettings')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return getDefaultSettings()
      }
    }
    return getDefaultSettings()
  })

  function getDefaultSettings() {
    return {
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      notifications: {
        email: true,
        push: true,
        sms: false,
        reportUpdates: true,
        caseUpdates: true,
        messages: true,
        alerts: true,
      },
      privacy: {
        showOnlineStatus: true,
        showLastSeen: true,
      },
    }
  }

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }))
  }

  const updateNotificationSettings = (notificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...notificationSettings,
      },
    }))
  }

  const value = {
    settings,
    updateSettings,
    updateNotificationSettings,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
