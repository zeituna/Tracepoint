import React, { useState, useEffect } from 'react'
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
  Globe,
  Reply,
  MessageCircle,
  Languages,
  UserPlus,
  UserCheck,
  Link,
  Share2
} from 'lucide-react'

const SMSCollaboration = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    age: '',
    description: '',
    contact: '',
    relationship: '',
    lastSeen: '',
    language: 'en',
    caseId: ''
  })
  const [smsMessage, setSmsMessage] = useState('')
  const [ussdCode, setUssdCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('sms')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [collaborators, setCollaborators] = useState([])
  const [caseId, setCaseId] = useState('')
  const [showCollaborate, setShowCollaborate] = useState(false)

  // Generate case ID
  useEffect(() => {
    if (submitted && !caseId) {
      const newCaseId = 'TP' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(2, 5).toUpperCase()
      setCaseId(newCaseId)
    }
  }, [submitted])

  // All Kenyan languages with their translations
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', region: 'National' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪', region: 'Coastal & National' },
    { code: 'so', name: 'Somali', flag: '🇸🇴', region: 'North Eastern' },
    { code: 'luo', name: 'Dholuo', flag: '🌅', region: 'Nyanza (Kisumu)' },
    { code: 'kik', name: 'Gikuyu', flag: '🌾', region: 'Central' },
    { code: 'luh', name: 'Luhya', flag: '🌄', region: 'Western' },
    { code: 'kam', name: 'Kamba', flag: '🏜️', region: 'Eastern' },
    { code: 'kal', name: 'Kalenjin', flag: '⛰️', region: 'Rift Valley' },
    { code: 'mer', name: 'Meru', flag: '🌋', region: 'Eastern (Meru)' },
    { code: 'mij', name: 'Mijikenda', flag: '🏝️', region: 'Coastal' },
    { code: 'tur', name: 'Turkana', flag: '🏜️', region: 'North Western' },
    { code: 'maa', name: 'Maasai', flag: '🦁', region: 'Rift Valley' },
    { code: 'pok', name: 'Pokot', flag: '⛰️', region: 'North Rift' },
    { code: 'tai', name: 'Taita', flag: '🌿', region: 'Coastal' },
  ]

  // Translations for all Kenyan languages
  const translations = {
    en: {
      title: 'SMS/USSD Collaboration System',
      subtitle: 'Report, collaborate, and track cases via SMS - No internet needed',
      name: 'Full Name of Missing Person *',
      location: 'Last Known Location *',
      age: 'Age',
      lastSeen: 'Last Seen',
      description: 'Description (appearance, clothing, etc.)',
      contact: 'Your Contact Number *',
      relationship: 'Relationship to Missing Person',
      generate: 'Generate Report',
      success: 'Report Generated Successfully',
      copy: 'Copy SMS',
      send: 'Send SMS',
      newReport: '+ Create New Report',
      ussdTitle: 'USSD Reporting',
      ussdCode: '*384#1234#',
      howToUse: 'How to Use USSD',
      step1: 'Dial *384#1234# on your phone',
      step2: 'Follow the on-screen prompts',
      step3: 'Enter the missing person details',
      step4: 'Submit your report',
      step5: 'You will receive a confirmation SMS',
      guideTitle: '📖 SMS Collaboration Guide',
      guide1: 'Send SMS to +254700123456 with case details',
      guide2: 'Include case ID to collaborate: e.g., "TP12345678 CASE UPDATE"',
      guide3: 'Reply with "STATUS" to get updates',
      guide4: 'Reply with "HELP" for assistance',
      guide5: 'Share case ID with others to collaborate',
      emergency: '🚨 Emergency: Call 999 or 112 immediately',
      smsNumber: '📱 SMS Number: +254700123456',
      freeService: '✅ Free Service: USSD reporting is free on all networks',
      worksAllNetworks: '📶 Works on all Kenyan networks',
      reply: 'Reply to this message',
      response: 'Response',
      sendResponse: 'Send Response',
      placeholder: 'Type your response...',
      relationships: ['Select relationship', 'Family Member', 'Friend', 'Neighbor', 'Colleague', 'Witness', 'Other'],
      reportDetails: '📋 Report Details',
      ourTeam: 'Our team will review your report',
      updates: 'Updates will be sent to you via SMS',
      trackId: 'Track your case with ID',
      caseId: 'Case ID',
      collaborate: 'Collaborate with others',
      addCollaborator: 'Add Collaborator',
      collaboratorPhone: 'Collaborator Phone Number',
      shareCase: 'Share Case ID',
      shareViaSMS: 'Share via SMS',
      copyCaseId: 'Copy Case ID',
      howToCollaborate: '🤝 How to Collaborate via SMS',
      step6: 'Share your Case ID with others',
      step7: 'They can reply with the Case ID to join',
      step8: 'All updates are sent to everyone in the group',
      step9: 'You can add up to 10 collaborators per case',
      collaborators: 'Collaborators',
      noCollaborators: 'No collaborators added yet',
      add: 'Add',
      remove: 'Remove',
      smsHelp: '📱 SMS Commands',
      help1: 'REPORT [details] - Submit a new report',
      help2: 'UPDATE [caseID] [details] - Update an existing case',
      help3: 'STATUS [caseID] - Check case status',
      help4: 'HELP - Get assistance',
      help5: 'JOIN [caseID] - Join a case as collaborator',
    },
    sw: {
      title: 'Mfumo wa Ushirikiano wa SMS/USSD',
      subtitle: 'Ripoti, shirikiana, na fuatilia kesi kwa SMS - Hakuna mtandao',
      name: 'Jina Kamili la Mtu Aliyepotea *',
      location: 'Mahali pa Mwisho Kujulikana *',
      age: 'Umri',
      lastSeen: 'Kuonekana Mara ya Mwisho',
      description: 'Maelezo (sura, mavazi, n.k.)',
      contact: 'Nambari yako ya Mawasiliano *',
      relationship: 'Uhusiano na Mtu Aliyepotea',
      generate: 'Tengeneza Ripoti',
      success: 'Ripoti Imetengenezwa',
      copy: 'Nakili SMS',
      send: 'Tuma SMS',
      newReport: '+ Ripoti Mpya',
      ussdTitle: 'Kuripoti kwa USSD',
      ussdCode: '*384#1234#',
      howToUse: 'Jinsi ya Kutumia USSD',
      step1: 'Piga *384#1234# kwenye simu yako',
      step2: 'Fuata maagizo yanayoonekana',
      step3: 'Weka maelezo ya mtu aliyepotea',
      step4: 'Wasilisha ripoti yako',
      step5: 'Utapata SMS ya uthibitisho',
      guideTitle: '📖 Mwongozo wa Ushirikiano wa SMS',
      guide1: 'Tuma SMS kwa +254700123456 na maelezo ya kesi',
      guide2: 'Weka ID ya kesi kushirikiana: e.g., "TP12345678 CASE UPDATE"',
      guide3: 'Jibu kwa "STATUS" kupata maelezo',
      guide4: 'Jibu kwa "HELP" kupata msaada',
      guide5: 'Shiriki ID ya kesi na wengine kushirikiana',
      emergency: '🚨 Dharura: Piga 999 au 112 mara moja',
      smsNumber: '📱 Nambari ya SMS: +254700123456',
      freeService: '✅ Huduma Bure: USSD ni bure kwenye mitandao yote',
      worksAllNetworks: '📶 Inafanya kazi kwenye mitandao yote ya Kenya',
      reply: 'Jibu ujumbe huu',
      response: 'Jibu',
      sendResponse: 'Tuma Jibu',
      placeholder: 'Andika jibu lako...',
      relationships: ['Chagua uhusiano', 'Mwanafamilia', 'Rafiki', 'Jirani', 'Mfanyakazi', 'Shahidi', 'Nyingine'],
      reportDetails: '📋 Maelezo ya Ripoti',
      ourTeam: 'Timu yetu itakagua ripoti yako',
      updates: 'Maelezo yatatumwa kwako kupitia SMS',
      trackId: 'Fuatilia kesi yako kwa ID',
      caseId: 'Kitambulisho cha Kesi',
      collaborate: 'Shirikiana na wengine',
      addCollaborator: 'Ongeza Mshirika',
      collaboratorPhone: 'Nambari ya Mshirika',
      shareCase: 'Shiriki ID ya Kesi',
      shareViaSMS: 'Shiriki kwa SMS',
      copyCaseId: 'Nakili ID ya Kesi',
      howToCollaborate: '🤝 Jinsi ya Kushirikiana kwa SMS',
      step6: 'Shiriki ID yako ya kesi na wengine',
      step7: 'Wanaweza kujibu kwa ID ya kesi kujiunga',
      step8: 'Maelezo yote yanatumwa kwa kila mtu',
      step9: 'Unaweza kuongeza washirika hadi 10',
      collaborators: 'Washirika',
      noCollaborators: 'Hakuna washirika bado',
      add: 'Ongeza',
      remove: 'Ondoa',
      smsHelp: '📱 Amri za SMS',
      help1: 'REPORT [maelezo] - Tuma ripoti mpya',
      help2: 'UPDATE [ID] [maelezo] - Sasisha kesi',
      help3: 'STATUS [ID] - Angalia hali ya kesi',
      help4: 'HELP - Pata msaada',
      help5: 'JOIN [ID] - Jiunge na kesi kama mshirika',
    },
    so: {
      title: 'Nidaamka Iskaashiga SMS/USSD',
      subtitle: 'Soo gudbi, iskaashi, oo la soco kiisaska SMS - Internet looma baahna',
      name: 'Magaca Qofka Lumay *',
      location: 'Goobta Ugu Dambeysay *',
      age: 'Da',
      lastSeen: 'Markii Ugu Dambeysay Lagu Arkay',
      description: 'Sharaxaad (muuqaal, dharka, iwm.)',
      contact: 'Lambarkaaga Xiriirka *',
      relationship: 'Xiriirka Qofka Lumay',
      generate: 'Samee Warbixin',
      success: 'Warbixin La Sameeyay',
      copy: 'Nuqul Ka Samee SMS',
      send: 'Dir SMS',
      newReport: '+ Warbixin Cusub',
      ussdTitle: 'Warbixin USSD',
      ussdCode: '*384#1234#',
      howToUse: 'Sida Loo Istcmaalo USSD',
      step1: 'Ku dhufo *384#1234# taleefankaaga',
      step2: 'Raac tilmaamaha',
      step3: 'Geli faahfaahinta qofka lumay',
      step4: 'Soo gudbi warbixintaada',
      step5: 'Waxaad heli doontaa SMS xaqiijin',
      guideTitle: '📖 Hagaha Iskaashiga SMS',
      guide1: 'U dir SMS +254700123456 faahfaahinta kiiska',
      guide2: 'Ku dar ID kiiska si aad iskagaashaan: e.g., "TP12345678 CASE UPDATE"',
      guide3: 'Ku jawaab "STATUS" si aad u hesho warbixin',
      guide4: 'Ku jawaab "HELP" si aad u hesho caawimo',
      guide5: 'La wadaag ID kiiska dadka kale si aad iskagaashaan',
      emergency: '🚨 Degdeg: Wac 999 ama 112 isla markiiba',
      smsNumber: '📱 Lambarka SMS: +254700123456',
      freeService: '✅ Adeeg Bilaash: USSD waa bilaash shabakadaha oo dhan',
      worksAllNetworks: '📶 Waxay ka shaqeysaa shabakadaha Kenya oo dhan',
      reply: 'U jawaab farriintan',
      response: 'Jawaab',
      sendResponse: 'Dir Jawaab',
      placeholder: 'Qor jawaabtaada...',
      relationships: ['Dooro xiriirka', 'Xuban Qoys', 'Saaxiib', 'Deris', 'Saaxiib Shaqo', 'Markshaati', 'Kale'],
      reportDetails: '📋 Faahfaahinta Warbixinta',
      ourTeam: 'Kooxdeena ayaa dib u eegi doonta',
      updates: 'Waxyaabaha cusub waxaa laguu soo diri doonaa SMS',
      trackId: 'La soco kiiskaaga ID',
      caseId: 'Aqoonsiga Kiiska',
      collaborate: 'La shaqee dadka kale',
      addCollaborator: 'Ku Dar La-shaqeeye',
      collaboratorPhone: 'Lambarka La-shaqeeye',
      shareCase: 'La Wadaag ID Kiiska',
      shareViaSMS: 'Ku Wadaag SMS',
      copyCaseId: 'Nuqul Ka Samee ID Kiiska',
      howToCollaborate: '🤝 Sida Loo Iskaashado SMS',
      step6: 'La wadaag ID kiiskaaga dadka kale',
      step7: 'Waxay ku jawaabi karaan ID kiiska si ay ugu biiraan',
      step8: 'Waxyaabaha cusub waxaa loo diraa qof kasta',
      step9: 'Waxaad ku dari kartaa ilaa 10 la-shaqeeye',
      collaborators: 'La-shaqeeyayaal',
      noCollaborators: 'Ma jiraan la-shaqeeyayaal',
      add: 'Ku Dar',
      remove: 'Ka Saar',
      smsHelp: '📱 Amarro SMS',
      help1: 'REPORT [faahfaahin] - Soo gudbi warbixin cusub',
      help2: 'UPDATE [ID] [faahfaahin] - Cusbooneysii kiis',
      help3: 'STATUS [ID] - Eeg heerka kiiska',
      help4: 'HELP - Hel caawimo',
      help5: 'JOIN [ID] - Ku biir kiis sidii la-shaqeeye',
    },
    luo: {
      title: 'System mar Tiyo Kod SMS/USSD',
      subtitle: 'Chiw, tiyo, kendo lu wach kod SMS - Ok dwar internet',
      name: 'Nying Ngʼat Ma Nondo *',
      location: 'Kama Ne Nenee Ngʼatno *',
      age: 'Higa',
      lastSeen: 'Kane Nenee Ngʼatno',
      description: 'Loso (kido, lewni, gi.)',
      contact: 'Namba Mari *',
      relationship: 'Kaka Iwacho Kod Ngʼatno',
      generate: 'Chiw Ripoti',
      success: 'Ripoti Osechiw',
      copy: 'Kaw SMS',
      send: 'Or SMS',
      newReport: '+ Ripoti Manyien',
      ussdTitle: 'Chiw Ripoti Kod USSD',
      ussdCode: '*384#1234#',
      howToUse: 'Kaka Itiyo Kod USSD',
      step1: 'Dhi *384#1234# e simu mari',
      step2: 'Lu wach ma okonyi',
      step3: 'Kaw weche mar ngʼat ma nondo',
      step4: 'Chiw ripoti mari',
      step5: 'Ibiro yudo SMS mar adier',
      guideTitle: '📖 Tija mar Tiyo Kod SMS',
      guide1: 'Or SMS ne +254700123456 gi weche mar wachno',
      guide2: 'Kaw ID mar wachno mondo itiy: e.g., "TP12345678 CASE UPDATE"',
      guide3: 'Dwok gi "STATUS" mondo iyud weche manyien',
      guide4: 'Dwok gi "HELP" mondo iyud kony',
      guide5: 'Nywis ID mar wachno ne jomoko mondo itiy',
      emergency: '🚨 Chandruok: Iwuogi 999 kata 112 gisasa',
      smsNumber: '📱 Namba SMS: +254700123456',
      freeService: '✅ Tich Maromo: USSD en nono e nyuolruok duto',
      worksAllNetworks: '📶 Tiyo e nyuolruok duto mag Kenya',
      reply: 'Dwok ne wachni',
      response: 'Dwok',
      sendResponse: 'Or Dwok',
      placeholder: 'Ndik dwok mari...',
      relationships: ['Yier kaka iwacho', 'Dhout', 'Osieme', 'Jodho', 'Jotich', 'Janeno', 'Moko'],
      reportDetails: '📋 Weche mar Ripoti',
      ourTeam: 'Jotichwa bino nono ripoti mari',
      updates: 'Weche manyien biro or ne in kod SMS',
      trackId: 'Lu wachno kodi gi ID',
      caseId: 'ID mar Wachno',
      collaborate: 'Tiyo gi jomoko',
      addCollaborator: 'Med Jotiyo',
      collaboratorPhone: 'Namba mar Jotiyo',
      shareCase: 'Nywis ID mar Wachno',
      shareViaSMS: 'Nywis Kod SMS',
      copyCaseId: 'Kaw ID mar Wachno',
      howToCollaborate: '🤝 Kaka Itiyo Kod Jomoko Kod SMS',
      step6: 'Nywis ID mar wachno ne jomoko',
      step7: 'Ginyalo dwoko gi ID mar wachno mondo okony',
      step8: 'Weche duto biro or ne ngʼato ka ngʼato',
      step9: 'Inyalo medo jotiyo nyaka 10',
      collaborators: 'Jotiyo',
      noCollaborators: 'Pod onge jotiyo',
      add: 'Med',
      remove: 'Gol',
      smsHelp: '📱 Chik mag SMS',
      help1: 'REPORT [weche] - Chiw ripoti manyien',
      help2: 'UPDATE [ID] [weche] - Lok wachno',
      help3: 'STATUS [ID] - Nono kaka wachno chalo',
      help4: 'HELP - Yud kony',
      help5: 'JOIN [ID] - Donjo e wachno ka jotiyo',
    },
    kik: {
      title: 'Wĩra wa SMS/USSD',
      subtitle: 'Rĩa, thĩna, na rora ũhoro na SMS - Internet ndĩrĩ',
      name: 'Rĩĩtwa Rĩa Mũndũ Ũrĩa Wathiire *',
      location: 'Kũrĩa Mũndũ Akinya *',
      age: 'Mĩaka',
      lastSeen: 'Rĩrĩa Mũndũ Akinya',
      description: 'Kũũria (mũheo, nguo, na)',
      contact: 'Namba Yaku *',
      relationship: 'Ũhoro Wa Mũndũ Ũrĩa Wathiire',
      generate: 'Tuma Ũhoro',
      success: 'Ũhoro Nĩ Wathire',
      copy: 'Kũrĩa SMS',
      send: 'Tuma SMS',
      newReport: '+ Ũhoro Mwega',
      ussdTitle: 'Kũrĩa Ũhoro na USSD',
      ussdCode: '*384#1234#',
      howToUse: 'Kũrĩa USSD',
      step1: 'Thiĩ *384#1234# kĩrĩa simu yaku',
      step2: 'Thiĩ na maathari',
      step3: 'Andĩka ũhoro wa mũndũ ũrĩa wathiire',
      step4: 'Tuma ũhoro waku',
      step5: 'Ũkĩgũa SMS ya kũrĩa',
      guideTitle: '📖 Wĩra wa SMS',
      guide1: 'Tuma SMS kũrĩ +254700123456 na ũhoro',
      guide2: 'Andĩka ID ya ũhoro: e.g., "TP12345678 CASE UPDATE"',
      guide3: 'Kũrĩa "STATUS" kũrĩa ũhoro',
      guide4: 'Kũrĩa "HELP" kũrĩa ũteithio',
      guide5: 'Era ID ya ũhoro kũrĩa andũ angĩ',
      emergency: '🚨 Wĩkĩru: Wĩĩtũ 999 kana 112',
      smsNumber: '📱 Namba SMS: +254700123456',
      freeService: '✅ Wĩra Mwega: USSD nĩ wa kũrĩa',
      worksAllNetworks: '📶 Wĩra kũrĩa ciothe mag Kenya',
      reply: 'Kũrĩa ũhoro ũyũ',
      response: 'Kũrĩa',
      sendResponse: 'Tuma Kũrĩa',
      placeholder: 'Andĩka kũrĩa yaku...',
      relationships: ['Thiĩ na ũhoro', 'Mũciĩ', 'Mũrata', 'Mũtũũri', 'Mũndũ wa wĩra', 'Kĩrĩra', 'Ĩngĩ'],
      reportDetails: '📋 Ũhoro wa Ripoti',
      ourTeam: 'Mũndũ wa wĩra wakuũ nĩ ũkĩrora',
      updates: 'Ũhoro mwega ũkĩgũa na SMS',
      trackId: 'Rora ũhoro na ID',
      caseId: 'ID ya Ũhoro',
      collaborate: 'Thĩna na andũ angĩ',
      addCollaborator: 'Ongea Mũthĩnĩki',
      collaboratorPhone: 'Namba ya Mũthĩnĩki',
      shareCase: 'Era ID ya Ũhoro',
      shareViaSMS: 'Era na SMS',
      copyCaseId: 'Kũrĩa ID ya Ũhoro',
      howToCollaborate: '🤝 Kũrĩa Thĩna na Andũ Angĩ',
      step6: 'Era ID ya ũhoro waku kũrĩa andũ',
      step7: 'Nĩngĩkũrĩa na ID ya ũhoro kũrĩa ũyĩ',
      step8: 'Ũhoro wothe ũkĩgũa kũrĩa mũndũ wothe',
      step9: 'Ũngĩongera andũ nginya 10',
      collaborators: 'Aandũ a wĩra',
      noCollaborators: 'Gũtirĩ andũ a wĩra',
      add: 'Ongea',
      remove: 'Kũrĩa',
      smsHelp: '📱 Maathari ma SMS',
      help1: 'REPORT [weche] - Tuma ũhoro mwega',
      help2: 'UPDATE [ID] [weche] - Kũũria ũhoro',
      help3: 'STATUS [ID] - Rora ũhoro',
      help4: 'HELP - Yũkĩrĩa ũteithio',
      help5: 'JOIN [ID] - Ũyĩ na ũhoro',
    },
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateSMS = () => {
    const t = translations[formData.language] || translations.en
    const relOptions = t.relationships || translations.en.relationships
    const relationshipLabel = relOptions[parseInt(formData.relationship)] || formData.relationship
    
    const message = `TRACEPOINT REPORT
Case ID: ${caseId || 'Pending'}
${t.name}: ${formData.name}
${t.location}: ${formData.location}
${t.age}: ${formData.age}
${t.lastSeen}: ${formData.lastSeen}
${t.description}: ${formData.description}
${t.contact}: ${formData.contact}
${t.relationship}: ${relationshipLabel}

${t.reply} ${t.response}:`

    setSmsMessage(message)
  }

  const generateResponse = () => {
    const t = translations[formData.language] || translations.en
    const response = `TRACEPOINT: ${t.success}. ${t.ourTeam}. ${t.updates}. ${t.trackId}: ${caseId}.`
    setResponseMessage(response)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
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
      generateResponse()
    }, 1500)
  }

  const addCollaborator = () => {
    const phone = prompt('Enter collaborator phone number:')
    if (phone && phone.length > 0) {
      setCollaborators([...collaborators, { phone, added: Date.now() }])
    }
  }

  const removeCollaborator = (index) => {
    const newCollaborators = collaborators.filter((_, i) => i !== index)
    setCollaborators(newCollaborators)
  }

  const smsNumber = '+254700123456'

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
            <WifiOff size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{translations[formData.language]?.title || 'SMS/USSD Collaboration System'}</h2>
            <p className="text-white/80 text-sm">{translations[formData.language]?.subtitle || 'Report, collaborate, and track cases via SMS - No internet needed'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
            <Smartphone size={12} />
            Works on any phone
          </span>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
            <Globe size={12} />
            No internet required
          </span>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
            <Languages size={12} />
            {languages.find(l => l.code === formData.language)?.flag || '🇬🇧'} {languages.find(l => l.code === formData.language)?.name || 'English'}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Language Selector */}
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <Languages size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name} ({lang.region})
              </option>
            ))}
          </select>
          <span className="text-xs text-gray-400">🌍 All Kenyan languages supported</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 flex-wrap">
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
            USSD
          </button>
          <button
            onClick={() => setActiveTab('collaborate')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'collaborate'
                ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Users size={16} className="inline mr-1" />
            Collaborate
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === 'help'
                ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <MessageCircle size={16} className="inline mr-1" />
            Help
          </button>
        </div>

        {/* SMS Tab */}
        {activeTab === 'sms' && (
          <div>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translations[formData.language]?.name || 'Full Name of Missing Person *'}
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
                      {translations[formData.language]?.location || 'Last Known Location *'}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translations[formData.language]?.age || 'Age'}
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
                      {translations[formData.language]?.lastSeen || 'Last Seen'}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translations[formData.language]?.contact || 'Your Contact *'}
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations[formData.language]?.description || 'Description (appearance, clothing, etc.)'}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translations[formData.language]?.relationship || 'Relationship'}
                    </label>
                    <select
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {translations[formData.language]?.relationships?.map((rel, index) => (
                        <option key={index} value={index}>
                          {rel}
                        </option>
                      )) || (
                        <>
                          <option value="">Select relationship</option>
                          <option value="1">Family Member</option>
                          <option value="2">Friend</option>
                          <option value="3">Neighbor</option>
                          <option value="4">Colleague</option>
                          <option value="5">Witness</option>
                          <option value="6">Other</option>
                        </>
                      )}
                    </select>
                  </div>
                  {caseId && (
                    <div className="p-3 bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-200 dark:border-primary-800">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{translations[formData.language]?.caseId || 'Case ID'}</p>
                      <p className="text-lg font-bold text-primary-600 dark:text-primary-400 font-mono">{caseId}</p>
                    </div>
                  )}
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
                      {translations[formData.language]?.generate || 'Generating Report...'}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {translations[formData.language]?.generate || 'Generate Report'}
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div>
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
                  <CheckCircle size={24} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-700 dark:text-emerald-400">
                      {translations[formData.language]?.success || 'Report Generated Successfully'}
                    </p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500">
                      {translations[formData.language]?.trackId || 'Track your case with ID'}: <strong className="font-mono">{caseId}</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap border border-gray-200 dark:border-gray-700">
                  {smsMessage}
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <button
                    onClick={() => copyToClipboard(smsMessage)}
                    className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : translations[formData.language]?.copy || 'Copy SMS'}
                  </button>
                  <a
                    href={`sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {translations[formData.language]?.send || 'Send SMS'}
                  </a>
                  <button
                    onClick={() => copyToClipboard(caseId)}
                    className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy size={18} />
                    {translations[formData.language]?.copyCaseId || 'Copy Case ID'}
                  </button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  📱 {translations[formData.language]?.smsNumber || 'SMS Number'}: <strong className="text-primary-600 dark:text-primary-400">{smsNumber}</strong>
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false)
                    setSmsMessage('')
                    setFormData({
                      ...formData,
                      name: '',
                      location: '',
                      age: '',
                      description: '',
                      contact: '',
                      relationship: '',
                      lastSeen: '',
                    })
                  }}
                  className="mt-4 w-full text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
                >
                  {translations[formData.language]?.newReport || '+ Create New Report'}
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {translations[formData.language]?.ussdTitle || 'USSD Reporting'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {translations[formData.language]?.worksAllNetworks || 'Dial the code below from any phone'}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 text-center border-2 border-primary-500 border-dashed">
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 font-mono">
                {ussdCode || '*384#1234#'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {translations[formData.language]?.worksAllNetworks || 'Dial this code on any network'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {translations[formData.language]?.worksAllNetworks || 'Works on all Kenyan networks'}
              </p>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <Phone size={16} />
                {translations[formData.language]?.howToUse || 'How to Use USSD'}
              </h4>
              <ol className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1.5 list-decimal pl-4">
                <li>{translations[formData.language]?.step1 || 'Dial *384#1234# on your phone'}</li>
                <li>{translations[formData.language]?.step2 || 'Follow the on-screen prompts'}</li>
                <li>{translations[formData.language]?.step3 || 'Enter the missing person details'}</li>
                <li>{translations[formData.language]?.step4 || 'Submit your report'}</li>
                <li>{translations[formData.language]?.step5 || 'You will receive a confirmation SMS'}</li>
              </ol>
            </div>

            <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle size={16} />
                <strong>{translations[formData.language]?.freeService || 'Free Service:'}</strong>
                {translations[formData.language]?.freeService || ' USSD reporting is free on all networks'}
              </p>
            </div>
          </div>
        )}

        {/* Collaborate Tab */}
        {activeTab === 'collaborate' && (
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <Users size={20} className="text-primary-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {translations[formData.language]?.collaborate || 'Collaborate with others'}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {translations[formData.language]?.howToCollaborate || 'Share your Case ID with others to collaborate via SMS'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                  <Link size={18} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Case ID</p>
                  <p className="text-xl font-bold text-primary-600 dark:text-primary-400 font-mono">
                    {caseId || 'Generate a report first'}
                  </p>
                </div>
                {caseId && (
                  <button
                    onClick={() => copyToClipboard(caseId)}
                    className="ml-auto px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm"
                  >
                    {translations[formData.language]?.copyCaseId || 'Copy'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={addCollaborator}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={18} />
                {translations[formData.language]?.addCollaborator || 'Add Collaborator'}
              </button>
              <button
                onClick={() => {
                  const shareMessage = `TRACEPOINT Case: ${caseId}. Please join to help find the missing person. Reply with JOIN ${caseId} to collaborate.`
                  if (navigator.share) {
                    navigator.share({ title: 'TracePoint Case', text: shareMessage })
                  } else {
                    copyToClipboard(shareMessage)
                    alert('Shared link copied to clipboard!')
                  }
                }}
                className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                {translations[formData.language]?.shareCase || 'Share Case'}
              </button>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <UserCheck size={16} />
                {translations[formData.language]?.collaborators || 'Collaborators'} ({collaborators.length})
              </h4>
              {collaborators.length > 0 ? (
                <div className="space-y-2">
                  {collaborators.map((collab, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{collab.phone}</span>
                      <button
                        onClick={() => removeCollaborator(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        {translations[formData.language]?.remove || 'Remove'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {translations[formData.language]?.noCollaborators || 'No collaborators added yet'}
                </p>
              )}
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <Users size={16} />
                {translations[formData.language]?.howToCollaborate || 'How to Collaborate via SMS'}
              </h4>
              <ol className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1.5 list-decimal pl-4">
                <li>{translations[formData.language]?.step6 || 'Share your Case ID with others'}</li>
                <li>{translations[formData.language]?.step7 || 'They can reply with the Case ID to join'}</li>
                <li>{translations[formData.language]?.step8 || 'All updates are sent to everyone in the group'}</li>
                <li>{translations[formData.language]?.step9 || 'You can add up to 10 collaborators per case'}</li>
              </ol>
            </div>
          </div>
        )}

        {/* Help Tab */}
        {activeTab === 'help' && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageCircle size={20} />
                {translations[formData.language]?.smsHelp || 'SMS Commands'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {translations[formData.language]?.worksAllNetworks || 'Send these commands via SMS to +254700123456'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 font-mono text-sm">REPORT</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{translations[formData.language]?.help1 || 'Submit a new report'}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 font-mono text-sm">UPDATE [CaseID]</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{translations[formData.language]?.help2 || 'Update an existing case'}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 font-mono text-sm">STATUS [CaseID]</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{translations[formData.language]?.help3 || 'Check case status'}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 font-mono text-sm">JOIN [CaseID]</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{translations[formData.language]?.help5 || 'Join a case as collaborator'}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 font-mono text-sm">HELP</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{translations[formData.language]?.help4 || 'Get assistance'}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle size={16} />
                <strong>{translations[formData.language]?.emergency || 'Emergency:'}</strong>
                {translations[formData.language]?.emergency || ' Please call 999 or 112 immediately'}
              </p>
            </div>

            <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-200 dark:border-primary-800">
              <p className="text-sm text-primary-700 dark:text-primary-400 flex items-center gap-2">
                <Share2 size={16} />
                <strong>📱 {translations[formData.language]?.smsNumber || 'SMS Number'}:</strong>
                <span className="font-mono">{smsNumber}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SMSCollaboration
