import React, { useState } from 'react'
import { Phone, MessageSquare, Send, Copy, Check } from 'lucide-react'
import { generateSMSReport, getSMSNumber } from '../../utils/ruralAccess'

const SMSReportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    age: '',
    description: ''
  })
  const [copied, setCopied] = useState(false)
  const [smsMessage, setSmsMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateSMS = () => {
    const message = generateSMSReport(formData)
    setSmsMessage(message)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(smsMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getSMSCode = () => {
    const number = getSMSNumber()
    return `sms:${number}?body=${encodeURIComponent(smsMessage)}`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <MessageSquare size={20} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SMS / USSD Report</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Report via SMS for areas with limited internet</p>
        </div>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name of Missing Person"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Last Known Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <textarea
          name="description"
          placeholder="Description (appearance, clothing, etc.)"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />

        <button
          onClick={generateSMS}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 rounded-lg hover:shadow-lg transition-all"
        >
          Generate SMS Report
        </button>

        {smsMessage && (
          <div className="mt-4">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{smsMessage}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy SMS'}
              </button>
              <a
                href={getSMSCode()}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send SMS
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              SMS Number: {getSMSNumber()}
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-400 flex items-center gap-2">
            <Phone size={14} />
            USSD Code: *384#1234# (Dial to report via USSD)
          </p>
        </div>
      </div>
    </div>
  )
}

export default SMSReportForm
