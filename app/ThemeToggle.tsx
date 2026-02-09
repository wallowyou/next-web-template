'use client'

import { useCallback, useEffect, useSyncExternalStore } from 'react'

type Theme = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getStoredTheme(): Theme {
  if (typeof window === 'undefined')
    return 'system'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark')
    return stored
  return 'system'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')

  if (theme === 'light') {
    root.classList.add('light')
  }
  else if (theme === 'dark') {
    root.classList.add('dark')
  }
  else {
    // system: add class based on OS preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    if (prefersDark)
      root.classList.add('dark')
  }
}

const themeListeners = new Set<() => void>()
function subscribeTheme(callback: () => void) {
  themeListeners.add(callback)
  return () => themeListeners.delete(callback)
}
function notifyThemeChange() {
  themeListeners.forEach(cb => cb())
}

const THEME_CYCLE: Theme[] = ['system', 'light', 'dark']
const THEME_LABELS: Record<Theme, string> = {
  system: '跟随系统',
  light: '浅色模式',
  dark: '深色模式',
}
const THEME_ICONS: Record<Theme, string> = {
  system: '💻',
  light: '🌞',
  dark: '🌙',
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    getStoredTheme,
    () => 'system',
  )

  // Apply stored theme to document on mount (no setState)
  useEffect(() => {
    applyTheme(getStoredTheme())
  }, [])

  // Listen for OS preference changes (relevant in system mode)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (getStoredTheme() === 'system') {
        applyTheme('system')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const cycleTheme = useCallback(() => {
    const idx = THEME_CYCLE.indexOf(theme)
    const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length]

    if (next === 'system') {
      localStorage.removeItem(STORAGE_KEY)
    }
    else {
      localStorage.setItem(STORAGE_KEY, next)
    }

    applyTheme(next)
    notifyThemeChange()
  }, [theme])

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs text-card-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <span className="text-sm" aria-hidden="true">
        {THEME_ICONS[theme]}
      </span>
      <span>{THEME_LABELS[theme]}</span>
    </button>
  )
}
