import React, { createContext, useContext, useState } from 'react'

const SettingsContext = createContext(null)

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider')
  }
  return context
}

export const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState({})

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const value = {
    settings,
    updateSettings,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
