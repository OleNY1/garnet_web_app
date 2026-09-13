import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** Inline styled link for pointing from one /learn/* page's body text to another. */
export function LearnLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="font-semibold text-brand underline underline-offset-2 transition-colors hover:text-brand-strong"
    >
      {children}
    </Link>
  )
}
