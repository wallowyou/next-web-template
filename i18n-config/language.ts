import data from './languages'

export type Item = {
  value: number | string
  name: string
  example: string
}

export type I18nText = Record<typeof LanguagesSupported[number], string>

export const languages = data.languages

// for compatibility
export type Locale = 'zh_Hans' | 'en_US' | (typeof languages[number])['value']

export const LanguagesSupported: Locale[] = languages.filter(item => item.supported).map(item => item.value)

export const getLanguage = (locale: Locale): Locale => {
  if (['zh-Hans', 'ja-JP'].includes(locale))
    return locale.replace('-', '_') as Locale

  return LanguagesSupported[0].replace('-', '_') as Locale
}

const DOC_LANGUAGE: Record<string, string> = {
  'zh-Hans': 'zh-hans',
  'en-US': 'en',
}

export const localeMap: Record<Locale, string> = {
  'en-US': 'en',
  'en_US': 'en',
  'zh-Hans': 'zh-cn',
  'zh_Hans': 'zh-cn',
}

export const getDocLanguage = (locale: string) => {
  return DOC_LANGUAGE[locale] || 'en'
}

const PRICING_PAGE_LANGUAGE: Record<string, string> = {
  'ja-JP': 'jp',
}

export const getPricingPageLanguage = (locale: string) => {
  return PRICING_PAGE_LANGUAGE[locale] || ''
}

export const NOTICE_I18N = {
  title: {
    en_US: 'Important Notice',
    zh_Hans: '重要公告',

  },
  desc: {
    en_US:
      'Our system will be unavailable from 19:00 to 24:00 UTC on August 28 for an upgrade. For questions, kindly contact our support team (support@dify.ai). We value your patience.',
    zh_Hans:
      '为了有效提升数据检索能力及稳定性，Dify 将于 2023 年 8 月 29 日 03:00 至 08:00 期间进行服务升级，届时 Dify 云端版及应用将无法访问。感谢您的耐心与支持。',
  },
  href: '#',
}
