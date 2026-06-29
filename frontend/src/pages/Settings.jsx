import React, { useState } from 'react'

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Application preferences</p>
      </div>

      <div className="mt-6 space-y-4">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enable push notifications</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Profile</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your profile information</p>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Security</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Change password and security settings</p>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
