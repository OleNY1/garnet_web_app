import { CircleCheck, CircleX } from 'lucide-react'

const PROTECTED = [
  'Health insurers can\u2019t use it to deny coverage or raise your rates',
  'Most employers can\u2019t use it in hiring, firing, or promotion decisions',
]

const NOT_COVERED = [
  'Life insurance and disability insurance',
  'Very small employers (under 15 people)',
  'The U.S. military and VA benefits',
]

/** Side-by-side view of what GINA protects versus where its coverage stops. */
export function ProtectionGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-line bg-brand-soft p-5 sm:p-6">
        <h4 className="text-[0.95rem] font-bold tracking-[0.08em] text-brand uppercase">
          What GINA protects
        </h4>
        <ul className="mt-3 flex flex-col gap-2.5">
          {PROTECTED.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
              <span className="text-[0.98rem] leading-snug text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-line bg-accent-soft p-5 sm:p-6">
        <h4 className="text-[0.95rem] font-bold tracking-[0.08em] text-accent uppercase">
          Where its coverage stops
        </h4>
        <ul className="mt-3 flex flex-col gap-2.5">
          {NOT_COVERED.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CircleX aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
              <span className="text-[0.98rem] leading-snug text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
