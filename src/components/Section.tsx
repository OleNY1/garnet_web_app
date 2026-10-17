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
  headerClassName?: string
  titleClassName?: string
  introClassName?: string
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
  headerClassName,
  titleClassName,
  introClassName,
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
          <div
            className={cx(
              'mb-10 max-w-3xl sm:mb-14',
              align === 'center' && 'mx-auto text-center',
              headerClassName,
            )}
          >
            {eyebrow && (
              <p className="mb-3 type-support font-bold tracking-[0.14em] uppercase text-brand">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={headingId}
                className={cx(
                  'font-display type-section font-semibold text-ink',
                  titleClassName,
                )}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p className={cx('mt-4 type-copy text-muted', introClassName)}>
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
