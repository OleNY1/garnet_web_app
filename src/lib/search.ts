import { HelpCircle, ListChecks, Signpost } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Tint } from '../components/IconChip'
import { LEARN_TOPICS } from './learnTopics'
import { SEARCH_INDEX } from './searchIndex.generated'

/** How each page looks in search results: the same icon and color as its banner. */
type PageLook = { label: string; icon: LucideIcon; tint: Tint }

const OTHER_PAGES: Record<string, PageLook> = {
  '/check': { label: 'Genetic Risk Check', icon: ListChecks, tint: 'accent' },
  '/how-to-get-tested': { label: 'How to get tested', icon: Signpost, tint: 'plum' },
  '/faq': { label: 'FAQ', icon: HelpCircle, tint: 'plum' },
}

export function pageLook(path: string): PageLook {
  const topic = LEARN_TOPICS.find((t) => t.to === path)
  if (topic) return { label: topic.label, icon: topic.icon, tint: topic.tint }
  return OTHER_PAGES[path] ?? { label: 'GARNET', icon: HelpCircle, tint: 'brand' }
}

/** Shown before anything is typed. */
export const SUGGESTED_PATHS = [
  '/check',
  '/learn/testing-basics',
  '/faq',
  '/learn/vus',
  '/learn/genetic-counselors',
  '/how-to-get-tested',
]

/** Everyday words patients may type for terms the pages use. */
const SYNONYMS: Record<string, string[]> = {
  cost: ['costs', 'pay', 'price', 'insurance', 'covered', 'coverage', 'financial'],
  price: ['cost', 'pay', 'insurance'],
  pay: ['cost', 'insurance', 'financial'],
  insurance: ['insurer', 'coverage', 'covered', 'cost'],
  donor: ['donors', 'donation', 'donate', 'donating'],
  donate: ['donor', 'donation'],
  privacy: ['private', 'gina', 'protections', 'rights'],
  vus: ['uncertain', 'variant'],
  uncertain: ['vus', 'unclear'],
  swab: ['saliva', 'sample', 'cheek'],
  saliva: ['swab', 'sample'],
  counselor: ['counselors', 'counseling'],
  counseling: ['counselor', 'counselors'],
  referral: ['refer', 'referred'],
  family: ['relatives', 'relative', 'parents', 'children', 'siblings'],
  relatives: ['family'],
  kids: ['children', 'family'],
  trial: ['trials', 'study', 'studies', 'research'],
  study: ['research', 'trial', 'studies'],
  support: ['group', 'groups', 'community'],
  dna: ['gene', 'genes', 'genetic'],
  gene: ['genes', 'genetic', 'dna'],
  risk: ['chance', 'likely'],
}

/** Lowercase and drop accents, keeping the same length so excerpts line up. */
const normalize = (s: string) => Array.from(s.toLowerCase(), (c) => c.normalize('NFD')[0]).join('')

const STOP = new Set(['a', 'an', 'and', 'the', 'of', 'to', 'for', 'is', 'do', 'i', 'my', 'in', 'on', 'can', 'what', 'how', 'does', 'it', 'me', 'are', 'be', 'or', 'with'])

function queryTerms(q: string): string[] {
  const words = normalize(q).match(/[a-z0-9]+/g) ?? []
  const kept = words.filter((w) => !STOP.has(w))
  return kept.length ? kept : words
}

/** Word-start match, so "test" finds "testing" but "est" does not. */
function hasTerm(haystack: string, term: string): boolean {
  return new RegExp(`(^|[^a-z0-9])${term.replace(/[^a-z0-9]/g, '')}`).test(haystack)
}

function variants(term: string): string[] {
  const singular = term.length > 3 && term.endsWith('s') ? term.slice(0, -1) : term
  return [...new Set([term, singular, ...(SYNONYMS[term] ?? []), ...(SYNONYMS[singular] ?? [])])]
}

export type SearchHit = {
  path: string
  title: string
  label: string
  icon: LucideIcon
  tint: Tint
  /** The section heading the best match was found under, if any. */
  heading: string
  /** A short excerpt around the match. */
  snippet: string
  /** Terms to highlight in the snippet. */
  highlight: string[]
  score: number
}

const indexed = SEARCH_INDEX.map((page) => {
  const look = pageLook(page.path)
  return {
    page,
    look,
    nTitle: normalize(`${page.title} ${look.label}`),
    nIntro: normalize(page.intro),
    nSections: page.sections.map((s) => ({ ...s, nHeading: normalize(s.heading), nText: normalize(s.text) })),
  }
})

function makeSnippet(text: string, terms: string[], length = 170): string {
  const n = normalize(text)
  let at = -1
  for (const t of terms) {
    const m = new RegExp(`(^|[^a-z0-9])${t}`).exec(n)
    if (m && (at === -1 || m.index < at)) at = m.index + m[1].length
  }
  if (at === -1 || text.length <= length) return text.length <= length ? text : `${text.slice(0, length).trimEnd()}…`
  let start = Math.max(0, at - 50)
  // Start at a word boundary.
  if (start > 0) start = text.indexOf(' ', start) + 1 || start
  const end = Math.min(text.length, start + length)
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trimEnd()}${end < text.length ? '…' : ''}`
}

export function searchSite(query: string): SearchHit[] {
  const terms = queryTerms(query)
  if (!terms.length) return []

  const hits: SearchHit[] = []

  for (const { page, look, nTitle, nIntro, nSections } of indexed) {
    let score = 0
    let allFound = true
    const matched: string[] = []

    for (const term of terms) {
      const vs = variants(term)
      const found = (s: string) => vs.find((v) => hasTerm(s, v))
      let termScore = 0
      const inTitle = found(nTitle)
      if (inTitle) termScore += 12
      if (found(nIntro)) termScore += 5
      for (const s of nSections) {
        if (found(s.nHeading)) termScore += 6
        if (found(s.nText)) termScore += 2
      }
      // A synonym counts a little less than the word the patient typed.
      const exact = hasTerm(nTitle + ' ' + nIntro + ' ' + nSections.map((s) => s.nHeading + ' ' + s.nText).join(' '), term)
      if (!termScore) {
        allFound = false
        break
      }
      score += exact ? termScore : termScore * 0.6
      matched.push(...vs)
    }
    if (!allFound) continue

    // Pick the section that matches the most terms for the excerpt.
    // Exact words beat synonyms, and a heading match beats a body match.
    let best: { heading: string; text: string; n: number } | null = null
    for (const s of nSections) {
      let n = 0
      for (const t of terms) {
        if (hasTerm(s.nHeading, t)) n += 6
        else if (variants(t).some((v) => hasTerm(s.nHeading, v))) n += 3
        if (hasTerm(s.nText, t)) n += 2
        else if (variants(t).some((v) => hasTerm(s.nText, v))) n += 1
      }
      if (n && (!best || n > best.n)) best = { heading: s.heading, text: s.text, n }
    }

    const highlight = [...new Set(matched)]
    hits.push({
      path: page.path,
      title: page.title,
      label: look.label,
      icon: look.icon,
      tint: look.tint,
      heading: best?.heading ?? '',
      snippet: makeSnippet(best?.text || page.intro, highlight),
      highlight,
      score,
    })
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, 8)
}

export function suggestedPages(): SearchHit[] {
  return SUGGESTED_PATHS.map((path) => SEARCH_INDEX.find((p) => p.path === path))
    .filter((p) => p !== undefined)
    .map((page) => {
      const look = pageLook(page.path)
      return {
        path: page.path,
        title: page.title,
        label: look.label,
        icon: look.icon,
        tint: look.tint,
        heading: '',
        snippet: page.intro,
        highlight: [],
        score: 0,
      }
    })
}

/** Split text into plain and highlighted parts for rendering. */
export function highlightParts(text: string, terms: string[]): { text: string; hit: boolean }[] {
  if (!terms.length) return [{ text, hit: false }]
  const n = normalize(text)
  const ranges: [number, number][] = []
  for (const t of terms) {
    const re = new RegExp(`(^|[^a-z0-9])(${t}[a-z0-9]*)`, 'g')
    let m: RegExpExecArray | null
    while ((m = re.exec(n))) {
      const s = m.index + m[1].length
      ranges.push([s, s + m[2].length])
    }
  }
  ranges.sort((a, b) => a[0] - b[0])
  const parts: { text: string; hit: boolean }[] = []
  let i = 0
  for (const [s, e] of ranges) {
    if (s < i) continue
    if (s > i) parts.push({ text: text.slice(i, s), hit: false })
    parts.push({ text: text.slice(s, e), hit: true })
    i = e
  }
  if (i < text.length) parts.push({ text: text.slice(i), hit: false })
  return parts
}
