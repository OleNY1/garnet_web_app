import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

type SectionProps = {
  id: string
  eyebrow?: string
  title?: string
  intro?: string
  tone?: 'default' | 'wash' | 'warm'
  align?: 'center' | 'left'
  className?: string
  children: ReactNode
}

/** Page section with consistent width, spacing, and an accessible heading. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = 'default',
  align = 'center',
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cx(
        'py-16 sm:py-24',
        tone === 'wash' && 'bg-wash',
        tone === 'warm' && 'bg-wash-warm',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {(eyebrow || title || intro) && (
          <div className={cx('mb-10 max-w-3xl sm:mb-14', align === 'center' && 'mx-auto text-center')}>
            {eyebrow && (
              <p className="mb-3 text-[0.95rem] font-bold tracking-[0.14em] uppercase text-brand">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={headingId}
                className="font-display text-[1.9rem] leading-tight font-semibold text-ink sm:text-[2.4rem]"
              >
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
