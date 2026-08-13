import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

/** Rounded surface with a subtle border and soft shadow. */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx('rounded-3xl border border-line bg-surface shadow-soft', className)}>
      {children}
    </div>
  )
}
