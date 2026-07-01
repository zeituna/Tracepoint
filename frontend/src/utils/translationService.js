// Kenyan languages
const languages = {
  sw: { name: 'Kiswahili' },
  en: { name: 'English' },
  so: { name: 'Somali' },
  luo: { name: 'Dholuo' },
  kik: { name: 'Gikuyu' },
  luh: { name: 'Luhya' },
  kam: { name: 'Kamba' },
  kal: { name: 'Kalenjin' },
  mer: { name: 'Meru' },
  mij: { name: 'Mijikenda' },
  tur: { name: 'Turkana' },
  maa: { name: 'Maasai' },
  pok: { name: 'Pokot' },
  tai: { name: 'Taita' }
}

// Simple language detection
export const detectLanguage = (text) => {
  if (!text) return 'en'
  const t = text.toLowerCase()
  
  // Common words in each language
  if (t.includes('habari') || t.includes('mambo') || t.includes('asante')) return 'sw'
  if (t.includes('wax') || t.includes('warran') || t.includes('mahadsanid')) return 'so'
  if (t.includes('ber') || t.includes('kendo') || t.includes('wachno')) return 'luo'
  if (t.includes('mwega') || t.includes('wega') || t.includes('ũhoro')) return 'kik'
  if (t.includes('mulembe') || t.includes('muno')) return 'luh'
  if (t.includes('atia') || t.includes('asya')) return 'kam'
  if (t.includes('chamgei') || t.includes('agoy')) return 'kal'
  if (t.includes('muga')) return 'mer'
  if (t.includes('karibu') || t.includes('hola')) return 'mij'
  if (t.includes('aka')) return 'tur'
  if (t.includes('supa') || t.includes('endaa')) return 'maa'
  if (t.includes('kwe')) return 'pok'
  if (t.includes('taita')) return 'tai'
  
  return 'en'
}

// Simple word translations (English ↔ Kenyan languages)
const dictionary = {
  'Hello': { sw: 'Habari', so: 'Iska warran', luo: 'Ber', kik: 'Mwega', kal: 'Chamgei' },
  'How are you': { sw: 'Habari gani', so: 'Sidee tahay', luo: 'Idhi nade', kik: 'Wĩ mwega', kal: 'Engo' },
  'Report received': { sw: 'Ripoti imepokelewa', so: 'Warbixin la helay', luo: 'Ripoti osechoki', kik: 'Ũhoro nĩ ũkĩgũa', kal: 'Bik osechoki' },
  'Case ID': { sw: 'Kitambulisho', so: 'Aqoonsiga', luo: 'ID', kik: 'ID', kal: 'ID' },
  'Location': { sw: 'Mahali', so: 'Goobta', luo: 'Kama', kik: 'Kũrĩa', kal: 'Kama' }
}

// Translate text from English to Kenyan language
export const translateToLanguage = (text, langCode) => {
  if (langCode === 'en') return text
  if (!text) return text
  
  let result = text
  for (const [english, translations] of Object.entries(dictionary)) {
    if (text.includes(english)) {
      const translated = translations[langCode]
      if (translated) {
        result = result.replace(english, translated)
      }
    }
  }
  return result
}

// Translate text from Kenyan language to English
export const translateToEnglish = (text, detectedLang) => {
  if (detectedLang === 'en') return text
  if (!text) return text
  
  let result = text
  for (const [english, translations] of Object.entries(dictionary)) {
    const langText = translations[detectedLang]
    if (langText && text.includes(langText)) {
      result = result.replace(langText, english)
    }
  }
  return result
}

export const getLanguageInfo = (code) => {
  return languages[code] || languages.en
}

export const getSupportedLanguages = () => {
  return Object.entries(languages).map(([code, data]) => ({
    code,
    name: data.name
  }))
}

export default {
  detectLanguage,
  translateToEnglish,
  translateToLanguage,
  getLanguageInfo,
  getSupportedLanguages
}
