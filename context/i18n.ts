import type { Locale } from '@/i18n-config/language'
import { useTranslation } from '#i18n'
import { getLanguage } from '@/i18n-config/language'

export const useLocale = () => {
  const { i18n } = useTranslation()
  return i18n.language as Locale
}

export const useGetLanguage = () => {
  const locale = useLocale()

  return getLanguage(locale)
}
