import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const user = { name: 'Admin User', email, role: 'Administrator' }
      setUser(user)
      setIsAuthenticated(true)
      return user
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { success: true }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
