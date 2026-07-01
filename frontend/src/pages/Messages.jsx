import React, { useState, useEffect, useRef } from 'react'
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react'
import { detectLanguage, getLanguageInfo, getSupportedLanguages } from '../utils/translationService'

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showTranslation, setShowTranslation] = useState(false)
  const messagesEndRef = useRef(null)

  const conversations = [
    {
      id: 1,
      name: 'Amina Hassan',
      lastMessage: 'Habari gani? Nimepata maelezo mapya.',
      time: '2 min ago',
      unread: true,
      online: true,
      language: 'sw',
      messages: [
        { id: 1, sender: 'them', text: 'Habari gani? Nimepata maelezo mapya kuhusu kesi.', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Tafadhali tuma maelezo.', time: '10:32 AM' },
        { id: 3, sender: 'them', text: 'Nimeona mtu aliyepotea pale Nairobi.', time: '10:33 AM' },
      ]
    },
    {
      id: 2,
      name: 'Peter Otieno',
      lastMessage: 'We have located the missing person.',
      time: '1 hour ago',
      unread: false,
      online: true,
      language: 'en',
      messages: [
        { id: 1, sender: 'them', text: 'We have located the missing person in Kisumu.', time: '9:15 AM' },
        { id: 2, sender: 'me', text: 'Please share location details.', time: '9:20 AM' },
      ]
    },
    {
      id: 3,
      name: 'Fadumo Ali',
      lastMessage: 'Waxaan helay qof arkay wiilka lunsan.',
      time: '3 hours ago',
      unread: false,
      online: false,
      language: 'so',
      messages: [
        { id: 1, sender: 'them', text: 'Waxaan helay qof arkay wiilka lunsan.', time: '8:00 AM' },
        { id: 2, sender: 'me', text: 'Xagee lagu arkay?', time: '8:05 AM' },
      ]
    },
    {
      id: 4,
      name: 'Moses Ochieng',
      lastMessage: 'Nimepata maelezo mapya kuhusu kesi.',
      time: '5 hours ago',
      unread: true,
      online: false,
      language: 'luo',
      messages: [
        { id: 1, sender: 'them', text: 'Nimepata maelezo mapya kuhusu kesi hiyo.', time: '7:30 AM' },
      ]
    },
    {
      id: 5,
      name: 'Sarah Kiprop',
      lastMessage: 'Chamgei! Engo?',
      time: '2 hours ago',
      unread: false,
      online: true,
      language: 'kal',
      messages: [
        { id: 1, sender: 'them', text: 'Chamgei! Engo?', time: '11:00 AM' },
        { id: 2, sender: 'me', text: 'Agoi! Engo?', time: '11:05 AM' },
      ]
    }
  ]

  const [currentMessages, setCurrentMessages] = useState([])

  useEffect(() => {
    if (selectedChat) {
      setCurrentMessages(selectedChat.messages || [])
    }
  }, [selectedChat])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentMessages])

  const handleSend = () => {
    if (!message.trim() || !selectedChat) return

    const lang = detectLanguage(message)
    const englishTranslation = message

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      original: message,
      english: englishTranslation,
      language: lang,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTranslated: lang !== 'en'
    }

    setCurrentMessages(prev => [...prev, newMsg])
    setMessage('')

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'them',
        original: 'Report received. Case ID: TP' + Date.now().toString().slice(-8),
        english: 'Report received. Case ID: TP' + Date.now().toString().slice(-8),
        language: selectedChat.language,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTranslated: true
      }
      setCurrentMessages(prev => [...prev, reply])
    }, 1500)
  }

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getLanguageInfo(c.language)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const allLanguages = getSupportedLanguages()

  return (
    <div className="p-6 h-[calc(100vh-120px)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
            <span className="text-green-600">●</span> Auto-translation active
          </p>
        </div>
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 rounded-lg text-sm hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors"
        >
          <span className="text-green-600">🌍</span>
          {showTranslation ? 'Hide Translation' : 'Show Translation'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Conversations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden lg:col-span-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`flex items-center gap-3 p-4 hover:bg-green-50 dark:hover:bg-green-950/10 cursor-pointer transition-all ${
                  selectedChat?.id === conv.id ? 'bg-green-50 dark:bg-green-950/20 border-l-4 border-green-600' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    conv.online ? 'bg-green-600' : 'bg-gray-400'
                  }`}>
                    {conv.name.charAt(0)}
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{conv.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{conv.time}</p>
                  </div>
                  <p className={`text-sm truncate ${conv.unread ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                    {conv.lastMessage}
                  </p>
                  <div className="text-xs text-gray-400 mt-0.5">
                    <span className="text-green-600">{getLanguageInfo(conv.language)?.name}</span>
                  </div>
                </div>
                {conv.unread && (
                  <div className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  selectedChat.online ? 'bg-green-600' : 'bg-gray-400'
                }`}>
                  {selectedChat.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedChat.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-green-600">{getLanguageInfo(selectedChat.language)?.name}</span>
                    <span className="text-green-600">●</span>
                    <span className="text-green-600">Auto-translate</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
                {currentMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3 ${
                      msg.sender === 'me' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    }`}>
                      {msg.isTranslated && (
                        <div className="text-[10px] opacity-70 mb-1 flex items-center gap-1">
                          <span className="text-green-300">🌍</span>
                          <span>{getLanguageInfo(msg.language)?.name}</span>
                        </div>
                      )}
                      <p className="text-sm">{msg.original}</p>
                      {showTranslation && msg.isTranslated && msg.english && (
                        <div className="mt-1 pt-1 border-t border-white/20 dark:border-gray-600/30 text-[10px] text-gray-300 dark:text-gray-400">
                          📖 {msg.english}
                        </div>
                      )}
                      <span className={`text-[10px] mt-1 block ${msg.sender === 'me' ? 'text-green-200' : 'text-gray-500 dark:text-gray-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-green-50 dark:hover:bg-green-950/10 rounded-lg transition-colors">
                    <Paperclip size={18} className="text-gray-500" />
                  </button>
                  <input
                    type="text"
                    placeholder={`Type message...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="p-2 hover:bg-green-50 dark:hover:bg-green-950/10 rounded-lg transition-colors">
                    <Smile size={18} className="text-gray-500" />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className={`px-5 py-2.5 rounded-lg ${
                      message.trim() ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="text-xs text-gray-400 mt-1.5">
                  <span className="text-green-600">🌍</span> Auto-translate: {getLanguageInfo(selectedChat.language)?.name} ↔ English
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm text-gray-500">All Kenyan languages supported</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
