import React, { useState, useEffect, useRef } from 'react'
import { 
  Send, 
  Phone, 
  MessageSquare, 
  User, 
  Users,
  Clock,
  CheckCircle,
  Smartphone,
  WifiOff,
  Globe,
  Languages,
  Reply,
  MessageCircle,
  UserPlus,
  UserCheck,
  MoreVertical,
  PhoneCall,
  Video,
  Search,
  Filter,
  ArrowLeft,
  AlertTriangle,
  MapPin,
  FileText,
  ClipboardCheck,
  Brain
} from 'lucide-react'
import { detectLanguage, generateSMSResponse, getSupportedLanguages } from '../../utils/translationService'
import { understandMessage, generateUnderstandingResponse } from '../../utils/messageParser'

const SMSChat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedContact, setSelectedContact] = useState(null)
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Amina Hassan', phone: '+254700123456', online: true, lastSeen: 'Online', unread: 2, role: 'sender', caseId: 'TP12345678' },
    { id: 2, name: 'Peter Otieno', phone: '+254700123457', online: false, lastSeen: '2 hours ago', unread: 0, role: 'receiver', caseId: 'TP87654321' },
    { id: 3, name: 'Fadumo Ali', phone: '+254700123458', online: true, lastSeen: 'Online', unread: 1, role: 'sender', caseId: 'TP45678912' },
    { id: 4, name: 'Moses Ochieng', phone: '+254700123459', online: false, lastSeen: '1 day ago', unread: 0, role: 'receiver', caseId: 'TP34567891' },
    { id: 5, name: 'Sarah Kiprop', phone: '+254700123460', online: true, lastSeen: 'Online', unread: 3, role: 'sender', caseId: 'TP23456789' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [commandHelp, setCommandHelp] = useState(false)
  const [showUnderstanding, setShowUnderstanding] = useState(false)
  const [lastUnderstanding, setLastUnderstanding] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Mock messages data
  const messageHistory = {
    1: [
      { id: 1, sender: 'them', text: 'Habari gani? Nimepata maelezo mapya kuhusu kesi.', time: '10:30 AM', read: true, language: 'sw', type: 'report' },
      { id: 2, sender: 'me', text: 'REPORT Amina Hassan, Nairobi, Kenya, 28 years, last seen at market', time: '10:32 AM', read: true, language: 'en', type: 'report' },
      { id: 3, sender: 'them', text: '📋 Report Received: Amina Hassan\n📍 Location: Nairobi, Kenya\n👤 Age: 28\n✅ Your case ID is: TP12345678', time: '10:33 AM', read: true, language: 'sw', type: 'response' },
      { id: 4, sender: 'me', text: 'STATUS TP12345678', time: '10:35 AM', read: false, language: 'en', type: 'command' },
    ],
    2: [
      { id: 1, sender: 'them', text: 'We have located the missing person in Kisumu.', time: '9:15 AM', read: true, language: 'en', type: 'report' },
      { id: 2, sender: 'me', text: 'UPDATE TP87654321 Location: Kisumu, Found safe', time: '9:20 AM', read: true, language: 'en', type: 'update' },
      { id: 3, sender: 'them', text: '✅ Location Updated: Kisumu. Thank you for the update!', time: '9:25 AM', read: true, language: 'en', type: 'response' },
    ],
    3: [
      { id: 1, sender: 'them', text: 'Waxaan helay qof arkay wiilka lunsan.', time: '8:00 AM', read: true, language: 'so', type: 'report' },
      { id: 2, sender: 'me', text: 'REPORT Fadumo Ali, Garissa, 32 years', time: '8:05 AM', read: true, language: 'en', type: 'report' },
      { id: 3, sender: 'them', text: '📋 Warbixin La Helay: Fadumo Ali\n📍 Goobta: Garissa\n✅ Aqoonsiga kiiskaaga waa: TP45678912', time: '8:10 AM', read: true, language: 'so', type: 'response' },
    ],
    4: [
      { id: 1, sender: 'them', text: 'Nimepata maelezo mapya kuhusu kesi hiyo.', time: '7:30 AM', read: false, language: 'sw', type: 'report' },
      { id: 2, sender: 'me', text: 'HELP', time: '7:45 AM', read: true, language: 'en', type: 'command' },
      { id: 3, sender: 'them', text: '📱 SMS COMMANDS:\n• REPORT [name, location, description]\n• STATUS [CaseID]\n• UPDATE [CaseID] [details]\n• JOIN [CaseID]\n• HELP - Show this menu', time: '7:50 AM', read: true, language: 'sw', type: 'help' },
    ],
    5: [
      { id: 1, sender: 'them', text: 'We found the missing child in Eldoret.', time: '11:00 AM', read: true, language: 'en', type: 'report' },
      { id: 2, sender: 'me', text: 'JOIN TP23456789', time: '11:05 AM', read: true, language: 'en', type: 'command' },
      { id: 3, sender: 'them', text: '✅ Mshirika amejiunga na kesi.', time: '11:10 AM', read: true, language: 'sw', type: 'response' },
    ],
  }

  const [currentMessages, setCurrentMessages] = useState([])

  useEffect(() => {
    if (selectedContact) {
      setCurrentMessages(messageHistory[selectedContact.id] || [])
      setContacts(prev => prev.map(c => 
        c.id === selectedContact.id ? { ...c, unread: 0 } : c
      ))
    }
  }, [selectedContact])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentMessages])

  const getRoleColor = (role) => {
    return role === 'sender' ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' : 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30'
  }

  const getRoleIcon = (role) => {
    return role === 'sender' ? '📤' : '📥'
  }

  const getRoleLabel = (role) => {
    return role === 'sender' ? 'Sender' : 'Receiver'
  }

  const getLanguageFlag = (code) => {
    const flags = {
      sw: '🇰🇪', so: '🇸🇴', luo: '🌅', kik: '🌾', luh: '🌄',
      kam: '🏜️', kal: '⛰️', mer: '🌋', mij: '🏝️', tur: '🏜️',
      maa: '🦁', pok: '⛰️', tai: '🌿', en: '🇬🇧'
    }
    return flags[code] || '🇬🇧'
  }

  const getLanguageName = (code) => {
    const names = {
      sw: 'Kiswahili', so: 'Somali', luo: 'Dholuo', kik: 'Gikuyu', luh: 'Luhya',
      kam: 'Kamba', kal: 'Kalenjin', mer: 'Meru', mij: 'Mijikenda', tur: 'Turkana',
      maa: 'Maasai', pok: 'Pokot', tai: 'Taita', en: 'English'
    }
    return names[code] || 'English'
  }

  const getMessageTypeIcon = (type) => {
    switch(type) {
      case 'report': return '📋'
      case 'update': return '📝'
      case 'response': return '✅'
      case 'command': return '⌨️'
      case 'help': return '📖'
      default: return '💬'
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return

    const detectedLang = detectLanguage(newMessage)
    
    // Understand the message
    const understanding = understandMessage(newMessage, detectedLang)
    setLastUnderstanding(understanding)
    
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      language: detectedLang,
      type: understanding.isCommand ? 'command' : 'report',
      understanding: understanding
    }

    setCurrentMessages(prev => [...prev, newMsg])
    setNewMessage('')

    // Generate response based on understanding
    setTimeout(() => {
      let response = ''
      let responseType = 'response'
      
      // Generate the appropriate response
      const caseId = 'TP' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(2, 5).toUpperCase()
      
      // Use the understanding to generate response
      const responseData = {
        caseId: caseId,
        status: 'Active - Under Investigation',
        location: understanding.extractedInfo.location || 'Not specified',
        lastUpdate: 'Today',
        collaborators: 'None'
      }
      
      response = generateUnderstandingResponse(understanding, responseData)
      
      // Override for specific intents
      if (understanding.intent === 'emergency') {
        responseType = 'emergency'
      } else if (understanding.intent === 'help') {
        responseType = 'help'
      } else if (understanding.intent === 'report') {
        responseType = 'response'
      }

      const reply = {
        id: Date.now() + 1,
        sender: 'them',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        language: detectedLang,
        type: responseType,
        understanding: understanding
      }

      setCurrentMessages(prev => [...prev, reply])
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.phone.includes(searchTerm) ||
                          (contact.caseId && contact.caseId.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = filterRole === 'all' || contact.role === filterRole
    return matchesSearch && matchesFilter
  })

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Brain size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">🧠 AI Message Understanding</h2>
              <p className="text-white/80 text-xs">Automatically understands user messages in all languages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
              <WifiOff size={12} />
              Offline
            </span>
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
              <Globe size={12} />
              14 Languages
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Contacts Sidebar */}
        <div className={`${selectedContact ? 'hidden md:block' : 'block'} w-full md:w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative mb-2">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or Case ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setFilterRole('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterRole === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterRole('sender')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterRole === 'sender'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                📤 Senders
              </button>
              <button
                onClick={() => setFilterRole('receiver')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterRole === 'receiver'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                📥 Receivers
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all ${
                  selectedContact?.id === contact.id ? 'bg-primary-50 dark:bg-primary-950/20 border-l-4 border-primary-500' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    contact.online ? 'bg-gradient-to-br from-primary-500 to-secondary-500' : 'bg-gray-400'
                  }`}>
                    {contact.name.charAt(0)}
                  </div>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{contact.name}</p>
                    {contact.unread > 0 && (
                      <span className="px-1.5 py-0.5 bg-primary-500 text-white text-xs rounded-full">{contact.unread}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getRoleColor(contact.role)}`}>
                      {getRoleIcon(contact.role)} {getRoleLabel(contact.role)}
                    </span>
                    {contact.caseId && (
                      <span className="text-[10px] text-primary-500 font-mono">{contact.caseId}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{contact.online ? '🟢 Online' : `Last seen ${contact.lastSeen}`}</p>
                </div>
              </div>
            ))}
            {filteredContacts.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Users size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No contacts found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedContact ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
          {selectedContact ? (
            <>
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedContact(null)} className="md:hidden p-1 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft size={20} className="text-gray-600" />
                  </button>
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      selectedContact.online ? 'bg-gradient-to-br from-primary-500 to-secondary-500' : 'bg-gray-400'
                    }`}>
                      {selectedContact.name.charAt(0)}
                    </div>
                    {selectedContact.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{selectedContact.name}</p>
                    <p className="text-xs text-gray-400">{selectedContact.online ? '🟢 Online' : `Last seen ${selectedContact.lastSeen}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs px-2 py-1 rounded ${getRoleColor(selectedContact.role)}`}>
                    {getRoleIcon(selectedContact.role)} {getRoleLabel(selectedContact.role)}
                  </span>
                  {selectedContact.caseId && (
                    <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded font-mono">
                      📋 {selectedContact.caseId}
                    </span>
                  )}
                  <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" onClick={() => setShowUnderstanding(!showUnderstanding)}>
                    <Brain size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Understanding Panel */}
              {showUnderstanding && lastUnderstanding && (
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border-b border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2">
                    <Brain size={14} className="text-purple-600" />
                    <span className="text-xs font-medium text-purple-700 dark:text-purple-400">Understanding:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Intent: <strong className="text-purple-600">{lastUnderstanding.intent}</strong></span>
                    <span className="text-gray-600 dark:text-gray-400">Confidence: <strong className="text-purple-600">{lastUnderstanding.confidence}%</strong></span>
                    {lastUnderstanding.extractedInfo.name && (
                      <span className="text-gray-600 dark:text-gray-400">Name: <strong>{lastUnderstanding.extractedInfo.name}</strong></span>
                    )}
                    {lastUnderstanding.extractedInfo.location && (
                      <span className="text-gray-600 dark:text-gray-400">Location: <strong>{lastUnderstanding.extractedInfo.location}</strong></span>
                    )}
                    {lastUnderstanding.extractedInfo.age && (
                      <span className="text-gray-600 dark:text-gray-400">Age: <strong>{lastUnderstanding.extractedInfo.age}</strong></span>
                    )}
                    {lastUnderstanding.extractedInfo.caseId && (
                      <span className="text-gray-600 dark:text-gray-400">Case ID: <strong className="font-mono">{lastUnderstanding.extractedInfo.caseId}</strong></span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950/50">
                {currentMessages.map((msg, index) => (
                  <div key={index}>
                    <div className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl p-3 ${
                        msg.sender === 'me' 
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25' 
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                      }`}>
                        <div className="flex items-center gap-1 mb-1 flex-wrap">
                          <span className="text-[10px] opacity-70">
                            {msg.sender === 'me' ? '👤 You' : `📱 ${selectedContact.name}`}
                          </span>
                          {msg.type && (
                            <span className="text-[10px] opacity-50">{getMessageTypeIcon(msg.type)}</span>
                          )}
                          <span className="text-[10px] opacity-50">
                            {getLanguageFlag(msg.language || 'en')} {getLanguageName(msg.language || 'en')}
                          </span>
                          {msg.understanding && msg.understanding.isCommand && (
                            <span className="text-[10px] bg-purple-200 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-1 rounded">🧠</span>
                          )}
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        <div className={`flex items-center gap-1 mt-1 ${
                          msg.sender === 'me' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          <span className="text-[10px]">{msg.time}</span>
                          {msg.sender === 'me' && (
                            msg.read ? <CheckCircle size={12} className="text-emerald-400" /> : <span className="text-[10px]">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <Smartphone size={18} className="text-gray-500" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={`Send SMS to ${selectedContact.name}... (AI will understand your language)`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                      newMessage.trim() 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={16} />
                    Send
                  </button>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>📱 SMS/USSD • No internet needed</span>
                  <span>🧠 AI understands all languages</span>
                  <span>📋 Use: REPORT, STATUS, UPDATE, JOIN, HELP</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🧠</div>
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">AI will understand messages in any Kenyan language</p>
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">📤 Senders</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">📥 Receivers</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🧠 AI Understanding</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🌍 14 Languages</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-[10px] text-gray-500 flex-wrap">
        <div className="flex items-center gap-4">
          <span>📱 SMS: +254700123456</span>
          <span>📞 USSD: *384#1234#</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            {contacts.filter(c => c.online).length} Online
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {contacts.length} Contacts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-purple-500">🧠 AI Understanding Active</span>
        </div>
      </div>
    </div>
  )
}

export default SMSChat
