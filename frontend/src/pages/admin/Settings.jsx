import React, { useState } from 'react'
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Lock, 
  Mail, 
  Phone, 
  Save,
  Moon,
  Sun,
  Check,
  ChevronRight,
  LogOut
} from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reportUpdates: true,
    caseUpdates: true,
    messages: true,
    alerts: true,
  })

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@tracepoint.com',
    phone: '+254712345678',
    role: 'Administrator',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleProfileChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    alert('Profile updated successfully!')
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    }
    alert('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="ml-auto w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User size={20} className="text-green-600" />
                  Profile Settings
                </h2>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={profile.role}
                      disabled
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-600/20 flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-green-600" />
                  Security Settings
                </h2>
                <form onSubmit={handleSavePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter new password (min 6 characters)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-600/20 flex items-center gap-2"
                  >
                    <Lock size={18} />
                    Change Password
                  </button>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Bell size={20} className="text-green-600" />
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('email')}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('push')}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.push ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive SMS updates</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('sms')}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.sms ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Report Updates</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about report changes</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('reportUpdates')}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.reportUpdates ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.reportUpdates ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Case Updates</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about case changes</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('caseUpdates')}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.caseUpdates ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.caseUpdates ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Messages</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about new messages</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('messages')}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.messages ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.messages ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Alerts</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about alerts</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('alerts')}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.alerts ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications.alerts ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Palette size={20} className="text-green-600" />
                  Appearance Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Language</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</p>
                    </div>
                    <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="en">English</option>
                      <option value="sw">Kiswahili</option>
                      <option value="so">Somali</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Time Zone</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Select your time zone</p>
                    </div>
                    <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="EAT">EAT (UTC+3)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Color Theme</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Green & White</p>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-full bg-green-600 border-2 border-green-600"></div>
                      <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                      <div className="w-6 h-6 rounded-full bg-purple-600"></div>
                      <div className="w-6 h-6 rounded-full bg-red-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
