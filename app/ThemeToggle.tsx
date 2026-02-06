'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined')
    return 'light'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark')
    return stored

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const initial = getInitialTheme()
    if (typeof document !== 'undefined')
      document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light'

      if (typeof document !== 'undefined')
        document.documentElement.setAttribute('data-theme', next)

      if (typeof window !== 'undefined')
        window.localStorage.setItem(STORAGE_KEY, next)

      return next
    })
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-background px-3 py-1 text-xs text-foreground shadow-sm transition-colors hover:bg-zinc-100"
    >
      <span className="text-sm" aria-hidden="true">
        {theme === 'light' ? '🌞' : '🌙'}
      </span>
      <span>{theme === 'light' ? '浅色模式' : '深色模式'}</span>
    </button>
  )
}
