'use client'
import dynamic from 'next/dynamic'

const ThemeSwitcher = dynamic(() => import('@/app/components/base/theme-switcher'), {
  ssr: false,
  loading: () => <div className="size-8 bg-transparent" />,
})

const LanguageSwitcher = dynamic(() => import('@/app/components/base/language-switcher'), {
  ssr: false,
  loading: () => <div className="h-8 w-16 bg-transparent" />,
})
export default function Header() {
  return (
    <div className="flex items-center justify-between gap-3">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  )
}
