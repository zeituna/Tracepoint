/**
 * Language Detection and Translation Service
 * Detects language from text and provides translations
 */

// Kenyan language patterns and keywords
const languagePatterns = {
  sw: {
    name: 'Kiswahili',
    keywords: ['habari', 'mambo', 'vipi', 'asante', 'sawa', 'karibu', 'nzuri', 'pole', 'tafadhali', 'nafasi', 
               'kwa', 'hapa', 'kwangu', 'yangu', 'wangu', 'haya', 'kama', 'lakini', 'pia', 'tu', 'ndio', 'hapana'],
    greetings: ['habari', 'mambo', 'vipi', 'sasa', 'shwari'],
    patterns: /(habari|mambo|vipi|asante|sawa|karibu|nzuri|pole|tafadhali)/i
  },
  so: {
    name: 'Somali',
    keywords: ['wax', 'isku', 'warran', 'mahadsanid', 'waan', 'ka', 'ah', 'sida', 'soo', 'gudbi', 'helay',
               'waxaan', 'waxaad', 'waxay', 'dhow', 'soo', 'sii', 'dhah', 'maanta', 'halkan', 'halkaan'],
    greetings: ['iska warran', 'wax warran', 'soo dhawow'],
    patterns: /(iska warran|mahadsanid|waxaan|waxaad|waxay|soo gudbi)/i
  },
  luo: {
    name: 'Dholuo',
    keywords: ['ber', 'kendo', 'gin', 'mari', 'nono', 'wachi', 'nyalo', 'kata', 'kod', 'mar', 'wuoyi', 
               'nyako', 'dwaro', 'ot', 'dala', 'kany', 'ka', 'kuno', 'kora', 'moko'],
    greetings: ['ber', 'sasa', 'chamgei'],
    patterns: /(ber|kendo|nyalo|dwaro|kata|kod)/i
  },
  kik: {
    name: 'Gikuyu',
    keywords: ['mwega', 'ndiga', 'ngu', 'thi', 'hiti', 'wega', 'kana', 'na', 'no', 'kiri', 'mwene',
               'akwa', 'aguo', 'aciu', 'guo', 'cio', 'kwa', 'wa', 'ya', 'ria', 'riua'],
    greetings: ['wi mwega', 'mwega', 'nyagathii'],
    patterns: /(mwega|ndiga|thi|hiti|wega|kana)/i
  },
  luh: {
    name: 'Luhya',
    keywords: ['mulembe', 'muno', 'asi', 'mbo', 'ne', 'khu', 'li', 'wa', 'mu', 'kosi', 'khupa',
               'sibala', 'ndi', 'si', 'ni', 'baba', 'mama', 'khwe', 'babas', 'mamas'],
    greetings: ['mulembe', 'muno', 'sasa'],
    patterns: /(mulembe|muno|ne|khu|li|wa|mu)/i
  },
  kam: {
    name: 'Kamba',
    keywords: ['atia', 'we', 'asya', 'ngua', 'ni', 'mwene', 'akwa', 'waku', 'kwa', 'wa', 'ya', 
               'na', 'ma', 'ka', 'sya', 'mba', 'ninga', 'twi', 'thina'],
    greetings: ['atĩa', 'mũno', 'nĩ we'],
    patterns: /(atĩa|nĩ we|asya|ngua|ni|mwene)/i
  },
  kal: {
    name: 'Kalenjin',
    keywords: ['chamgei', 'agoy', 'engo', 'chep', 'kips', 'koito', 'muge', 'koreto', 'akwai', 'ka',
               'mi', 'chi', 'ne', 'te', 'kaa', 'koy', 'na', 'ng', 'et', 'ang', 'am'],
    greetings: ['chamgei', 'agoy', 'sasa'],
    patterns: /(chamgei|agoy|engo|chep|kips|koito|muge)/i
  },
  mer: {
    name: 'Meru',
    keywords: ['muga', 'wega', 'nga', 'ni', 'mwene', 'akwa', 'waku', 'kwa', 'wa', 'ya', 'na',
               'ma', 'ka', 'ga', 'sya', 'mba', 'ninga', 'twi', 'thina', 'nene'],
    greetings: ['mũga', 'nĩ we', 'sasa'],
    patterns: /(mũga|nĩ we|nga|ni|mwene)/i
  },
  mij: {
    name: 'Mijikenda',
    keywords: ['karibu', 'habari', 'sawa', 'asante', 'nzuri', 'pole', 'tafadhali', 'kwa', 'hapa',
               'kwangu', 'yangu', 'wangu', 'haya', 'kama', 'lakini', 'pia'],
    greetings: ['karibu', 'habari', 'sasa'],
    patterns: /(karibu|habari|sawa|asante|nzuri|pole)/i
  },
  tur: {
    name: 'Turkana',
    keywords: ['aka', 'agoy', 'engo', 'chep', 'kips', 'koito', 'muge', 'koreto', 'akwai', 'ka',
               'mi', 'chi', 'ne', 'te', 'kaa', 'koy', 'na', 'ng', 'et'],
    greetings: ['aka', 'agoy', 'sasa'],
    patterns: /(aka|agoy|engo|chep|kips|koito|muge)/i
  },
  maa: {
    name: 'Maasai',
    keywords: ['supa', 'endaa', 'ng', 'kaja', 'aajo', 'entaa', 'ol', 'olaa', 'en', 'ila', 'kake',
               'ke', 'lo', 'ki', 'o', 'na', 'a', 'e', 'pe', 'ne'],
    greetings: ['supa', 'endaa', 'sasa'],
    patterns: /(supa|endaa|ng|kaja|aajo|entaa)/i
  },
  pok: {
    name: 'Pokot',
    keywords: ['kwe', 'agoy', 'engo', 'chep', 'kips', 'koito', 'muge', 'koreto', 'akwai', 'ka',
               'mi', 'chi', 'ne', 'te', 'kaa', 'koy', 'na', 'ng', 'et'],
    greetings: ['kwe', 'agoy', 'sasa'],
    patterns: /(kwe|agoy|engo|chep|kips|koito|muge)/i
  },
  tai: {
    name: 'Taita',
    keywords: ['hola', 'habari', 'sawa', 'asante', 'nzuri', 'pole', 'tafadhali', 'kwa', 'hapa',
               'kwangu', 'yangu', 'wangu', 'haya', 'kama', 'lakini', 'pia'],
    greetings: ['hola', 'habari', 'sasa'],
    patterns: /(hola|habari|sawa|asante|nzuri|pole)/i
  },
  en: {
    name: 'English',
    keywords: ['hello', 'hi', 'how', 'are', 'you', 'good', 'thank', 'you', 'welcome', 'please',
               'help', 'where', 'what', 'when', 'why', 'who', 'which', 'can', 'will', 'would'],
    greetings: ['hello', 'hi', 'hey', 'howdy'],
    patterns: /(hello|hi|how|are|you|good|thank|you|welcome|please)/i
  }
}

// Translation dictionary - common phrases in all languages
const translations = {
  'report_received': {
    en: '✅ Your report has been received. We will review it and get back to you.',
    sw: '✅ Ripoti yako imepokelewa. Tutaikagua na kukurudishia.',
    so: '✅ Warbixintaada waa la helay. Waan dib u eegi doonna oo kuula soo noqon doonnaa.',
    luo: '✅ Ripoti mari osechoki. Wabiro nono kendo dwoko.',
    kik: '✅ Ũhoro waku nĩ ũkĩgũa. Nĩ tũkũrora na tũgũkũrĩa.',
    luh: '✅ Inzala yiyi yakhupwa. Khulikhola nende khukhukobosia.',
    kam: '✅ Nĩ tũtwĩe ũndũ waku. Nĩtũkũrora na tũkũtwĩa.',
    kal: '✅ Bik ne osechoki. Kibonei kendo kikonyisou.',
    mer: '✅ Ũhoro waku nĩ ũkĩgũa. Nĩ tũkũrora na tũgũkũrĩa.',
    mij: '✅ Ripoti yako imepokelewa. Tutaikagua na kukurudishia.',
    tur: '✅ Bik ne osechoki. Kibonei kendo kikonyisou.',
    maa: '✅ Nkishonka enkutoto. Kitojo nabo ilmurran.',
    pok: '✅ Bik ne osechoki. Kibonei kendo kikonyisou.',
    tai: '✅ Ripoti yako imepokelewa. Tutaikagua na kukurudishia.'
  },
  'case_id': {
    en: 'Your Case ID is: ',
    sw: 'Kitambulisho chako cha Kesi ni: ',
    so: 'Aqoonsiga kiiskaaga waa: ',
    luo: 'ID mar Wachno en: ',
    kik: 'ID ya Ũhoro waku nĩ: ',
    luh: 'Enamba ya Inzala yiyi ni: ',
    kam: 'ID ya Ũndũ waku nĩ: ',
    kal: 'Bik ne ose ID en: ',
    mer: 'ID ya Ũhoro waku nĩ: ',
    mij: 'Kitambulisho chako cha Kesi ni: ',
    tur: 'Bik ne ose ID en: ',
    maa: 'Namba ya Enkutoto ninye: ',
    pok: 'Bik ne ose ID en: ',
    tai: 'Kitambulisho chako cha Kesi ni: '
  },
  'status_update': {
    en: '📋 Case Status: ',
    sw: '📋 Hali ya Kesi: ',
    so: '📋 Heerka Kiiska: ',
    luo: '📋 Kaka Wachno Chalo: ',
    kik: '📋 Ũhoro wa Kesi: ',
    luh: '📋 Omwalo wa Inzala: ',
    kam: '📋 Ũndũ wa Kesi: ',
    kal: '📋 Bik ne ose: ',
    mer: '📋 Ũhoro wa Kesi: ',
    mij: '📋 Hali ya Kesi: ',
    tur: '📋 Bik ne ose: ',
    maa: '📋 Enkutoto: ',
    pok: '📋 Bik ne ose: ',
    tai: '📋 Hali ya Kesi: '
  },
  'help_text': {
    en: '📖 Send: REPORT [details] to report, STATUS [CaseID] to check, JOIN [CaseID] to collaborate, UPDATE [CaseID] [details] to update',
    sw: '📖 Tuma: REPORT [maelezo] kuripoti, STATUS [ID] kuangalia, JOIN [ID] kushirikiana, UPDATE [ID] [maelezo] kusasisha',
    so: '📖 U dir: REPORT [faahfaahin] si aad u soo gudbiso, STATUS [ID] si aad u eegto, JOIN [ID] si aad iskagaashaan, UPDATE [ID] [faahfaahin] si aad u cusbooneysiiso',
    luo: '📖 Or: REPORT [weche] mondo ichiw, STATUS [ID] mondo ingʼe, JOIN [ID] mondo itiy, UPDATE [ID] [weche] mondo ilok',
    kik: '📖 Tuma: REPORT [weche] kũrĩa, STATUS [ID] kuona, JOIN [ID] kũrĩa, UPDATE [ID] [weche] kũkũria',
    luh: '📖 Tuma: REPORT [inyuma] okhukhupa, STATUS [ID] okhulola, JOIN [ID] okhukhwikhalana, UPDATE [ID] [inyuma] okhukhupa',
    kam: '📖 Tuma: REPORT [weche] kũtwĩa, STATUS [ID] kuona, JOIN [ID] kũtwĩa, UPDATE [ID] [weche] kũkũria',
    kal: '📖 Or: REPORT [weche] mondo ichiw, STATUS [ID] mondo ingʼe, JOIN [ID] mondo itiy, UPDATE [ID] [weche] mondo ilok',
    mer: '📖 Tuma: REPORT [weche] kũrĩa, STATUS [ID] kuona, JOIN [ID] kũrĩa, UPDATE [ID] [weche] kũkũria',
    mij: '📖 Tuma: REPORT [maelezo] kuripoti, STATUS [ID] kuangalia, JOIN [ID] kushirikiana, UPDATE [ID] [maelezo] kusasisha',
    tur: '📖 Or: REPORT [weche] mondo ichiw, STATUS [ID] mondo ingʼe, JOIN [ID] mondo itiy, UPDATE [ID] [weche] mondo ilok',
    maa: '📖 Koshwa: REPORT [weche] enkutoto, STATUS [ID] kishonka, JOIN [ID] kitojo, UPDATE [ID] [weche] kishonka',
    pok: '📖 Or: REPORT [weche] mondo ichiw, STATUS [ID] mondo ingʼe, JOIN [ID] mondo itiy, UPDATE [ID] [weche] mondo ilok',
    tai: '📖 Tuma: REPORT [maelezo] kuripoti, STATUS [ID] kuangalia, JOIN [ID] kushirikiana, UPDATE [ID] [maelezo] kusasisha'
  },
  'collaborator_joined': {
    en: '👥 Collaborator joined the case.',
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
  'emergency_alert': {
    en: '🚨 EMERGENCY: Please call 999 or 112 immediately!',
    sw: '🚨 DHARURA: Tafadhali piga 999 au 112 mara moja!',
    so: '🚨 DEGDEG: Fadlan wac 999 ama 112 isla markiiba!',
    luo: '🚨 CHANDRUOK: Iwuogi 999 kata 112 gisasa!',
    kik: '🚨 WĨKĨRU: Wĩĩtũ 999 kana 112!',
    luh: '🚨 ELI MUNO: Khupanga 999 ama 112!',
    kam: '🚨 WĨKĨRU: Wĩĩtũ 999 kana 112!',
    kal: '🚨 CHANDRUOK: Iwuogi 999 kata 112 gisasa!',
    mer: '🚨 WĨKĨRU: Wĩĩtũ 999 kana 112!',
    mij: '🚨 DHARURA: Tafadhali piga 999 au 112 mara moja!',
    tur: '🚨 CHANDRUOK: Iwuogi 999 kata 112 gisasa!',
    maa: '🚨 KOSOBO: Koshwa 999 ama 112!',
    pok: '🚨 CHANDRUOK: Iwuogi 999 kata 112 gisasa!',
    tai: '🚨 DHARURA: Tafadhali piga 999 au 112 mara moja!'
  }
}

// Detect language from text
export const detectLanguage = (text) => {
  if (!text || text.trim().length === 0) return 'en'
  
  const lowerText = text.toLowerCase()
  let scores = {}
  
  // Check each language pattern
  for (const [code, lang] of Object.entries(languagePatterns)) {
    let score = 0
    // Check keywords
    for (const keyword of lang.keywords) {
      if (lowerText.includes(keyword)) score += 2
    }
    // Check patterns
    if (lang.patterns && lang.patterns.test(lowerText)) score += 5
    // Check greetings
    for (const greeting of lang.greetings) {
      if (lowerText.includes(greeting)) score += 3
    }
    if (score > 0) scores[code] = score
  }
  
  // If no language detected, return English
  if (Object.keys(scores).length === 0) return 'en'
  
  // Get language with highest score
  const detected = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return detected
}

// Translate a message to a specific language
export const translateMessage = (message, targetLanguage) => {
  // If message is in translation dictionary, return translated version
  if (translations[message]) {
    return translations[message][targetLanguage] || translations[message]['en']
  }
  
  // If it's a case ID message, translate accordingly
  if (message.startsWith('Your Case ID is: ')) {
    const caseId = message.replace('Your Case ID is: ', '')
    const prefix = translations['case_id'][targetLanguage] || translations['case_id']['en']
    return prefix + caseId
  }
  
  if (message.startsWith('📋 Case Status: ')) {
    const status = message.replace('📋 Case Status: ', '')
    const prefix = translations['status_update'][targetLanguage] || translations['status_update']['en']
    return prefix + status
  }
  
  // For custom messages, add language detection and basic translation
  // This is a simplified version - in production, you'd use a proper translation API
  return message
}

// Generate auto-response in user's language
export const generateAutoResponse = (type, language, data = {}) => {
  const lang = language || 'en'
  
  const responses = {
    'report_received': translations['report_received'][lang] || translations['report_received']['en'],
    'case_id': (translations['case_id'][lang] || translations['case_id']['en']) + (data.caseId || ''),
    'status_update': (translations['status_update'][lang] || translations['status_update']['en']) + (data.status || ''),
    'help': translations['help_text'][lang] || translations['help_text']['en'],
    'collaborator_joined': translations['collaborator_joined'][lang] || translations['collaborator_joined']['en'],
    'emergency': translations['emergency_alert'][lang] || translations['emergency_alert']['en']
  }
  
  return responses[type] || responses['help']
}

// Get language name from code
export const getLanguageName = (code) => {
  return languagePatterns[code]?.name || 'English'
}

// Get language flag from code
export const getLanguageFlag = (code) => {
  const flags = {
    sw: '🇰🇪', so: '🇸🇴', luo: '🌅', kik: '🌾', luh: '🌄',
    kam: '🏜️', kal: '⛰️', mer: '🌋', mij: '🏝️', tur: '🏜️',
    maa: '🦁', pok: '⛰️', tai: '🌿', en: '🇬🇧'
  }
  return flags[code] || '🇬🇧'
}

// Get all supported languages
export const getSupportedLanguages = () => {
  return Object.entries(languagePatterns).map(([code, lang]) => ({
    code,
    name: lang.name,
    flag: getLanguageFlag(code)
  }))
}

export default {
  detectLanguage,
  translateMessage,
  generateAutoResponse,
  getLanguageName,
  getLanguageFlag,
  getSupportedLanguages
}
