'use client'

import type { ChangeEvent } from 'react'
import type { Locale } from '@/i18n-config/language'
import { useTransition } from 'react'
import { useLocale } from '@/context/i18n'
import { setLocaleOnClient } from '@/i18n-config'
import { languages } from '@/i18n-config/language'
import { cn } from '@/utils/classnames'

type SelectElementWithValue = {
  value: string
}

export default function LanguageSwitcher() {
  const currentLocale = useLocale()
  const [isPending, startTransition] = useTransition()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target as unknown as SelectElementWithValue
    const nextLocale = value as Locale

    if (nextLocale === currentLocale)
      return

    startTransition(() => {
      void setLocaleOnClient(nextLocale)
    })
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-[10px] border border-zinc-200 bg-transparent px-2 py-1 text-xs dark:border-zinc-800',
      )}
    >
      <select
        className="bg-transparent text-zinc-700 outline-none dark:text-zinc-200"
        value={currentLocale}
        onChange={handleChange}
        disabled={isPending}
        aria-label="Change language"
      >
        {languages
          .filter(lang => lang.supported)
          .map(lang => (
            <option
              key={lang.value}
              value={lang.value}
              className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
            >
              {lang.name}
            </option>
          ))}
      </select>
    </div>
  )
}
