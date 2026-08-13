import type { ReactNode } from 'react'

type StepCardProps = {
  number: number
  title: string
  children: ReactNode
  last?: boolean
}

/** One numbered step in the "How it works" timeline. */
export function StepCard({ number, title, children, last = false }: StepCardProps) {
  return (
    <li className="relative grid grid-cols-[3.25rem_1fr] gap-x-4 pb-9 last:pb-0 sm:gap-x-5">
      {!last && (
        <span
          aria-hidden="true"
          className="absolute top-[3.6rem] bottom-1 left-[1.625rem] w-0.5 -translate-x-1/2 rounded-full bg-line"
        />
      )}
      <span
        aria-hidden="true"
        className="flex size-[3.25rem] items-center justify-center rounded-full bg-brand-soft font-display text-xl font-bold text-brand ring-1 ring-brand/25"
      >
        {number}
      </span>
      <div className="pt-1.5">
        <h3 className="text-xl font-semibold text-ink">
          <span className="sr-only">Step {number}: </span>
          {title}
        </h3>
        <p className="mt-2 max-w-xl text-[1.02rem] leading-relaxed text-body">{children}</p>
      </div>
    </li>
  )
}
