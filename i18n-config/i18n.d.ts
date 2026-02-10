declare module '#i18n' {
  import type { UseTranslationResponse } from 'react-i18next'
  import type { Locale } from '@/i18n-config/language'
  import type { NamespaceCamelCase } from '@/i18n-config/resources'

  export function useTranslation(ns?: NamespaceCamelCase): UseTranslationResponse
  export function useLocale(): Locale
}
