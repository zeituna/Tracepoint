import React, { useState, useEffect } from 'react'
import { WifiOff, Wifi, Cloud, CloudOff } from 'lucide-react'
import { isOnline } from '../../utils/ruralAccess'

const OfflineBanner = () => {
  const [online, setOnline] = useState(true)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const checkOnline = () => {
      const status = isOnline()
      setOnline(status)
      setShowBanner(!status)
    }

    checkOnline()
    window.addEventListener('online', checkOnline)
    window.addEventListener('offline', checkOnline)

    return () => {
      window.removeEventListener('online', checkOnline)
      window.removeEventListener('offline', checkOnline)
    }
  }, [])

  if (!showBanner) return null

  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-yellow-500 dark:bg-yellow-600 text-white px-4 py-2 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <WifiOff size={20} />
          <span className="font-medium">You are offline</span>
          <span className="text-sm opacity-90">
            Some features may be limited. Data will sync when you reconnect.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="opacity-75" size={16} />
          <span className="text-xs opacity-75">Offline mode active</span>
          <button
            onClick={() => setShowBanner(false)}
            className="ml-2 text-white hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default OfflineBanner
