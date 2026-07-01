import React, { useState } from 'react'

const SMSCommunication = () => {
  const [phoneNumber] = useState('+254700123456')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 -mx-6 -mt-6 p-6 text-white rounded-t-2xl">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>📱</span> SMS/USSD Communication
        </h2>
        <p className="text-gray-300 text-sm mt-1">Send messages from any phone - No internet needed</p>
      </div>

      <div className="mt-6">
        {/* SMS Number */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Send SMS to:</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-gray-900 dark:text-white">{phoneNumber}</span>
            <button
              onClick={() => copyToClipboard(phoneNumber)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>

        {/* USSD Code */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Dial USSD code:</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-gray-900 dark:text-white">*384#1234#</span>
            <button
              onClick={() => copyToClipboard('*384#1234#')}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              📋 Copy
            </button>
          </div>
        </div>

        {/* How to Send SMS */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800 mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">📱 How to Send an SMS</h3>
          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal pl-4">
            <li>Open SMS app on your phone</li>
            <li>Type number: <strong className="text-blue-600">{phoneNumber}</strong></li>
            <li>Type your command (e.g., <span className="font-mono">REPORT Amina, Nairobi, 28 years</span>)</li>
            <li>Press Send</li>
          </ol>
        </div>

        {/* How to Use USSD */}
        <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800 mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">📞 How to Use USSD</h3>
          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal pl-4">
            <li>Dial <strong className="text-purple-600">*384#1234#</strong> on your phone</li>
            <li>Follow the on-screen prompts</li>
            <li>Enter your report details</li>
            <li>Submit and confirm</li>
          </ol>
        </div>

        {/* Commands */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">📋 SMS Commands</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-blue-600 font-mono">REPORT</span>
              <span className="text-gray-500 ml-1">Submit report</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-blue-600 font-mono">STATUS [ID]</span>
              <span className="text-gray-500 ml-1">Check status</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-blue-600 font-mono">UPDATE [ID]</span>
              <span className="text-gray-500 ml-1">Update case</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-blue-600 font-mono">JOIN [ID]</span>
              <span className="text-gray-500 ml-1">Join case</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-blue-600 font-mono">HELP</span>
              <span className="text-gray-500 ml-1">Get help</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-red-600 font-mono">EMERGENCY</span>
              <span className="text-gray-500 ml-1">Call 999/112</span>
            </div>
          </div>
        </div>

        {/* Example Messages */}
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">💡 Example SMS:</p>
          <div className="text-sm text-gray-700 dark:text-gray-300 font-mono break-all bg-white dark:bg-gray-800 p-2 rounded-lg">
            REPORT Amina Hassan, Nairobi, 28 years, wearing blue dress
          </div>
          <button
            onClick={() => copyToClipboard('REPORT Amina Hassan, Nairobi, 28 years, wearing blue dress')}
            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            📋 Copy Example
          </button>
        </div>

        {/* Emergency Note */}
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
            <span className="text-lg">🚨</span>
            <strong>Emergency:</strong> Call <span className="font-bold">999</span> or <span className="font-bold">112</span> immediately
          </p>
        </div>
      </div>
    </div>
  )
}

export default SMSCommunication
