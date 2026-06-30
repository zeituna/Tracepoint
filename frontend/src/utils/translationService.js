/**
 * Professional Translation Service for TracePoint
 * Handles all communication in Kenyan languages
 */

// Complete translation dictionary for reporting and tracking
const translations = {
  // Report Submission
  'report_submitted': {
    en: '✅ Your report has been submitted successfully. We will review it and get back to you.',
    sw: '✅ Ripoti yako imetumwa kikamilifu. Tutaikagua na kukurudishia.',
    so: '✅ Warbixintaada waa la soo gudbiyay. Waan dib u eegi doonna oo kuula soo noqon doonnaa.',
    luo: '✅ Ripoti mari osechiw. Wabiro nono kendo dwoko.',
    kik: '✅ Ũhoro waku nĩ ũkĩgũa. Nĩ tũkũrora na tũgũkũrĩa.',
    luh: '✅ Inzala yiyi yakhupwa. Khulikhola nende khukhukobosia.',
    kam: '✅ Nĩ tũtwĩe ũndũ waku. Nĩtũkũrora na tũkũtwĩa.',
    kal: '✅ Bik ne osechoki. Kibonei kendo kikonyisou.',
    mer: '✅ Ũhoro waku nĩ ũkĩgũa. Nĩ tũkũrora na tũgũkũrĩa.',
    mij: '✅ Ripoti yako imetumwa kikamilifu. Tutaikagua na kukurudishia.',
    tur: '✅ Bik ne osechoki. Kibonei kendo kikonyisou.',
    maa: '✅ Nkishonka enkutoto. Kitojo nabo ilmurran.',
    pok: '✅ Bik ne osechoki. Kibonei kendo kikonyisou.',
    tai: '✅ Ripoti yako imetumwa kikamilifu. Tutaikagua na kukurudishia.'
  },
  
  'case_created': {
    en: '📋 Case Created Successfully. Your Case ID is: ',
    sw: '📋 Kesi Imetengenezwa. Kitambulisho chako cha Kesi ni: ',
    so: '📋 Kiis La Sameeyay. Aqoonsiga kiiskaaga waa: ',
    luo: '📋 Wachno Osechue. ID mar Wachno en: ',
    kik: '📋 Ũhoro Nĩ Wathire. ID ya Ũhoro waku nĩ: ',
    luh: '📋 Inzala Yakhupwa. Enamba ya Inzala yiyi ni: ',
    kam: '📋 Ũndũ Nĩ Wathire. ID ya Ũndũ waku nĩ: ',
    kal: '📋 Bik Osechue. Bik ne ose ID en: ',
    mer: '📋 Ũhoro Nĩ Wathire. ID ya Ũhoro waku nĩ: ',
    mij: '📋 Kesi Imetengenezwa. Kitambulisho chako cha Kesi ni: ',
    tur: '📋 Bik Osechue. Bik ne ose ID en: ',
    maa: '📋 Enkutoto Neshonka. Namba ya Enkutoto ninye: ',
    pok: '📋 Bik Osechue. Bik ne ose ID en: ',
    tai: '📋 Kesi Imetengenezwa. Kitambulisho chako cha Kesi ni: '
  },
  
  'case_status': {
    en: '📊 Case Status: ',
    sw: '📊 Hali ya Kesi: ',
    so: '📊 Heerka Kiiska: ',
    luo: '📊 Kaka Wachno Chalo: ',
    kik: '📊 Ũhoro wa Kesi: ',
    luh: '📊 Omwalo wa Inzala: ',
    kam: '📊 Ũndũ wa Kesi: ',
    kal: '📊 Bik ne ose: ',
    mer: '📊 Ũhoro wa Kesi: ',
    mij: '📊 Hali ya Kesi: ',
    tur: '📊 Bik ne ose: ',
    maa: '📊 Enkutoto: ',
    pok: '📊 Bik ne ose: ',
    tai: '📊 Hali ya Kesi: '
  },
  
  'location_update': {
    en: '📍 Location Updated: ',
    sw: '📍 Mahali Yamesasishwa: ',
    so: '📍 Goobta Waa La Cusbooneysiiyay: ',
    luo: '📍 Kama Oselok: ',
    kik: '📍 Kũrĩa Kũrĩa: ',
    luh: '📍 Hekali Yakhupwa: ',
    kam: '📍 Kũrĩa Kũrĩa: ',
    kal: '📍 Kama Oselok: ',
    mer: '📍 Kũrĩa Kũrĩa: ',
    mij: '📍 Mahali Yamesasishwa: ',
    tur: '📍 Kama Oselok: ',
    maa: '📍 Enkaji: ',
    pok: '📍 Kama Oselok: ',
    tai: '📍 Mahali Yamesasishwa: '
  },
  
  'collaborator_joined': {
    en: '👥 Collaborator has joined the case.',
    sw: '👥 Mshirika amejiunga na kesi.',
    so: '👥 La-shaqeeye ayaa ku biiray kiiska.',
    luo: '👥 Jotiyo ose donjo e wachno.',
    kik: '👥 Mũthĩnĩki ũyĩ na ũhoro.',
    luh: '👥 Omukhasi ni muhala khuingila inzala.',
    kam: '👥 Mũthĩnĩki ũyĩ na ũndũ.',
    kal: '👥 Jotiyo ose donjo e wachno.',
    mer: '👥 Mũthĩnĩki ũyĩ na ũhoro.',
    mij: '👥 Mshirika amejiunga na kesi.',
    tur: '👥 Jotiyo ose donjo e wachno.',
    maa: '👥 Kitojo nabo enkutoto.',
    pok: '👥 Jotiyo ose donjo e wachno.',
    tai: '👥 Mshirika amejiunga na kesi.'
  },
  
  'sms_commands': {
    en: `📱 SMS Commands:
• REPORT [name, location, description] - Submit a report
• STATUS [CaseID] - Check case status
• UPDATE [CaseID] [details] - Update case
• JOIN [CaseID] - Join as collaborator
• LOCATION [CaseID] [location] - Update location
• HELP - Get assistance
• EMERGENCY - Immediate help`,
    
    sw: `📱 Amri za SMS:
• REPORT [jina, mahali, maelezo] - Tuma ripoti
• STATUS [ID] - Angalia hali ya kesi
• UPDATE [ID] [maelezo] - Sasisha kesi
• JOIN [ID] - Jiunge kama mshirika
• LOCATION [ID] [mahali] - Sasisha mahali
• HELP - Pata msaada
• EMERGENCY - Msaada wa haraka`,
    
    so: `📱 Amarro SMS:
• REPORT [magaca, goobta, sharaxaad] - Soo gudbi warbixin
• STATUS [ID] - Eeg heerka kiiska
• UPDATE [ID] [faahfaahin] - Cusbooneysii kiis
• JOIN [ID] - Ku biir la-shaqeeye ahaan
• LOCATION [ID] [goobta] - Cusbooneysii goobta
• HELP - Hel caawimo
• EMERGENCY - Caawimo degdeg ah`,
    
    luo: `📱 Chik mag SMS:
• REPORT [nying, kama, weche] - Chiw ripoti
• STATUS [ID] - Ngʼe kaka wachno chalo
• UPDATE [ID] [weche] - Lok wachno
• JOIN [ID] - Donjo ka jotiyo
• LOCATION [ID] [kama] - Lok kama
• HELP - Yud kony
• EMERGENCY - Kony gisasa`,
    
    kik: `📱 Maathari ma SMS:
• REPORT [rĩĩtwa, kũrĩa, weche] - Tuma ũhoro
• STATUS [ID] - Rora ũhoro
• UPDATE [ID] [weche] - Kũũria ũhoro
• JOIN [ID] - Ũyĩ na ũhoro
• LOCATION [ID] [kũrĩa] - Kũũria kũrĩa
• HELP - Yũkĩrĩa ũteithio
• EMERGENCY - Ũteithio wa wĩkĩru`,
    
    luh: `📱 Amri za SMS:
• REPORT [lilina, hekali, inyuma] - Khupeka inzala
• STATUS [ID] - Lola omwalo
• UPDATE [ID] [inyuma] - Khupa inzala
• JOIN [ID] - Khuingila omukhasi
• LOCATION [ID] [hekali] - Khupa hekali
• HELP - Khupa obulafu
• EMERGENCY - Obulafu bwamuno`,
    
    kam: `📱 Maathari ma SMS:
• REPORT [rĩĩtwa, kũrĩa, weche] - Tuma ũndũ
• STATUS [ID] - Rora ũndũ
• UPDATE [ID] [weche] - Kũũria ũndũ
• JOIN [ID] - Ũyĩ na ũndũ
• LOCATION [ID] [kũrĩa] - Kũũria kũrĩa
• HELP - Yũkĩrĩa ũteithio
• EMERGENCY - Ũteithio wa wĩkĩru`,
    
    kal: `📱 Chik mag SMS:
• REPORT [nying, kama, weche] - Chiw ripoti
• STATUS [ID] - Ngʼe kaka wachno chalo
• UPDATE [ID] [weche] - Lok wachno
• JOIN [ID] - Donjo ka jotiyo
• LOCATION [ID] [kama] - Lok kama
• HELP - Yud kony
• EMERGENCY - Kony gisasa`,
    
    mer: `📱 Maathari ma SMS:
• REPORT [rĩĩtwa, kũrĩa, weche] - Tuma ũhoro
• STATUS [ID] - Rora ũhoro
• UPDATE [ID] [weche] - Kũũria ũhoro
• JOIN [ID] - Ũyĩ na ũhoro
• LOCATION [ID] [kũrĩa] - Kũũria kũrĩa
• HELP - Yũkĩrĩa ũteithio
• EMERGENCY - Ũteithio wa wĩkĩru`,
    
    mij: `📱 Amri za SMS:
• REPORT [jina, mahali, maelezo] - Tuma ripoti
• STATUS [ID] - Angalia hali ya kesi
• UPDATE [ID] [maelezo] - Sasisha kesi
• JOIN [ID] - Jiunga kama mshirika
• LOCATION [ID] [mahali] - Sasisha mahali
• HELP - Pata msaada
• EMERGENCY - Msaada wa haraka`,
    
    tur: `📱 Chik mag SMS:
• REPORT [nying, kama, weche] - Chiw ripoti
• STATUS [ID] - Ngʼe kaka wachno chalo
• UPDATE [ID] [weche] - Lok wachno
• JOIN [ID] - Donjo ka jotiyo
• LOCATION [ID] [kama] - Lok kama
• HELP - Yud kony
• EMERGENCY - Kony gisasa`,
    
    maa: `📱 Nchoki oo SMS:
• REPORT [enkitok, enkaji, weche] - Koshwa enkutoto
• STATUS [ID] - Kishonka enkutoto
• UPDATE [ID] [weche] - Kishonka enkutoto
• JOIN [ID] - Kitojo nabo
• LOCATION [ID] [enkaji] - Kishonka enkaji
• HELP - Yud kony
• EMERGENCY - Kony gisasa`,
    
    pok: `📱 Chik mag SMS:
• REPORT [nying, kama, weche] - Chiw ripoti
• STATUS [ID] - Ngʼe kaka wachno chalo
• UPDATE [ID] [weche] - Lok wachno
• JOIN [ID] - Donjo ka jotiyo
• LOCATION [ID] [kama] - Lok kama
• HELP - Yud kony
• EMERGENCY - Kony gisasa`,
    
    tai: `📱 Amri za SMS:
• REPORT [jina, mahali, maelezo] - Tuma ripoti
• STATUS [ID] - Angalia hali ya kesi
• UPDATE [ID] [maelezo] - Sasisha kesi
• JOIN [ID] - Jiunga kama mshirika
• LOCATION [ID] [mahali] - Sasisha mahali
• HELP - Pata msaada
• EMERGENCY - Msaada wa haraka`
  },
  
  'emergency': {
    en: '🚨 EMERGENCY: Call 999 or 112 immediately for immediate assistance.',
    sw: '🚨 DHARURA: Piga 999 au 112 mara moja kwa msaada wa haraka.',
    so: '🚨 DEGDEG: Wac 999 ama 112 isla markiiba si aad u hesho caawimo degdeg ah.',
    luo: '🚨 CHANDRUOK: Iwuogi 999 kata 112 gisasa mondo iyud kony.',
    kik: '🚨 WĨKĨRU: Wĩĩtũ 999 kana 112 ũteithio wa wĩkĩru.',
    luh: '🚨 ELI MUNO: Khupanga 999 ama 112 obulafu bwamuno.',
    kam: '🚨 WĨKĨRU: Wĩĩtũ 999 kana 112 ũteithio wa wĩkĩru.',
    kal: '🚨 CHANDRUOK: Iwuogi 999 kata 112 gisasa mondo iyud kony.',
    mer: '🚨 WĨKĨRU: Wĩĩtũ 999 kana 112 ũteithio wa wĩkĩru.',
    mij: '🚨 DHARURA: Piga 999 au 112 mara moja kwa msaada wa haraka.',
    tur: '🚨 CHANDRUOK: Iwuogi 999 kata 112 gisasa mondo iyud kony.',
    maa: '🚨 KOSOBO: Koshwa 999 ama 112.',
    pok: '🚨 CHANDRUOK: Iwuogi 999 kata 112 gisasa mondo iyud kony.',
    tai: '🚨 DHARURA: Piga 999 au 112 mara moja kwa msaada wa haraka.'
  }
}

// Detect language from text
export const detectLanguage = (text) => {
  if (!text || text.trim().length === 0) return 'en'
  
  const lowerText = text.toLowerCase()
  
  // Language patterns
  const patterns = {
    sw: ['habari', 'mambo', 'vipi', 'asante', 'sawa', 'karibu', 'nzuri', 'pole', 'tafadhali', 'kwa', 'hapa', 'kwangu', 'yangu', 'wangu', 'haya', 'kama', 'lakini', 'pia', 'tu', 'ndio', 'hapana', 'ripoti', 'kesi', 'msaada', 'tafadhali', 'asante sana'],
    so: ['wax', 'isku', 'warran', 'mahadsanid', 'waan', 'ka', 'ah', 'sida', 'soo', 'gudbi', 'helay', 'waxaan', 'waxaad', 'waxay', 'dhow', 'soo', 'sii', 'dhah', 'maanta', 'halkan', 'halkaan', 'warbixin', 'kiis', 'caawimo'],
    luo: ['ber', 'kendo', 'gin', 'mari', 'nono', 'wachi', 'nyalo', 'kata', 'kod', 'mar', 'wuoyi', 'nyako', 'dwaro', 'ot', 'dala', 'kany', 'ka', 'kuno', 'kora', 'moko', 'ripoti', 'wachno', 'kony'],
    kik: ['mwega', 'ndiga', 'ngu', 'thi', 'hiti', 'wega', 'kana', 'na', 'no', 'kiri', 'mwene', 'akwa', 'aguo', 'aciu', 'guo', 'cio', 'kwa', 'wa', 'ya', 'ria', 'riua', 'ũhoro', 'kesi', 'ũteithio'],
    luh: ['mulembe', 'muno', 'asi', 'mbo', 'ne', 'khu', 'li', 'wa', 'mu', 'kosi', 'khupa', 'sibala', 'ndi', 'si', 'ni', 'baba', 'mama', 'khwe', 'babas', 'mamas', 'inzala', 'obulafu'],
    kam: ['atia', 'we', 'asya', 'ngua', 'ni', 'mwene', 'akwa', 'waku', 'kwa', 'wa', 'ya', 'na', 'ma', 'ka', 'sya', 'mba', 'ninga', 'twi', 'thina', 'ũndũ', 'kesi', 'ũteithio'],
    kal: ['chamgei', 'agoy', 'engo', 'chep', 'kips', 'koito', 'muge', 'koreto', 'akwai', 'ka', 'mi', 'chi', 'ne', 'te', 'kaa', 'koy', 'na', 'ng', 'et', 'ang', 'am', 'ripoti', 'wachno', 'kony'],
    mer: ['muga', 'wega', 'nga', 'ni', 'mwene', 'akwa', 'waku', 'kwa', 'wa', 'ya', 'na', 'ma', 'ka', 'ga', 'sya', 'mba', 'ninga', 'twi', 'thina', 'nene', 'ũhoro', 'kesi', 'ũteithio'],
    mij: ['karibu', 'habari', 'sawa', 'asante', 'nzuri', 'pole', 'tafadhali', 'kwa', 'hapa', 'kwangu', 'yangu', 'wangu', 'haya', 'kama', 'lakini', 'pia', 'ripoti', 'kesi', 'msaada'],
    tur: ['aka', 'agoy', 'engo', 'chep', 'kips', 'koito', 'muge', 'koreto', 'akwai', 'ka', 'mi', 'chi', 'ne', 'te', 'kaa', 'koy', 'na', 'ng', 'et', 'ripoti', 'wachno', 'kony'],
    maa: ['supa', 'endaa', 'ng', 'kaja', 'aajo', 'entaa', 'ol', 'olaa', 'en', 'ila', 'kake', 'ke', 'lo', 'ki', 'o', 'na', 'a', 'e', 'pe', 'ne', 'enkutoto', 'kony'],
    pok: ['kwe', 'agoy', 'engo', 'chep', 'kips', 'koito', 'muge', 'koreto', 'akwai', 'ka', 'mi', 'chi', 'ne', 'te', 'kaa', 'koy', 'na', 'ng', 'et', 'ripoti', 'wachno', 'kony'],
    tai: ['hola', 'habari', 'sawa', 'asante', 'nzuri', 'pole', 'tafadhali', 'kwa', 'hapa', 'kwangu', 'yangu', 'wangu', 'haya', 'kama', 'lakini', 'pia', 'ripoti', 'kesi', 'msaada'],
    en: ['hello', 'hi', 'how', 'are', 'you', 'good', 'thank', 'you', 'welcome', 'please', 'help', 'where', 'what', 'when', 'why', 'who', 'which', 'can', 'will', 'would', 'report', 'case', 'help', 'status', 'update']
  }
  
  let scores = {}
  for (const [code, words] of Object.entries(patterns)) {
    let score = 0
    for (const word of words) {
      if (lowerText.includes(word)) score += 2
    }
    // Check for unique characters
    if (code === 'so' && /[āēīōū]/.test(lowerText)) score += 3
    if (code === 'sw' && /[āēīōū]/.test(lowerText)) score += 2
    if (code === 'kik' && /[ĩũ]/.test(lowerText)) score += 3
    if (score > 0) scores[code] = score
  }
  
  if (Object.keys(scores).length === 0) return 'en'
  
  const detected = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return detected
}

// Translate message to target language
export const translateMessage = (key, targetLang, data = {}) => {
  const lang = targetLang || 'en'
  
  if (translations[key]) {
    let message = translations[key][lang] || translations[key]['en']
    // Replace placeholders
    for (const [placeholder, value] of Object.entries(data)) {
      message = message.replace(`{${placeholder}}`, value)
    }
    return message
  }
  
  return key
}

// Generate response for SMS commands
export const generateSMSResponse = (command, data, language = 'en') => {
  const lang = language || 'en'
  
  switch(command.toLowerCase()) {
    case 'report':
    case 'ripoti':
    case 'warbixin':
      return translateMessage('report_submitted', lang) + '\n' + 
             translateMessage('case_created', lang) + data.caseId || ''
    
    case 'status':
    case 'hali':
    case 'heerka':
      return translateMessage('case_status', lang) + (data.status || 'Active')
    
    case 'update':
    case 'sasisha':
    case 'cusbooneysii':
      return `✅ ${translateMessage('location_update', lang)} ${data.location || 'Updated'}`
    
    case 'join':
    case 'jiunga':
    case 'biir':
      return translateMessage('collaborator_joined', lang)
    
    case 'help':
    case 'msaada':
    case 'caawimo':
      return translateMessage('sms_commands', lang)
    
    case 'emergency':
    case 'dharura':
    case 'degdeg':
      return translateMessage('emergency', lang)
    
    default:
      return translateMessage('sms_commands', lang)
  }
}

// Get all supported languages
export const getSupportedLanguages = () => {
  return [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'luo', name: 'Dholuo', flag: '🌅' },
    { code: 'kik', name: 'Gikuyu', flag: '🌾' },
    { code: 'luh', name: 'Luhya', flag: '🌄' },
    { code: 'kam', name: 'Kamba', flag: '🏜️' },
    { code: 'kal', name: 'Kalenjin', flag: '⛰️' },
    { code: 'mer', name: 'Meru', flag: '🌋' },
    { code: 'mij', name: 'Mijikenda', flag: '🏝️' },
    { code: 'tur', name: 'Turkana', flag: '🏜️' },
    { code: 'maa', name: 'Maasai', flag: '🦁' },
    { code: 'pok', name: 'Pokot', flag: '⛰️' },
    { code: 'tai', name: 'Taita', flag: '🌿' }
  ]
}

export default {
  detectLanguage,
  translateMessage,
  generateSMSResponse,
  getSupportedLanguages
}
