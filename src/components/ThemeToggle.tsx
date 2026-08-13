import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'garnet-theme'

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeTheme(value: 'light' | 'dark') {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* private browsing; theme still applies for this visit */
  }
}

/**
 * Light/dark toggle. Initial theme comes from the pre-paint script in
 * index.html (saved choice, else system preference). While the visitor has
 * not chosen a theme, we keep following system preference changes live.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme() !== null) return
      document.documentElement.classList.toggle('dark', event.matches)
      setDark(event.matches)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    storeTheme(next ? 'dark' : 'light')
    setDark(next)
  }

  const label = dark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-brand-soft"
    >
      {dark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
    </button>
  )
}
