import React from 'react'
import { AuthProvider, ThemeProvider, NotificationProvider, SettingsProvider } from '../contexts'

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
