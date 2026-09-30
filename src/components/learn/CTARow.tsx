import { ArrowRight } from 'lucide-react'
import { Button } from '../Button'
import type { Tint } from '../IconChip'
import { tints } from '../IconChip'

/**
 * Next-step prompt. Shown only at the end of the Discover why page so the
 * rest of the site doesn't feel like it's pushing people toward testing;
 * the Genetic Risk Check stays one tap away in the header on every page.
 */
export function CTARow({ tint }: { tint: Tint }) {
  return (
    <div className={`mt-12 flex flex-col items-start gap-4 rounded-2xl ${tints[tint].chip} p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7`}>
      <p className="text-[1.05rem] leading-snug font-semibold text-ink">
        Ready to see if this applies to you?
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button href="/check" variant="secondary" size="md" className="whitespace-nowrap">
          Genetic Risk Check
          <ArrowRight aria-hidden="true" className="size-4.5" />
        </Button>
        <Button href="/next-steps" variant="quiet" size="md" className="whitespace-nowrap">
          How to get tested
        </Button>
      </div>
    </div>
  )
}
