'use client'
import { MonitorCog, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/utils/classnames'

export type Theme = 'light' | 'dark' | 'system'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return (
    <div className="flex items-center rounded-[10px] p-0.5">
      <div
        className={cn(
          'rounded-lg px-2 py-1',
          theme === 'system' && 'shadow-sm',
        )}
        onClick={() => handleThemeChange('system')}
      >
        <div className="p-0.5">
          <Sun className="h-4 w-4" />
        </div>
      </div>
      <div className={cn('h-[14px] w-px bg-transparent', theme === 'dark')}></div>
      <div
        className={cn(
          'rounded-lg px-2 py-1',
          theme === 'light' && 'shadow-sm',
        )}
        onClick={() => handleThemeChange('light')}
      >
        <div className="p-0.5">
          <Moon className="h-4 w-4" />
        </div>
      </div>
      <div className={cn('h-[14px] w-px bg-transparent', theme === 'system')}></div>
      <div
        className={cn(
          'rounded-lg px-2 py-1',
          theme === 'dark' && 'shadow-sm',
        )}
        onClick={() => handleThemeChange('dark')}
      >
        <div className="p-0.5">
          <MonitorCog className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
