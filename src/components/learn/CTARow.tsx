import { ArrowRight } from 'lucide-react'
import { Button } from '../Button'
import type { Tint } from '../IconChip'
import { tints } from '../IconChip'

/**
 * Patients in the flyer study wanted a way to move from awareness to
 * action on their own, without waiting on a doctor. Every Learn article
 * ends with this so the next step is never more than one tap away.
 */
export function CTARow({ tint }: { tint: Tint }) {
  return (
    <div className={`mt-12 flex flex-col items-start gap-4 rounded-2xl ${tints[tint].chip} p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7`}>
      <p className="text-[1.05rem] leading-snug font-semibold text-ink">
        Ready to see if this applies to you?
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button href="/check" variant="secondary" size="md">
          Check if testing may help
          <ArrowRight aria-hidden="true" className="size-4.5" />
        </Button>
        <Button href="/next-steps" variant="quiet" size="md">
          See next steps
        </Button>
      </div>
    </div>
  )
}
