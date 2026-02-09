'use client'
import { useEffect } from 'react'
import { base } from '@/service/fetch'

export default function Page1() {
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
    </div>
  )
}
