import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Check if testing may help', href: '/check' },
  { label: 'How to get tested', href: '/next-steps' },
  { label: 'FAQ', href: '/next-steps#cost-privacy' },
]

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3.5 py-2.5 text-[0.98rem] font-medium transition-colors hover:bg-brand-soft hover:text-ink ${
    isActive ? 'bg-brand-soft text-ink' : 'text-body'
  }`

const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-brand-soft ${
    isActive ? 'bg-brand-soft text-ink' : 'text-ink'
  }`

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
        <Link to="/" className="-m-1.5 flex items-center gap-3 rounded-2xl p-1.5">
          <img
            src={`${import.meta.env.BASE_URL}garnet-mark.png`}
            alt=""
            className="size-11 shrink-0 object-contain"
          />
          <span className="text-[1.25rem] font-bold tracking-[0.18em] text-brand">GARNET</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} to={link.href} className={navLinkClasses}>
                {link.label}
              </NavLink>
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
                <NavLink to={link.href} onClick={() => setMenuOpen(false)} className={mobileNavLinkClasses}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
