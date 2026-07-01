import React, { useState } from 'react'
import { Phone, MessageSquare, Send, Copy, Check, Smartphone, WifiOff, Globe, AlertTriangle, CheckCircle } from 'lucide-react'

const SMSCommunication = () => {
  const [copied, setCopied] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [smsNumber] = useState('+254700123456')
  const [ussdCode] = useState('*384#1234#')

  const languages = [
    { code: 'sw', name: 'Kiswahili' },
    { code: 'en', name: 'English' },
    { code: 'so', name: 'Somali' },
    { code: 'luo', name: 'Dholuo' },
    { code: 'kik', name: 'Gikuyu' },
    { code: 'kal', name: 'Kalenjin' },
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const commands = {
    en: {
      report: 'REPORT [name, location, age, description]',
      status: 'STATUS [CaseID]',
      update: 'UPDATE [CaseID] [details]',
      join: 'JOIN [CaseID]',
      help: 'HELP',
      emergency: 'EMERGENCY'
    },
    sw: {
      report: 'REPORT [jina, mahali, umri, maelezo]',
      status: 'STATUS [Kitambulisho]',
      update: 'UPDATE [Kitambulisho] [maelezo]',
      join: 'JOIN [Kitambulisho]',
      help: 'HELP',
      emergency: 'EMERGENCY'
    },
    so: {
      report: 'REPORT [magaca, goobta, da, sharaxaad]',
      status: 'STATUS [Aqoonsiga]',
      update: 'UPDATE [Aqoonsiga] [faahfaahin]',
      join: 'JOIN [Aqoonsiga]',
      help: 'HELP',
      emergency: 'EMERGENCY'
    },
    luo: {
      report: 'REPORT [nying, kama, higa, loso]',
      status: 'STATUS [ID]',
      update: 'UPDATE [ID] [weche]',
      join: 'JOIN [ID]',
      help: 'HELP',
      emergency: 'EMERGENCY'
    },
    kik: {
      report: 'REPORT [rĩĩtwa, kũrĩa, mĩaka, kũũria]',
      status: 'STATUS [ID]',
      update: 'UPDATE [ID] [weche]',
      join: 'JOIN [ID]',
      help: 'HELP',
      emergency: 'EMERGENCY'
    },
    kal: {
      report: 'REPORT [nying, kama, higa, loso]',
      status: 'STATUS [ID]',
      update: 'UPDATE [ID] [weche]',
      join: 'JOIN [ID]',
      help: 'HELP',
      emergency: 'EMERGENCY'
    }
  }

  const getCommand = (cmd) => {
    return commands[selectedLanguage]?.[cmd] || commands.en[cmd]
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
            <WifiOff size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">📱 SMS/USSD Communication</h2>
            <p className="text-white/70 text-sm">No internet needed • Works on any phone</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs">📱 No internet required</span>
          <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs">🌍 All Kenyan languages</span>
          <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs">📶 Works on any network</span>
        </div>
      </div>

      <div className="p-6">
        {/* Language Selector */}
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <Globe size={18} className="text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Select your language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        {/* Two Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SMS Method */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={18} className="text-blue-600" />
              <h3 className="font-semibold text-gray-800 dark:text-white">📱 Send SMS</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">1. Open SMS on your phone</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">2. Type number:</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{smsNumber}</span>
                  <button
                    onClick={() => copyToClipboard(smsNumber)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm hover:bg-gray-300"
                  >
                    {copied ? '✅' : '📋'}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">3. Type your command:</p>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 font-mono break-all bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {getCommand('report')}
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">4. Press Send</p>
              </div>
            </div>
          </div>

          {/* USSD Method */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Phone size={18} className="text-purple-600" />
              <h3 className="font-semibold text-gray-800 dark:text-white">📞 Use USSD</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">1. Dial the USSD code:</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-bold text-lg">{ussdCode}</span>
                  <button
                    onClick={() => copyToClipboard(ussdCode)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm hover:bg-gray-300"
                  >
                    {copied ? '✅' : '📋'}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">2. Follow the menu prompts</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">3. Enter your report details</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">4. Submit and confirm</p>
              </div>
            </div>
          </div>
        </div>

        {/* SMS Commands */}
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">📋 SMS Commands</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <span className="font-mono text-blue-600">REPORT</span>
              <span className="text-gray-500 ml-1">Submit report</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <span className="font-mono text-blue-600">STATUS</span>
              <span className="text-gray-500 ml-1">Check status</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <span className="font-mono text-blue-600">UPDATE</span>
              <span className="text-gray-500 ml-1">Update case</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <span className="font-mono text-blue-600">JOIN</span>
              <span className="text-gray-500 ml-1">Join case</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <span className="font-mono text-blue-600">HELP</span>
              <span className="text-gray-500 ml-1">Get help</span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
              <span className="font-mono text-red-600">EMERGENCY</span>
              <span className="text-gray-500 ml-1">Call 999/112</span>
            </div>
          </div>
        </div>

        {/* Example Messages */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-400 mb-2">💡 Example in {languages.find(l => l.code === selectedLanguage)?.name}:</p>
          <div className="text-sm text-gray-700 dark:text-gray-300 font-mono break-all bg-white dark:bg-gray-800 p-2 rounded-lg">
            {getCommand('report')}
          </div>
          <button
            onClick={() => copyToClipboard(getCommand('report'))}
            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            📋 Copy Example
          </button>
        </div>

        {/* How the System Works */}
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle size={16} />
            How Your Message is Processed
          </h4>
          <ol className="text-sm text-emerald-700 dark:text-emerald-400 mt-2 space-y-1 list-decimal pl-4">
            <li>You send SMS to <strong className="font-mono">{smsNumber}</strong></li>
            <li>System detects your language</li>
            <li>Message is translated to English for admin</li>
            <li>Admin responds in English</li>
            <li>System translates back to your language</li>
            <li>You receive response in your language</li>
          </ol>
        </div>

        {/* Emergency */}
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle size={16} />
            <strong>Emergency:</strong> Call <span className="font-bold">999</span> or <span className="font-bold">112</span> immediately
          </p>
        </div>
      </div>
    </div>
  )
}

export default SMSCommunication
