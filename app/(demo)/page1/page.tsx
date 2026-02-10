'use client'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { base } from '@/service/fetch'

export default function Page1() {
  const { t } = useTranslation()
  const fetchData = async () => {
    const json = await base('test', { method: 'GET' }, {})
    console.warn(json, 'json')
  }
  useEffect(() => {
    console.warn('Page1 Rendered')
    fetchData()
  }, [])
  return (
    <div>
      <h2>测试请求</h2>
      <p>{t('operation.back')}</p>
      <p>{t('operation.cancel')}</p>
      <p>{t('operation.change')}</p>
      <p>{t('operation.clear')}</p>
      <p>{t('operation.close')}</p>
      <p>{t('operation.config')}</p>
    </div>
  )
}
