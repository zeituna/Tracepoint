import React, { useState, useEffect } from 'react'
import { 
  Wifi, 
  WifiOff, 
  Signal, 
  SignalHigh, 
  SignalLow,
  Globe,
  Smartphone
} from 'lucide-react'
import { 
  isLowBandwidth, 
  isLowBandwidthEnabled,
  enableLowBandwidth,
  disableLowBandwidth,
  getConnectionSpeed,
  shouldSimplifyUI
} from '../../utils/ruralAccess'

const LowBandwidthToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState('unknown')
  const [isLowBand, setIsLowBand] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsEnabled(isLowBandwidthEnabled())
    setConnectionSpeed(getConnectionSpeed())
    setIsLowBand(isLowBandwidth())
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))

    // Listen for connection changes
    if (navigator.connection) {
      navigator.connection.addEventListener('change', () => {
        setConnectionSpeed(getConnectionSpeed())
        setIsLowBand(isLowBandwidth())
      })
    }
  }, [])

  const handleToggle = () => {
    if (isEnabled) {
      disableLowBandwidth()
      setIsEnabled(false)
    } else {
      enableLowBandwidth()
      setIsEnabled(true)
    }
    window.location.reload()
  }

  const getSpeedColor = () => {
    switch(connectionSpeed) {
      case 'fast': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'slow': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getSpeedIcon = () => {
    switch(connectionSpeed) {
      case 'fast': return <SignalHigh size={16} />
      case 'medium': return <Signal size={16} />
      case 'slow': return <SignalLow size={16} />
      default: return <Signal size={16} />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isEnabled ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            {isEnabled ? <WifiOff size={18} className="text-primary-600 dark:text-primary-400" /> : <Wifi size={18} className="text-gray-600 dark:text-gray-400" />}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              {isEnabled ? 'Low Bandwidth Mode' : 'Standard Mode'}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Speed:</span>
              <span className={`flex items-center gap-1 ${getSpeedColor()}`}>
                {getSpeedIcon()}
                {connectionSpeed.charAt(0).toUpperCase() + connectionSpeed.slice(1)}
              </span>
              {isMobile && (
                <span className="flex items-center gap-1">
                  <Smartphone size={12} />
                  Mobile
                </span>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleToggle}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isEnabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-0.5'
          }`}></div>
        </button>
      </div>

      {isLowBand && !isEnabled && (
        <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-xs text-yellow-800 dark:text-yellow-400 flex items-center gap-2">
            <Globe size={14} />
            Slow connection detected. Enable low bandwidth mode for better performance.
          </p>
        </div>
      )}

      {isEnabled && (
        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-400 flex items-center gap-2">
            <WifiOff size={14} />
            Low bandwidth mode active. Images and animations optimized for slow connections.
          </p>
        </div>
      )}
    </div>
  )
}

export default LowBandwidthToggle
