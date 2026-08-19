import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LEARN_TOPICS } from '../lib/learnTopics'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Check if testing may help', href: '/check' },
  { label: 'How to get tested', href: '/next-steps' },
  { label: 'FAQ', href: '/next-steps#cost-privacy' },
]

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `inline-block rounded-full px-3.5 py-2.5 text-[0.98rem] font-medium transition-all duration-150 hover:scale-105 hover:bg-brand-soft hover:text-ink ${
    isActive ? 'bg-brand-soft text-ink' : 'text-body'
  }`

const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-brand-soft ${
    isActive ? 'bg-brand-soft text-ink' : 'text-ink'
  }`

/**
 * "Learn" nav item with a hover/focus dropdown listing every Learn
 * subpage, so a visitor can jump straight to a topic instead of always
 * landing on the Overview first. Opens on hover or keyboard focus, closes
 * on Escape, blur, or an outside click — same interaction pattern as the
 * hero feature tooltips on the homepage.
 */
function LearnNavItem() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to="/learn"
        end
        className={navLinkClasses}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={() => setOpen(true)}
      >
        <span className="inline-flex items-center gap-1">
          Learn
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </NavLink>

      <div
        role="menu"
        aria-label="Learn topics"
        className={`absolute top-full left-0 z-30 mt-1.5 w-72 origin-top-left rounded-2xl border border-line bg-surface p-2 shadow-lift transition-all duration-150 ${
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {LEARN_TOPICS.map((topic) => (
          <NavLink
            key={topic.to}
            to={topic.to}
            end={topic.end}
            role="menuitem"
            onClick={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="block scale-100 rounded-xl px-3.5 py-2.5 text-[0.95rem] font-medium text-body transition-all duration-150 hover:scale-[1.03] hover:bg-brand-soft hover:text-ink"
          >
            {topic.label}
          </NavLink>
        ))}
      </div>
    </li>
  )
}

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
          <ul aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <LearnNavItem />
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} className={navLinkClasses}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
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
            <li>
              <NavLink to="/learn" end onClick={() => setMenuOpen(false)} className={mobileNavLinkClasses}>
                Learn
              </NavLink>
              <ul className="ml-4 flex flex-col gap-0.5 border-l border-line pl-3">
                {LEARN_TOPICS.slice(1).map((topic) => (
                  <li key={topic.to}>
                    <NavLink
                      to={topic.to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2.5 text-[1.02rem] font-medium transition-colors hover:bg-brand-soft ${
                          isActive ? 'bg-brand-soft text-ink' : 'text-muted'
                        }`
                      }
                    >
                      {topic.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            {NAV_LINKS.slice(1).map((link) => (
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
