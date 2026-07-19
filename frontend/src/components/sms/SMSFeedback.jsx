import React, { useState } from 'react'
import { 
  Phone, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  WifiOff,
  Globe
} from 'lucide-react'

const SMSFeedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    age: '',
    description: '',
    contact: '',
    relationship: '',
    lastSeen: ''
  })
  const [smsMessage, setSmsMessage] = useState('')
  const [ussdCode, setUssdCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('sms')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateSMS = () => {
    const message = `TRACEPOINT REPORT
Name: ${formData.name}
Location: ${formData.location}
Age: ${formData.age}
Last Seen: ${formData.lastSeen}
Description: ${formData.description}
Contact: ${formData.contact}
Relationship: ${formData.relationship}

Reply STOP to unsubscribe.
TracePoint - Missing Person Tracking System`
    
    setSmsMessage(message)
  }

  const generateUSSD = () => {
    const code = `*384#1234#`
    setUssdCode(code)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(smsMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      generateSMS()
      generateUSSD()
    }, 1500)
  }

  const smsNumber = '+254700123456'
  const ussdShortCode = '1234'

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
            <WifiOff size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Offline Reporting</h2>
            <p className="text-white/80 text-sm">Report via SMS or USSD - No internet needed</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
            <Smartphone size={12} />
            Works on any phone
          </span>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
            <Globe size={12} />
            No internet required
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('sms')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'sms'
                ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <MessageSquare size={16} className="inline mr-1" />
            SMS Report
          </button>
          <button
            onClick={() => setActiveTab('ussd')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'ussd'
                ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Phone size={16} className="inline mr-1" />
            USSD Code
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'guide'
                ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Users size={16} className="inline mr-1" />
            Guide
          </button>
        </div>

        {/* SMS Tab */}
        {activeTab === 'sms' && (
          <div>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name of Missing Person *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Amina Hassan"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Known Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Nairobi, Kenya"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      placeholder="e.g., 28"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Seen
                    </label>
                    <input
                      type="text"
                      name="lastSeen"
                      placeholder="e.g., 2 hours ago"
                      value={formData.lastSeen}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description (appearance, clothing, etc.)
                  </label>
                  <textarea
                    name="description"
                    placeholder="e.g., Wearing blue dress, tall, last seen at market"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="e.g., 0712345678"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Relationship to Missing Person
                  </label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select relationship</option>
                    <option value="Family Member">Family Member</option>
                    <option value="Friend">Friend</option>
                    <option value="Neighbor">Neighbor</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Witness">Witness</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Generate SMS Report
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div>
                {/* Success Message */}
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
                  <CheckCircle size={24} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-700 dark:text-emerald-400">Report Generated Successfully</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500">Copy the SMS below or send directly</p>
                  </div>
                </div>

                {/* SMS Message */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap border border-gray-200 dark:border-gray-700">
                  {smsMessage}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy SMS'}
                  </button>
                  <a
                    href={`sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send SMS
                  </a>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  📱 SMS Number: <strong className="text-primary-600 dark:text-primary-400">{smsNumber}</strong>
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false)
                    setSmsMessage('')
                    setFormData({
                      name: '',
                      location: '',
                      age: '',
                      description: '',
                      contact: '',
                      relationship: '',
                      lastSeen: ''
                    })
                  }}
                  className="mt-4 w-full text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
                >
                  + Create New Report
                </button>
              </div>
            )}
          </div>
        )}

        {/* USSD Tab */}
        {activeTab === 'ussd' && (
          <div>
            <div className="text-center py-6">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">USSD Reporting</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Dial the code below from any phone</p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 text-center border-2 border-primary-500 border-dashed">
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 font-mono">
                *384#1234#
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Dial this code on any network</p>
              <p className="text-xs text-gray-400 mt-1">Works on all Kenyan networks (Safaricom, Airtel, Telkom)</p>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <Phone size={16} />
                How to Use USSD
              </h4>
              <ol className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1.5 list-decimal pl-4">
                <li>Dial <strong className="text-primary-600 dark:text-primary-400">*384#1234#</strong> on your phone</li>
                <li>Follow the on-screen prompts</li>
                <li>Enter the missing person details</li>
                <li>Submit your report</li>
                <li>You will receive a confirmation SMS</li>
              </ol>
            </div>

            <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle size={16} />
                <strong>Free Service:</strong> USSD reporting is free on all networks
              </p>
            </div>
          </div>
        )}

        {/* Guide Tab */}
        {activeTab === 'guide' && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📖 Offline Reporting Guide</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold">1</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Option 1: SMS Reporting</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 pl-11">
                  Send a text message to <strong className="text-primary-600 dark:text-primary-400">{smsNumber}</strong> with the missing person details.
                  Include name, location, age, description, and your contact.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold">2</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Option 2: USSD Reporting</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 pl-11">
                  Dial <strong className="text-primary-600 dark:text-primary-400">*384#1234#</strong> from your phone and follow the prompts.
                  Works on all networks and doesn't require internet.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold">3</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">What Happens Next?</h4>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 pl-11 space-y-1 list-disc">
                  <li>You will receive a confirmation message</li>
                  <li>Our team will review your report</li>
                  <li>Updates will be sent to you via SMS</li>
                  <li>You can track the case using your report ID</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold">4</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">How to Track Your Report</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 pl-11">
                  Use your phone to dial <strong className="text-primary-600 dark:text-primary-400">*384#1234#</strong> and select "Track Report".
                  You can also reply to the confirmation SMS with "STATUS" to get updates.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                <AlertTriangle size={16} />
                <strong>Emergency:</strong> If you have an emergency, please call <strong className="text-red-600">999</strong> or <strong className="text-red-600">112</strong> immediately.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SMSFeedback
