import { ArrowRight, Search, X } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { cx } from '../lib/cx'
import { highlightParts, searchSite, suggestedPages } from '../lib/search'
import type { SearchHit } from '../lib/search'
import { IconChip } from './IconChip'

const thumbWash = {
  brand: 'bg-brand-soft',
  accent: 'bg-accent-soft',
  plum: 'bg-plum-soft',
} as const

const thumbEyebrow = {
  brand: 'text-brand',
  accent: 'text-accent',
  plum: 'text-plum',
} as const

function Highlighted({ text, terms }: { text: string; terms: string[] }) {
  return (
    <>
      {highlightParts(text, terms).map((part, i) =>
        part.hit ? (
          <mark key={i} className="rounded bg-brand-soft px-0.5 font-semibold text-ink">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  )
}

/**
 * One result, drawn as a miniature of the page: the same color band and
 * icon as the page's banner, its title, and the passage that matched.
 */
function ResultThumb({
  hit,
  active,
  id,
  onOpen,
  onHover,
}: {
  hit: SearchHit
  active: boolean
  id: string
  onOpen: () => void
  onHover: () => void
}) {
  return (
    <li role="option" id={id} aria-selected={active}>
      <button
        type="button"
        tabIndex={-1}
        onClick={onOpen}
        onMouseMove={onHover}
        className={cx(
          'flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-surface text-left transition-colors duration-150',
          active ? 'border-brand ring-2 ring-brand/30' : 'border-line hover:border-brand/60',
        )}
      >
        <span className={cx('flex items-center gap-3 px-4 py-3.5', thumbWash[hit.tint])}>
          <IconChip icon={hit.icon} tint={hit.tint} className="size-10 !bg-surface" />
          <span className={cx('type-support font-bold tracking-[0.12em] uppercase', thumbEyebrow[hit.tint])}>
            {hit.label}
          </span>
        </span>
        <span className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
          <span className="font-display type-copy font-semibold leading-snug text-ink">{hit.title}</span>
          {hit.heading ? (
            <span className="mt-1.5 type-support font-semibold text-muted">
              In: <Highlighted text={hit.heading} terms={hit.highlight} />
            </span>
          ) : null}
          <span className="mt-1.5 line-clamp-3 type-support leading-relaxed text-body">
            <Highlighted text={hit.snippet} terms={hit.highlight} />
          </span>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 type-support font-semibold text-brand">
            Open page
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </span>
      </button>
    </li>
  )
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const listId = useId()

  const trimmed = query.trim()
  const hits = useMemo(() => (trimmed ? searchSite(trimmed) : suggestedPages()), [trimmed])

  useEffect(() => {
    inputRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  useEffect(() => setActive(0), [trimmed])

  const open = (hit: SearchHit) => {
    onClose()
    navigate(hit.path, { state: hit.heading && trimmed ? { searchHeading: hit.heading } : undefined })
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      if (event.key === 'ArrowRight' && (event.target as HTMLInputElement).selectionStart !== query.length) return
      event.preventDefault()
      setActive((i) => Math.min(hits.length - 1, i + 1))
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      if (event.key === 'ArrowLeft' && (event.target as HTMLInputElement).selectionStart !== query.length) return
      event.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    } else if (event.key === 'Enter' && hits[active]) {
      event.preventDefault()
      open(hits[active])
    }
  }

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, listId])

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-[8vh]" onKeyDown={onKeyDown}>
      <div aria-hidden="true" className="absolute inset-0 bg-[#0b1f25]/55 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search GARNET"
        className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-lift"
      >
        <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5">
          <Search aria-hidden="true" className="size-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search, e.g. cost, APOL1, family, uncertain result"
            aria-label="Search GARNET"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={hits.length ? `${listId}-${active}` : undefined}
            autoComplete="off"
            className="min-h-[2.75rem] w-full min-w-0 bg-transparent type-copy text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-brand-soft hover:text-ink"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-4 pt-4 pb-5 sm:px-5">
          <p className="mb-3 type-support font-bold tracking-[0.12em] text-muted uppercase" aria-live="polite">
            {!trimmed
              ? 'Popular pages'
              : hits.length
                ? `${hits.length} page${hits.length > 1 ? 's' : ''} found`
                : 'No pages found'}
          </p>

          {hits.length ? (
            <ul id={listId} role="listbox" aria-label="Search results" className="grid gap-3 sm:grid-cols-2">
              {hits.map((hit, i) => (
                <ResultThumb
                  key={hit.path}
                  id={`${listId}-${i}`}
                  hit={hit}
                  active={i === active}
                  onOpen={() => open(hit)}
                  onHover={() => setActive(i)}
                />
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-line px-5 py-8 text-center">
              <p className="type-copy text-ink">Nothing on GARNET matches &ldquo;{trimmed}&rdquo;.</p>
              <p className="mt-1 type-support text-muted">Try a shorter or more general word, like &ldquo;test&rdquo; or &ldquo;family&rdquo;.</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** Search button for the header. Also opens with "/" or Ctrl/⌘ + K. */
export function SiteSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const typing = target.closest('input, textarea, select, [contenteditable="true"]')
      if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
        event.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        aria-haspopup="dialog"
        className={className}
      >
        <Search aria-hidden="true" className="size-5" />
        <span className="hidden xl:inline">Search</span>
      </button>
      {open ? <SearchDialog onClose={() => setOpen(false)} /> : null}
    </>
  )
}
