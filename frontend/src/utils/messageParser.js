/**
 * Message Parser & Understanding System
 * Parses and understands user messages in all Kenyan languages
 */

// Keywords for different intents in all languages
const intentKeywords = {
  // Report a missing person
  report: {
    en: ['report', 'missing', 'person', 'find', 'search', 'lost', 'looking for', 'i want to report', 'submit'],
    sw: ['ripoti', 'amepotea', 'kutafuta', 'tafuta', 'potea', 'ninataka kuripoti', 'wasilisha', 'mtu amepotea'],
    so: ['soo gudbi', 'warbixin', 'lumay', 'raadi', 'helid', 'diiwaan', 'soo sheeg', 'qof lumay'],
    luo: ['chiw', 'ripoti', 'nondo', 'many', 'donjo', 'nyis', 'ngʼat ma nondo'],
    kik: ['tuma', 'ũhoro', 'athiire', 'ũũra', 'rĩa', 'mũndũ ũrĩa wathiire'],
    luh: ['khupeka', 'inzala', 'uwila', 'khulonda', 'mundu uwila'],
    kam: ['tuma', 'ũndũ', 'athiire', 'ũũra', 'mũndũ ũrĩa wathiire'],
    kal: ['chiw', 'ripoti', 'nondo', 'many', 'ngʼat ma nondo'],
    mer: ['tuma', 'ũhoro', 'athiire', 'ũũra', 'mũndũ ũrĩa wathiire'],
    mij: ['ripoti', 'amepotea', 'kutafuta', 'mtu amepotea'],
    tur: ['chiw', 'ripoti', 'nondo', 'many'],
    maa: ['koshwa', 'enkutoto', 'arap', 'kitojo'],
    pok: ['chiw', 'ripoti', 'nondo', 'many'],
    tai: ['ripoti', 'amepotea', 'kutafuta', 'mtu amepotea']
  },
  
  // Check status
  status: {
    en: ['status', 'check', 'track', 'progress', 'how is', 'update on', 'what is the status', 'case'],
    sw: ['hali', 'angalia', 'fuatilia', 'maendeleo', 'kesi', 'inavyoendelea', 'hali ya kesi'],
    so: ['heerka', 'eeg', 'la soco', 'horumar', 'kiis', 'wax ka dhacay', 'heerka kiiska'],
    luo: ['kaka', 'ngʼe', 'lu', 'wachno', 'ohal', 'kaka wachno chalo'],
    kik: ['ũhoro', 'rora', 'ũũra', 'kesi', 'inavyoendelea'],
    luh: ['omwalo', 'lola', 'khulonda', 'inzala', 'khurula'],
    kam: ['ũndũ', 'rora', 'ũũra', 'kesi'],
    kal: ['kaka', 'ngʼe', 'lu', 'wachno'],
    mer: ['ũhoro', 'rora', 'ũũra', 'kesi'],
    mij: ['hali', 'angalia', 'fuatilia', 'kesi'],
    tur: ['kaka', 'ngʼe', 'lu', 'wachno'],
    maa: ['enkutoto', 'kishonka', 'kitojo'],
    pok: ['kaka', 'ngʼe', 'lu', 'wachno'],
    tai: ['hali', 'angalia', 'fuatilia', 'kesi']
  },
  
  // Update information
  update: {
    en: ['update', 'new info', 'change', 'modify', 'addition', 'add', 'correct', 'new details'],
    sw: ['sasisha', 'taarifa mpya', 'badilisha', 'ongeza', 'rekebisha', 'maelezo mapya'],
    so: ['cusbooneysii', 'macluumaad cusub', 'badal', 'ku dar', 'saax', 'faahfaahin cusub'],
    luo: ['lok', 'weche manyien', 'kaw', 'med', 'weche', 'wachi manyien'],
    kik: ['kũũria', 'ũhoro mwega', 'ongera', 'ũgũthe', 'weche mwega'],
    luh: ['khupa', 'inyuma ndala', 'khukhwikhalana', 'khukhupa', 'amakhuwa manyien'],
    kam: ['kũũria', 'ũndũ mwega', 'ongera', 'ũgũthe', 'weche mwega'],
    kal: ['lok', 'weche manyien', 'kaw', 'med'],
    mer: ['kũũria', 'ũhoro mwega', 'ongera', 'weche mwega'],
    mij: ['sasisha', 'taarifa mpya', 'badilisha', 'ongeza'],
    tur: ['lok', 'weche manyien', 'kaw', 'med'],
    maa: ['kishonka', 'weche enkaji', 'kitojo', 'weche'],
    pok: ['lok', 'weche manyien', 'kaw', 'med'],
    tai: ['sasisha', 'taarifa mpya', 'badilisha', 'ongeza']
  },
  
  // Join as collaborator
  join: {
    en: ['join', 'collaborate', 'help', 'assist', 'work together', 'participate', 'involve'],
    sw: ['jiunga', 'shirikiana', 'saidia', 'kushirikiana', 'shiriki', 'husika'],
    so: ['ku biir', 'iskaashi', 'caawi', 'la shaqee', 'ka qayb gal', 'ku biir'],
    luo: ['donjo', 'tiyo', 'kony', 'tiyo kod', 'omiyo', 'kony'],
    kik: ['ũyĩ', 'thĩna', 'teithia', 'thĩna na', 'ongera', 'gũkũrĩa'],
    luh: ['khuingila', 'khukhwikhalana', 'khola', 'khukhupa', 'khurula'],
    kam: ['ũyĩ', 'thĩna', 'teithia', 'thĩna na'],
    kal: ['donjo', 'tiyo', 'kony', 'tiyo kod'],
    mer: ['ũyĩ', 'thĩna', 'teithia', 'thĩna na'],
    mij: ['jiunga', 'shirikiana', 'saidia', 'shiriki'],
    tur: ['donjo', 'tiyo', 'kony', 'tiyo kod'],
    maa: ['kitojo', 'kishonka', 'kony', 'kitojo nabo'],
    pok: ['donjo', 'tiyo', 'kony', 'tiyo kod'],
    tai: ['jiunga', 'shirikiana', 'saidia', 'shiriki']
  },
  
  // Emergency
  emergency: {
    en: ['emergency', 'urgent', 'immediate', 'quick', 'danger', 'help', '911', '999', '112'],
    sw: ['dharura', 'haraka', 'saidia', 'hatari', 'msaada wa haraka', '911', '999', '112'],
    so: ['degdeg', 'caawimo', 'hatar', 'gargaar', '911', '999', '112'],
    luo: ['chandruok', 'gisasa', 'kony', '911', '999', '112'],
    kik: ['wĩkĩru', 'ũteithio', 'wĩkĩru', '911', '999', '112'],
    luh: ['eli muno', 'obulafu', 'khulonda', '911', '999', '112'],
    kam: ['wĩkĩru', 'ũteithio', '911', '999', '112'],
    kal: ['chandruok', 'gisasa', 'kony', '911', '999', '112'],
    mer: ['wĩkĩru', 'ũteithio', '911', '999', '112'],
    mij: ['dharura', 'haraka', 'saidia', '911', '999', '112'],
    tur: ['chandruok', 'gisasa', 'kony', '911', '999', '112'],
    maa: ['kosoobo', 'kishonka', 'kony', '911', '999', '112'],
    pok: ['chandruok', 'gisasa', 'kony', '911', '999', '112'],
    tai: ['dharura', 'haraka', 'saidia', '911', '999', '112']
  },
  
  // Location
  location: {
    en: ['location', 'place', 'where', 'area', 'region', 'address', 'site', 'spot'],
    sw: ['mahali', 'eneo', 'wapi', 'mkoa', 'anwani', 'sehemu', 'pahali'],
    so: ['goobta', 'meel', 'xagee', 'gobol', 'ciwaan', 'meesha', 'xagga'],
    luo: ['kama', 'kany', 'kuom', 'gweng', 'kend', 'piny', 'ot'],
    kik: ['kũrĩa', 'haha', 'wapi', 'mũingĩ', 'anwani', 'sehemu'],
    luh: ['hekali', 'hala', 'wapi', 'mwikulu', 'enamba', 'sehemu'],
    kam: ['kũrĩa', 'haha', 'wapi', 'mũingĩ', 'anwani'],
    kal: ['kama', 'kany', 'kuom', 'gweng', 'kend'],
    mer: ['kũrĩa', 'haha', 'wapi', 'mũingĩ', 'anwani'],
    mij: ['mahali', 'eneo', 'wapi', 'mkoa', 'anwani'],
    tur: ['kama', 'kany', 'kuom', 'gweng'],
    maa: ['enkaji', 'enkop', 'ke', 'lo', 'na'],
    pok: ['kama', 'kany', 'kuom', 'gweng'],
    tai: ['mahali', 'eneo', 'wapi', 'mkoa', 'anwani']
  }
}

// Extract information from user message
export const extractInfo = (message) => {
  const info = {
    name: '',
    location: '',
    age: '',
    description: '',
    contact: '',
    caseId: '',
    relationship: ''
  }
  
  // Try to extract Case ID (format: TP + 8 digits + 3 letters)
  const caseIdMatch = message.match(/TP\d{8}[A-Z]{3}/i)
  if (caseIdMatch) {
    info.caseId = caseIdMatch[0].toUpperCase()
  }
  
  // Try to extract name (after "report" or in quotes)
  const nameMatch = message.match(/(?:report|ripoti|warbixin|about|kuhusu|ku saabsan|mar)(?:\s+)([A-Za-z\s]{2,30})/i)
  if (nameMatch) {
    info.name = nameMatch[1].trim()
  }
  
  // Try to extract location
  const locationKeywords = ['in', 'at', 'from', 'near', 'around', 'kwa', 'katika', 'huko', 'xaga', 'e', 'ka', 'khu', 'kwa', 'kũrĩa', 'kany', 'enkaji']
  for (const keyword of locationKeywords) {
    const regex = new RegExp(`${keyword}\\s+([A-Za-z\\s,]{2,30})`, 'i')
    const match = message.match(regex)
    if (match) {
      info.location = match[1].trim()
      break
    }
  }
  
  // Try to extract age
  const ageMatch = message.match(/(\d{1,3})\s*(?:years|years old|yrs|umri|da|miaka|higa|mĩaka|emiaka)/i)
  if (ageMatch) {
    info.age = ageMatch[1]
  }
  
  // Try to extract description (after "description" or colon)
  const descMatch = message.match(/(?:description|desc|maelezo|sharaxaad|los|weche|maelezo)\s*[:;]\s*(.+)/i)
  if (descMatch) {
    info.description = descMatch[1].trim()
  }
  
  return info
}

// Understand the user's intent
export const understandMessage = (message, language = 'en') => {
  const lowerMessage = message.toLowerCase()
  let intent = 'unknown'
  let confidence = 0
  let extractedInfo = extractInfo(message)
  
  // Check each intent
  for (const [intentType, keywords] of Object.entries(intentKeywords)) {
    const langKeywords = keywords[language] || keywords['en'] || []
    
    for (const keyword of langKeywords) {
      if (lowerMessage.includes(keyword)) {
        const score = keyword.split(' ').length > 1 ? 3 : 2 // Multi-word phrases get higher score
        if (score > confidence) {
          confidence = score
          intent = intentType
        }
      }
    }
  }
  
  // Additional checks for specific commands
  if (lowerMessage.includes('help') || lowerMessage.includes('msaada') || lowerMessage.includes('caawimo')) {
    intent = 'help'
    confidence = 5
  }
  
  if (lowerMessage.includes('status') || lowerMessage.includes('hali') || lowerMessage.includes('heerka')) {
    intent = 'status'
    confidence = Math.max(confidence, 4)
  }
  
  if (lowerMessage.includes('report') || lowerMessage.includes('ripoti') || lowerMessage.includes('warbixin')) {
    intent = 'report'
    confidence = Math.max(confidence, 4)
  }
  
  // If message contains a Case ID, it might be a status or update request
  if (extractedInfo.caseId) {
    if (intent === 'unknown' || intent === 'report') {
      intent = 'status'
      confidence = 3
    }
  }
  
  return {
    intent,
    confidence,
    extractedInfo,
    originalMessage: message,
    detectedLanguage: language,
    isCommand: confidence > 2,
    requiresAction: intent !== 'unknown' && confidence > 2
  }
}

// Generate appropriate response based on understanding
export const generateUnderstandingResponse = (understanding, data = {}) => {
  const { intent, extractedInfo, detectedLanguage } = understanding
  const lang = detectedLanguage || 'en'
  
  const responses = {
    report: {
      en: `📋 Report Received: ${extractedInfo.name || 'Unknown person'}\n📍 Location: ${extractedInfo.location || 'Not specified'}\n👤 Age: ${extractedInfo.age || 'Unknown'}\n📝 Description: ${extractedInfo.description || 'Not provided'}\n✅ Your case ID is: ${data.caseId || 'Pending'}\n📱 Reply with STATUS [CaseID] to track progress.`,
      sw: `📋 Ripoti Imepokelewa: ${extractedInfo.name || 'Mtu asiyejulikana'}\n📍 Mahali: ${extractedInfo.location || 'Haijabainishwa'}\n👤 Umri: ${extractedInfo.age || 'Haijulikani'}\n📝 Maelezo: ${extractedInfo.description || 'Hayajatumwa'}\n✅ Kitambulisho chako cha kesi ni: ${data.caseId || 'Inasubiri'}\n📱 Jibu kwa STATUS [ID] kufuatilia maendeleo.`,
      so: `📋 Warbixin La Helay: ${extractedInfo.name || 'Qof aan la aqoon'}\n📍 Goobta: ${extractedInfo.location || 'Lama caddayn'}\n👤 Da: ${extractedInfo.age || 'Lama oga'}\n📝 Sharaxaad: ${extractedInfo.description || 'Lama bixin'}\n✅ Aqoonsiga kiiskaaga waa: ${data.caseId || 'La sugayo'}\n📱 U jawaab STATUS [ID] si aad u la socoto horumarka.`
    },
    status: {
      en: `📊 Case ${extractedInfo.caseId || 'Unknown'} Status: ${data.status || 'Active - Under Investigation'}\n📍 Last Location: ${data.location || 'Not specified'}\n📅 Last Update: ${data.lastUpdate || 'Today'}\n👥 Collaborators: ${data.collaborators || 'None'}\n📱 Reply with UPDATE [CaseID] [details] to add information.`,
      sw: `📊 Kesi ${extractedInfo.caseId || 'Isiyojulikana'} Hali: ${data.status || 'Inafanyiwa uchunguzi'}\n📍 Mahali pa Mwisho: ${data.location || 'Haijabainishwa'}\n📅 Sasisho la Mwisho: ${data.lastUpdate || 'Leo'}\n👥 Washirika: ${data.collaborators || 'Hakuna'}\n📱 Jibu kwa UPDATE [ID] [maelezo] kuongeza taarifa.`,
      so: `📊 Kiis ${extractedInfo.caseId || 'Aan la aqoon'} Heerka: ${data.status || 'Baaritaan ayaa socda'}\n📍 Goobta Ugu Dambeysay: ${data.location || 'Lama caddayn'}\n📅 Cusbooneysiintii Ugu Dambeysay: ${data.lastUpdate || 'Maanta'}\n👥 La-shaqeeyayaal: ${data.collaborators || 'Midna'}\n📱 U jawaab UPDATE [ID] [faahfaahin] si aad u kordhiso macluumaad.`
    },
    emergency: {
      en: '🚨 EMERGENCY ASSISTANCE: Please call 999 or 112 immediately. Help is on the way.',
      sw: '🚨 MSAADA WA DHARURA: Tafadhali piga 999 au 112 mara moja. Msaada unakuja.',
      so: '🚨 CAAWIMO DEGDEG: Fadlan wac 999 ama 112 isla markiiba. Caawimo ayaa kugu soo socota.'
    },
    help: {
      en: `📱 SMS COMMANDS:\n• REPORT [name, location, description] - Submit report\n• STATUS [CaseID] - Check case status\n• UPDATE [CaseID] [details] - Update case\n• JOIN [CaseID] - Join as collaborator\n• LOCATION [CaseID] [location] - Update location\n• EMERGENCY - Immediate help\n• HELP - Show this menu`,
      sw: `📱 AMRI ZA SMS:\n• REPORT [jina, mahali, maelezo] - Tuma ripoti\n• STATUS [ID] - Angalia hali ya kesi\n• UPDATE [ID] [maelezo] - Sasisha kesi\n• JOIN [ID] - Jiunga kama mshirika\n• LOCATION [ID] [mahali] - Sasisha mahali\n• EMERGENCY - Msaada wa haraka\n• HELP - Onyesha menyu hii`,
      so: `📱 AMARRO SMS:\n• REPORT [magaca, goobta, sharaxaad] - Soo gudbi warbixin\n• STATUS [ID] - Eeg heerka kiiska\n• UPDATE [ID] [faahfaahin] - Cusbooneysii kiis\n• JOIN [ID] - Ku biir la-shaqeeye\n• LOCATION [ID] [goobta] - Cusbooneysii goobta\n• EMERGENCY - Caawimo degdeg\n• HELP - Muuji liiskan`
    },
    unknown: {
      en: `❌ I didn't understand your message. Please use:\n• REPORT [name, location, description]\n• STATUS [CaseID]\n• UPDATE [CaseID] [details]\n• JOIN [CaseID]\n• HELP for more information`,
      sw: `❌ Sikuelewa ujumbe wako. Tafadhali tumia:\n• REPORT [jina, mahali, maelezo]\n• STATUS [ID]\n• UPDATE [ID] [maelezo]\n• JOIN [ID]\n• HELP kwa maelezo zaidi`,
      so: `❌ Maan fahmin farriintaada. Fadlan isticmaal:\n• REPORT [magaca, goobta, sharaxaad]\n• STATUS [ID]\n• UPDATE [ID] [faahfaahin]\n• JOIN [ID]\n• HELP si aad u hesho macluumaad dheeri ah`
    }
  }
  
  // Get response in detected language
  if (responses[intent] && responses[intent][lang]) {
    return responses[intent][lang]
  }
  
  // Fallback to English
  return responses[intent]?.en || responses.unknown.en
}

export default {
  understandMessage,
  extractInfo,
  generateUnderstandingResponse,
  intentKeywords
}
