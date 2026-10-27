import { ChevronLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Tint } from './IconChip'
import { IconChip } from './IconChip'

const washClasses: Record<Tint, string> = {
  brand: 'bg-brand-soft',
  accent: 'bg-accent-soft',
  plum: 'bg-plum-soft',
}

const eyebrowClasses: Record<Tint, string> = {
  brand: 'text-brand',
  accent: 'text-accent',
  plum: 'text-plum',
}

/**
 * Colored banner at the top of every non-home page. Each page gets its own
 * tint (brand / accent / plum) so the three sections of the site read as
 * visually distinct places, not repeats of the same template.
 */
export function PageHero({
  icon,
  tint,
  eyebrow,
  title,
  intro,
  parent,
}: {
  icon: LucideIcon
  tint: Tint
  /** Small label above the title. Hidden when it would only repeat the title. */
  eyebrow?: string
  title: string
  intro?: string
  /** For sub-pages: a link back to the page they sit under. */
  parent?: { to: string; label: string }
}) {
  const showEyebrow = Boolean(eyebrow) && eyebrow!.trim().toLowerCase() !== title.trim().toLowerCase()

  return (
    <section className={`${washClasses[tint]} border-b border-line`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-5 py-7 sm:px-8 sm:py-10">
        <IconChip icon={icon} tint={tint} className="size-14" />
        <div>
          {parent ? (
            <Link
              to={parent.to}
              className="mb-3 inline-flex items-center gap-1 type-support font-semibold text-muted underline-offset-2 hover:text-brand hover:underline"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
              {parent.label}
            </Link>
          ) : null}
          {showEyebrow ? (
            <p
              className={`mb-2 type-support font-bold tracking-[0.14em] uppercase ${eyebrowClasses[tint]}`}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display type-page font-semibold text-ink">
            {title}
          </h1>
          {intro ? <p className="mt-4 max-w-2xl type-copy text-body">{intro}</p> : null}
        </div>
      </div>
    </section>
  )
}
