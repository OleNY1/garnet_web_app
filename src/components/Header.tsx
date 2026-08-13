import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

/* Anchors point at landing page sections until dedicated pages exist. */
const NAV_LINKS = [
  { label: 'Learn', href: '#learn' },
  { label: 'Check if testing may help', href: '#check' },
  { label: 'How to get tested', href: '#how-it-works' },
  { label: 'FAQ', href: '#cost-privacy' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === 'Escape') setMenuOpen(false)
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <a href="#top" className="-m-1.5 flex items-center gap-3 rounded-2xl p-1.5">
          <img src="/garnet-mark.png" alt="" className="size-11 shrink-0 object-contain" />
          <span className="flex flex-col leading-tight">
            <span className="text-[1.25rem] font-bold tracking-[0.18em] text-brand">GARNET</span>
            <span className="text-sm font-medium text-muted">
              Columbia medical research project
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2.5 text-[0.98rem] font-medium text-body transition-colors hover:bg-brand-soft hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-brand-soft lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5.5" />
            ) : (
              <Menu aria-hidden="true" className="size-5.5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main menu"
          className="border-t border-line bg-bg px-4 pt-3 pb-5 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-brand-soft"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
