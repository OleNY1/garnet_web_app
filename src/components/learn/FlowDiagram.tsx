import { ArrowDown, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Tint } from '../IconChip'
import { tints } from '../IconChip'

type Step = {
  icon: LucideIcon
  label: string
  caption: string
}

/** Connected step sequence — for processes with a real order (testing types, donor pathway). */
export function FlowDiagram({ tint, steps }: { tint: Tint; steps: Step[] }) {
  return (
    <div className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-start sm:gap-0">
      {steps.map((step, index) => (
        <div key={step.label} className="flex flex-1 flex-col items-center sm:flex-row">
          <div className="flex w-full scale-100 flex-col items-center rounded-2xl border border-line bg-surface p-5 text-center transition-transform duration-200 hover:scale-[1.03]">
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${tints[tint].chip}`}
            >
              <step.icon aria-hidden="true" className={`size-[55%] ${tints[tint].icon}`} />
            </span>
            <p className="mt-3 text-[1rem] leading-snug font-semibold text-ink">{step.label}</p>
            <p className="mt-1.5 text-[0.9rem] leading-snug text-muted">{step.caption}</p>
          </div>
          {index < steps.length - 1 && (
            <>
              <ArrowDown aria-hidden="true" className="my-2 size-5 shrink-0 text-muted sm:hidden" />
              <ArrowRight
                aria-hidden="true"
                className="mx-2 hidden size-5 shrink-0 self-center text-muted sm:block"
              />
            </>
          )}
        </div>
      ))}
    </div>
  )
}
