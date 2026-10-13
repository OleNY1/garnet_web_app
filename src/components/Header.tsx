import { ChevronDown, Menu, Stethoscope, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LEARN_TOPICS } from '../lib/learnTopics'
import { SiteSearch } from './SiteSearch'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Genetic Risk Check', href: '/check' },
  { label: 'How to Get Tested', href: '/how-to-get-tested' },
  { label: 'FAQ', href: '/faq' },
]

const LEARN_MENU = LEARN_TOPICS.filter((topic) => !topic.end).map((topic) => ({
  label: topic.label,
  to: topic.to,
  end: topic.end,
}))

const hoverLift =
  'transition-transform duration-150 hover:-translate-y-0.5 hover:scale-105 focus-visible:-translate-y-0.5 focus-visible:scale-105'

const outlineHeaderButton = `items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-[0.9rem] font-semibold text-body ${hoverLift}`

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `inline-block rounded-full px-3.5 py-2.5 text-[0.98rem] font-medium ${hoverLift} ${
    isActive ? 'bg-brand-soft text-ink' : 'text-body'
  }`

const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3.5 text-lg font-medium ${hoverLift} ${
    isActive ? 'bg-brand-soft text-ink' : 'text-ink'
  }`

/**
 * "Learn" nav item with a hover/focus dropdown listing every Learn
 * subpage, so a visitor can jump straight to a topic instead of always
 * landing on the Overview first. Opens on hover or keyboard focus, closes
 * on Escape, an outside click, or 0.5 seconds after the mouse leaves.
 */
function LearnNavItem() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLLIElement>(null)
  const closeTimerRef = useRef<number | null>(null)

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openMenu = () => {
    cancelClose()
    setOpen(true)
  }

  const closeMenu = () => {
    cancelClose()
    setOpen(false)
  }

  const closeMenuSoon = () => {
    cancelClose()
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false)
      closeTimerRef.current = null
    }, 500)
  }

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) closeMenu()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => () => cancelClose(), [])

  return (
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenuSoon}
    >
      <NavLink
        to="/learn"
        end
        className={`inline-flex ${outlineHeaderButton}`}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={openMenu}
      >
        Learn
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </NavLink>

      <div
        role="menu"
        aria-label="Learn topics"
        className={`absolute top-full left-0 z-30 mt-1.5 w-72 origin-top-left rounded-2xl border border-line bg-surface p-2 shadow-lift transition-all duration-150 ${
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {LEARN_MENU.map((topic) => (
          <NavLink
            key={topic.to}
            to={topic.to}
            end={topic.end}
            role="menuitem"
            onClick={closeMenu}
            onFocus={openMenu}
            className={`block rounded-xl px-3.5 py-2.5 text-[0.95rem] font-medium text-body ${hoverLift}`}
          >
            {topic.label}
          </NavLink>
        ))}
      </div>
    </li>
  )
}

function BrandMark() {
  const { pathname } = useLocation()
  const isWelcomePage = pathname === '/'

  const mark = (
    <img
      src={`${import.meta.env.BASE_URL}garnet-mark.png`}
      alt=""
      className="size-11 shrink-0 object-contain"
    />
  )
  const wordmark = (
    <span className="text-[1.25rem] font-bold tracking-[0.18em] text-brand">GARNET</span>
  )

  /* On the welcome page the logo is not split into two destinations. */
  if (isWelcomePage) {
    return (
      <div className="flex items-center gap-3 p-1.5">
        {mark}
        {wordmark}
      </div>
    )
  }

  const brandLinkClasses = `-m-1.5 rounded-2xl p-1.5 ${hoverLift}`

  return (
    <div className="flex items-center gap-3">
      <Link
        to="/"
        aria-label="Go to the GARNET welcome page"
        title="Welcome page"
        className={brandLinkClasses}
      >
        {mark}
      </Link>
      <Link
        to="/learn"
        aria-label="Go to Getting started"
        title="Getting started"
        className={brandLinkClasses}
      >
        {wordmark}
      </Link>
    </div>
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
        <BrandMark />

        <div className="flex items-center gap-2 sm:gap-3">
          <ul aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <LearnNavItem />
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href} className={link.href === '/check' ? 'pl-[5px]' : undefined}>
                <NavLink to={link.href} className={navLinkClasses}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/doctor/dashboard"
            className={`hidden sm:inline-flex ${outlineHeaderButton}`}
          >
            <Stethoscope aria-hidden="true" className="size-4" />
            For doctors
          </Link>
          <SiteSearch
            className={`flex h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-line bg-surface text-[0.95rem] font-semibold text-ink xl:px-4 ${hoverLift}`}
          />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden ${hoverLift}`}
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
                {LEARN_MENU.map((topic) => (
                  <li key={topic.to}>
                    <NavLink
                      to={topic.to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2.5 text-[1.02rem] font-medium ${hoverLift} ${
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
            <li className="mt-2 border-t border-line pt-3">
              <Link
                to="/doctor/dashboard"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3.5 text-lg font-medium text-body ${hoverLift}`}
              >
                <Stethoscope aria-hidden="true" className="size-5" />
                For doctors
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
