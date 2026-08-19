import type { LucideIcon } from 'lucide-react'
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
}: {
  icon: LucideIcon
  tint: Tint
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <section className={`${washClasses[tint]} border-b border-line`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-5 py-14 sm:px-8 sm:py-20">
        <IconChip icon={icon} tint={tint} className="size-14" />
        <div>
          <p
            className={`mb-2 text-[0.95rem] font-bold tracking-[0.14em] uppercase ${eyebrowClasses[tint]}`}
          >
            {eyebrow}
          </p>
          <h1 className="font-display text-[2.1rem] leading-tight font-semibold text-ink sm:text-[2.6rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">{intro}</p>
        </div>
      </div>
    </section>
  )
}
