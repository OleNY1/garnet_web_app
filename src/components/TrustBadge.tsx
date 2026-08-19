import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

/** Small pill used for credibility cues ("Columbia research project", etc.). */
export function TrustBadge({
  icon: Icon,
  className,
  children,
}: {
  icon?: LucideIcon
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-[0.95rem] font-medium text-ink shadow-soft transition-transform duration-150 hover:scale-105',
        className,
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-[1.15rem] shrink-0 text-brand" />}
      <span>{children}</span>
    </span>
  )
}
