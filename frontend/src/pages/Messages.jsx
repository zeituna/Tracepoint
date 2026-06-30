import React, { useState, useEffect, useRef } from 'react'
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  User, 
  Clock,
  Check,
  CheckCheck,
  Image,
  Smile,
  Mic,
  X,
  Users,
  Languages
} from 'lucide-react'

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showLanguageFilter, setShowLanguageFilter] = useState(false)
  const [filterLanguage, setFilterLanguage] = useState('all')
  const messagesEndRef = useRef(null)

  // All Kenyan languages and their greetings
  const kenyanLanguages = {
    'English': { flag: '🇬🇧', greeting: 'Hello', region: 'National' },
    'Swahili': { flag: '🇰🇪', greeting: 'Habari', region: 'Coastal & National' },
    'Sheng': { flag: '🏙️', greeting: 'Sasa', region: 'Urban (Nairobi)' },
    'Somali': { flag: '🇸🇴', greeting: 'Iska warran', region: 'North Eastern' },
    'Kikuyu': { flag: '🌾', greeting: 'Wĩ Mwega', region: 'Central' },
    'Luo': { flag: '🌅', greeting: 'Ber', region: 'Nyanza (Kisumu)' },
    'Luhya': { flag: '🌄', greeting: 'Mulembe', region: 'Western' },
    'Kamba': { flag: '🏜️', greeting: 'Atĩa', region: 'Eastern' },
    'Kalenjin': { flag: '⛰️', greeting: 'Chamgei', region: 'Rift Valley' },
    'Meru': { flag: '🌋', greeting: 'Mũga', region: 'Eastern (Meru)' },
    'Mijikenda': { flag: '🏝️', greeting: 'Karibu', region: 'Coastal' },
    'Turkana': { flag: '🏜️', greeting: 'Aka', region: 'North Western' },
    'Maasai': { flag: '🦁', greeting: 'Supa', region: 'Rift Valley (Maasai Mara)' },
    'Pokot': { flag: '⛰️', greeting: 'Kwe', region: 'North Rift' },
    'Taita': { flag: '🌿', greeting: 'Hola', region: 'Coastal (Taita-Taveta)' },
  }

  // Conversations with all Kenyan languages
  const conversations = [
    { 
      id: 1, 
      name: 'Amina Hassan', 
      lastMessage: 'Habari gani?', 
      time: '2 min ago', 
      unread: true, 
      online: true,
      avatar: 'A',
      language: 'Swahili',
      region: 'Coastal',
      lastSeen: 'Online',
      messages: [
        { id: 1, sender: 'them', text: 'Habari gani?', time: '10:30 AM', read: true },
        { id: 2, sender: 'me', text: 'Nzuri, asante! Na wewe?', time: '10:32 AM', read: true },
        { id: 3, sender: 'them', text: 'Mambo vipi?', time: '10:33 AM', read: true },
        { id: 4, sender: 'me', text: 'Poa sana!', time: '10:35 AM', read: false },
      ]
    },
    { 
      id: 2, 
      name: 'Peter Otieno', 
      lastMessage: 'Ber? Any news?', 
      time: '1 hour ago', 
      unread: false, 
      online: true,
      avatar: 'P',
      language: 'Luo',
      region: 'Nyanza',
      lastSeen: 'Online',
      messages: [
        { id: 1, sender: 'them', text: 'Ber? Any news?', time: '9:15 AM', read: true },
        { id: 2, sender: 'me', text: 'Yes, we have progress.', time: '9:20 AM', read: true },
        { id: 3, sender: 'them', text: 'Ero kamano! (Thank you!)', time: '9:25 AM', read: true },
      ]
    },
    { 
      id: 3, 
      name: 'Fadumo Ali', 
      lastMessage: 'Iska warran? Wax cusub ma jiraan?', 
      time: '3 hours ago', 
      unread: false, 
      online: false,
      avatar: 'F',
      language: 'Somali',
      region: 'North Eastern',
      lastSeen: '3 hours ago',
      messages: [
        { id: 1, sender: 'them', text: 'Iska warran? Wax cusub ma jiraan?', time: '8:00 AM', read: true },
        { id: 2, sender: 'me', text: 'Waan ka shaqaynaynaa si degdeg ah.', time: '8:05 AM', read: true },
        { id: 3, sender: 'them', text: 'Mahadsanid.', time: '8:10 AM', read: true },
      ]
    },
    { 
      id: 4, 
      name: 'Moses Ochieng', 
      lastMessage: 'Sasa! Umeamka?', 
      time: '5 hours ago', 
      unread: true, 
      online: false,
      avatar: 'M',
      language: 'Sheng',
      region: 'Urban (Nairobi)',
      lastSeen: '2 hours ago',
      messages: [
        { id: 1, sender: 'them', text: 'Sasa! Umeamka?', time: '7:30 AM', read: false },
        { id: 2, sender: 'me', text: 'Niko tu, niaje?', time: '7:45 AM', read: true },
      ]
    },
    { 
      id: 5, 
      name: 'James Mwangi', 
      lastMessage: 'Wĩ Mwega? Nĩ kĩ?', 
      time: '1 day ago', 
      unread: false, 
      online: false,
      avatar: 'J',
      language: 'Kikuyu',
      region: 'Central',
      lastSeen: 'Yesterday',
      messages: [
        { id: 1, sender: 'them', text: 'Wĩ Mwega? Nĩ kĩ?', time: 'Yesterday', read: true },
        { id: 2, sender: 'me', text: 'Nĩ mwega, nĩ wega?', time: 'Yesterday', read: true },
        { id: 3, sender: 'them', text: 'Nĩ wega. Nĩ ndatiga.', time: 'Yesterday', read: true },
      ]
    },
    { 
      id: 6, 
      name: 'Sarah Kiprop', 
      lastMessage: 'Chamgei! Engo?', 
      time: '2 hours ago', 
      unread: false, 
      online: true,
      avatar: 'S',
      language: 'Kalenjin',
      region: 'Rift Valley',
      lastSeen: 'Online',
      messages: [
        { id: 1, sender: 'them', text: 'Chamgei! Engo?', time: '11:00 AM', read: true },
        { id: 2, sender: 'me', text: 'Agoi! Engo?', time: '11:05 AM', read: true },
      ]
    },
    { 
      id: 7, 
      name: 'Halima Osman', 
      lastMessage: 'Hola! Habari?', 
      time: '4 hours ago', 
      unread: true, 
      online: false,
      avatar: 'H',
      language: 'Taita',
      region: 'Coastal (Taita-Taveta)',
      lastSeen: '3 hours ago',
      messages: [
        { id: 1, sender: 'them', text: 'Hola! Habari?', time: '10:00 AM', read: false },
      ]
    },
    { 
      id: 8, 
      name: 'Jackson Luhya', 
      lastMessage: 'Mulembe! Muno?', 
      time: '6 hours ago', 
      unread: false, 
      online: false,
      avatar: 'J',
      language: 'Luhya',
      region: 'Western',
      lastSeen: '5 hours ago',
      messages: [
        { id: 1, sender: 'them', text: 'Mulembe! Muno?', time: '9:00 AM', read: true },
        { id: 2, sender: 'me', text: 'Muno! Ni mulembe?', time: '9:15 AM', read: true },
      ]
    },
    { 
      id: 9, 
      name: 'David Kilonzo', 
      lastMessage: 'Atĩa? Mũno?', 
      time: '7 hours ago', 
      unread: false, 
      online: false,
      avatar: 'D',
      language: 'Kamba',
      region: 'Eastern',
      lastSeen: '6 hours ago',
      messages: [
        { id: 1, sender: 'them', text: 'Atĩa? Mũno?', time: '8:00 AM', read: true },
        { id: 2, sender: 'me', text: 'Nĩ we! Atĩa?', time: '8:10 AM', read: true },
      ]
    },
    { 
      id: 10, 
      name: 'Grace Maasai', 
      lastMessage: 'Supa! Endaa?', 
      time: '8 hours ago', 
      unread: false, 
      online: false,
      avatar: 'G',
      language: 'Maasai',
      region: 'Rift Valley (Maasai Mara)',
      lastSeen: '7 hours ago',
      messages: [
        { id: 1, sender: 'them', text: 'Supa! Endaa?', time: '7:00 AM', read: true },
        { id: 2, sender: 'me', text: 'Endaa! Supa?', time: '7:15 AM', read: true },
      ]
    },
    { 
      id: 11, 
      name: 'Mohamed Ahmed', 
      lastMessage: 'Waxaan haystaa macluumaad cusub', 
      time: '9 hours ago', 
      unread: true, 
      online: false,
      avatar: 'M',
      language: 'Somali',
      region: 'North Eastern',
      lastSeen: '8 hours ago',
      messages: [
        { id: 1, sender: 'them', text: 'Waxaan haystaa macluumaad cusub', time: '6:30 AM', read: false },
      ]
    },
    { 
      id: 12, 
      name: 'Jane Muthoni', 
      lastMessage: 'Mũga? Nĩ wega?', 
      time: '10 hours ago', 
      unread: false, 
      online: false,
      avatar: 'J',
      language: 'Meru',
      region: 'Eastern (Meru)',
      lastSeen: '9 hours ago',
      messages: [
        { id: 1, sender: 'them', text: 'Mũga? Nĩ wega?', time: '6:00 AM', read: true },
      ]
    },
  ]

  const [chatMessages, setChatMessages] = useState(conversations)
  const [currentMessages, setCurrentMessages] = useState([])

  useEffect(() => {
    if (selectedChat) {
      const chat = chatMessages.find(c => c.id === selectedChat.id)
      if (chat) {
        setCurrentMessages(chat.messages || [])
        chat.unread = false
      }
    }
  }, [selectedChat, chatMessages])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentMessages])

  const getReplyMessage = (language) => {
    const replies = {
      'English': [
        'Sure, I will let you know.',
        'Thank you very much!',
        'How are you today?',
        'Great, how about you?',
        'Good, thank you!',
        'I am not sure, but I will ask.',
        'It is okay, no problem.',
        'We will meet tomorrow.',
      ],
      'Swahili': [
        'Sawa, nitakuambia baadaye.',
        'Asante sana!',
        'Habari za leo?',
        'Poa, mambo vipi?',
        'Nzuri, asante!',
        'Sijui, lakini nitauliza.',
        'Ni sawa, hakuna shida.',
        'Tutaonana kesho.',
      ],
      'Somali': [
        'Mahadsanid, waan fiirin doonaa.',
        'Waan kuu soo gudbin doonaa goor dhow.',
        'Taasi waa war wanaagsan.',
        'Waan ka shaqaynaynaa si degdeg ah.',
        'Waan kuu sheegi doonaa marka aan helno wax cusub.',
        'Waa hagaag, waan arkay.',
        'Xaaladda waa fiican tahay.',
        'Waan kuu soo gudbin doonaa.',
      ],
      'Sheng': [
        'Sasa! Fit tu niaje?',
        'Poa, unaeza niupdate baadaye.',
        'Fit, sawa kabisa!',
        'Nishasema, nitakuambia.',
        'Sawa, niko tu.',
        'Unaeza niita baadaye?',
        'Fit, see you then.',
        'Sijui, lakini nitauliza.',
      ],
      'Kikuyu': [
        'Nĩ wega. Nĩ ndatiga.',
        'Nĩ mwega, nĩ wega?',
        'Nĩ wega. Tũonanĩ rũciũ.',
        'Nĩ ndakũmenya. Nĩ ngũũria.',
        'Nĩ wega mũno!',
        'Nĩ kwagĩra, no nĩ ndakũmenya.',
        'Nĩ wega, tũonanĩ.',
      ],
      'Luo': [
        'Ero kamano!',
        'Ber, in bende?',
        'Ber maber!',
        'Ok angʼeyo, to abiro penjo.',
        'Ber, wanere kiny.',
        'Ero, abiro nyisi.',
      ],
      'Luhya': [
        'Mulembe! Muno?',
        'Muno, asante!',
        'Sawa, ndikhulanga.',
        'Sindimanya, ndireeba.',
        'Mulembe, khulolekho.',
      ],
      'Kamba': [
        'Nĩ we! Atĩa?',
        'Nĩ wega, asante!',
        'Sawa, nĩngũkũwĩa.',
        'Nĩndamanya, nĩngũũria.',
        'Nĩ wega, tũonanĩ.',
      ],
      'Kalenjin': [
        'Agoi! Engo?',
        'Agoi, asante!',
        'Sawa, akwai.',
        'Akwai, kamuk.',
        'Agoi, koreto.',
      ],
      'Meru': [
        'Nĩ wega, nĩ wega?',
        'Nĩ wega mũno!',
        'Sawa, nĩngũkũwĩa.',
        'Nĩndamanya, nĩngũũria.',
      ],
      'Mijikenda': [
        'Karibu! Habari?',
        'Nzuri, asante!',
        'Sawa, nitaambia.',
        'Sijui, nitauliza.',
      ],
      'Turkana': [
        'Aka! Engo?',
        'Agoi, asante!',
        'Sawa, akwai.',
        'Akwai, koreto.',
      ],
      'Maasai': [
        'Endaa! Supa?',
        'Supa, asante!',
        'Sawa, akwai.',
        'Akwai, koreto.',
      ],
      'Pokot': [
        'Kwe! Engo?',
        'Agoi, asante!',
        'Sawa, akwai.',
        'Akwai, koreto.',
      ],
      'Taita': [
        'Hola! Habari?',
        'Nzuri, asante!',
        'Sawa, nitaambia.',
        'Sijui, nitauliza.',
      ]
    }
    const langReplies = replies[language] || replies['English']
    return langReplies[Math.floor(Math.random() * langReplies.length)]
  }

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    }

    setCurrentMessages(prev => [...prev, newMessage])

    const updatedChats = chatMessages.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...(chat.messages || []), newMessage],
          lastMessage: message,
          time: 'Just now'
        }
      }
      return chat
    })
    setChatMessages(updatedChats)
    setMessage('')

    setTimeout(() => {
      const replyText = getReplyMessage(selectedChat.language)
      
      const replyMessage = {
        id: Date.now() + 1,
        sender: 'them',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      }

      setCurrentMessages(prev => [...prev, replyMessage])

      const updatedChatsWithReply = chatMessages.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...(chat.messages || []), replyMessage],
            lastMessage: replyMessage.text,
            time: 'Just now'
          }
        }
        return chat
      })
      setChatMessages(updatedChatsWithReply)
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getLanguageBadgeColor = (language) => {
    const colors = {
      'English': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      'Swahili': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      'Somali': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Sheng': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'Kikuyu': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Luo': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      'Luhya': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Kamba': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
      'Kalenjin': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      'Meru': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
      'Mijikenda': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
      'Turkana': 'bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-400',
      'Maasai': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      'Pokot': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
      'Taita': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
    }
    return colors[language] || colors['English']
  }

  const filteredConversations = chatMessages.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conv.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conv.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLanguage = filterLanguage === 'all' || conv.language === filterLanguage
    return matchesSearch && matchesLanguage
  })

  // Get unique languages for filter
  const uniqueLanguages = ['all', ...new Set(chatMessages.map(c => c.language))]

  return (
    <div className="p-6 h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Chat in Kenya's diverse languages</p>
        </div>
        <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25 flex items-center gap-2">
          <span>✏️</span>
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Conversations List */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden lg:col-span-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 space-y-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, language, or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setFilterLanguage('all')}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  filterLanguage === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                🌍 All
              </button>
              {uniqueLanguages.filter(l => l !== 'all').slice(0, 6).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterLanguage(lang)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    filterLanguage === lang
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {kenyanLanguages[lang]?.flag || '🏳️'} {lang}
                </button>
              ))}
              {uniqueLanguages.filter(l => l !== 'all').length > 6 && (
                <button className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  +{uniqueLanguages.filter(l => l !== 'all').length - 6}
                </button>
              )}
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all ${
                  selectedChat?.id === conv.id ? 'bg-primary-50 dark:bg-primary-950/20 border-l-4 border-primary-500' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    conv.online ? 'bg-gradient-to-br from-primary-500 to-secondary-500' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white truncate">{conv.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getLanguageBadgeColor(conv.language)}`}>
                        {kenyanLanguages[conv.language]?.flag || '🏳️'} {conv.language}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">• {conv.region}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{conv.time}</p>
                  </div>
                  <p className={`text-sm truncate mt-1 ${conv.unread ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500 flex-shrink-0"></div>
                )}
              </div>
            ))}
            {filteredConversations.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Languages size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No conversations found</p>
                <p className="text-xs">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      selectedChat.online ? 'bg-gradient-to-br from-primary-500 to-secondary-500' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    }`}>
                      {selectedChat.avatar}
                    </div>
                    {selectedChat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedChat.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedChat.online ? '🟢 Online' : 'Last seen ' + selectedChat.lastSeen}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getLanguageBadgeColor(selectedChat.language)}`}>
                        {kenyanLanguages[selectedChat.language]?.flag || '🏳️'} {selectedChat.language}
                      </span>
                      <span className="text-xs text-gray-400">• {selectedChat.region}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <Phone size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <Video size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <MoreVertical size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950/50">
                <div className="text-center text-xs text-gray-400 mb-4">
                  💬 Chatting in <span className="font-semibold">{selectedChat.language}</span>
                </div>
                {currentMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-3 ${
                      msg.sender === 'me' 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-1 ${
                        msg.sender === 'me' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        <span className="text-xs">{msg.time}</span>
                        {msg.sender === 'me' && (
                          msg.read ? <CheckCheck size={14} className="text-emerald-400" /> : <Check size={14} />
                        )}
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

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <Paperclip size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <Image size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <input
                    type="text"
                    placeholder={`Type a message in ${selectedChat.language}...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <Smile size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                      message.trim() 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={18} />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">Chat in Kenya's diverse languages</p>
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🇬🇧 English</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🇰🇪 Swahili</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🏙️ Sheng</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🌾 Kikuyu</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🌅 Luo</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🌄 Luhya</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🏜️ Kamba</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">⛰️ Kalenjin</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🇸🇴 Somali</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">🦁 Maasai</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
