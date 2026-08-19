import { Sparkles } from 'lucide-react'

/**
 * Patients in the flyer study said seeing testing shown as a quick cheek
 * swab — instead of a blood draw or "medical procedure" — made it feel
 * less intimidating. This banner leads with that framing wherever testing
 * is first introduced.
 */
export function SimplicityBanner() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-accent/25 bg-accent-soft p-5 sm:p-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface text-accent shadow-soft">
        <Sparkles aria-hidden="true" className="size-5.5" />
      </span>
      <p className="text-[1.02rem] leading-snug font-medium text-ink">
        For most people, testing means a quick cheek swab — not a blood draw or a procedure.
      </p>
    </div>
  )
}
