import { ArrowDown, Dna, House, ListChecks, MessagesSquare, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Tint } from './IconChip'
import { IconChip } from './IconChip'

const ENTRY_POINTS: Array<{ icon: LucideIcon; tint: Tint; label: string }> = [
  { icon: House, tint: 'brand', label: 'Primary care provider or family doctor' },
  { icon: Stethoscope, tint: 'accent', label: 'Nephrologist' },
  { icon: MessagesSquare, tint: 'plum', label: 'Genetic counselor' },
  { icon: ListChecks, tint: 'brand', label: 'Genetic Risk Check, shared with your doctor' },
]

/**
 * "The path to the test": several possible starting points, all leading to
 * genetic testing. Lines converge on wider screens; on phones the cards
 * stack and a single arrow leads down to the test.
 */
export function PathToTestFigure() {
  return (
    <figure className="mx-auto w-full max-w-3xl" aria-label="Several starting points that all lead to genetic testing">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ENTRY_POINTS.map((entry) => (
          <li
            key={entry.label}
            className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-center shadow-soft"
          >
            <IconChip icon={entry.icon} tint={entry.tint} className="size-11" />
            <span className="type-support leading-snug font-semibold text-ink">{entry.label}</span>
          </li>
        ))}
      </ul>

      {/* Converging lines from each of the four cards to the test (wider screens). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="hidden h-14 w-full text-brand/50 sm:block"
      >
        {[50, 150, 250, 350].map((x) => (
          <path
            key={x}
            d={`M ${x} 0 C ${x} 30, 200 30, 200 60`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="flex justify-center py-3 sm:hidden">
        <ArrowDown aria-hidden="true" className="size-7 text-brand/60" />
      </div>

      <div className="mx-auto flex max-w-sm items-center justify-center gap-3 rounded-2xl border-2 border-brand bg-brand-soft px-6 py-4">
        <Dna aria-hidden="true" className="size-7 shrink-0 text-brand" />
        <span className="type-sub font-semibold text-ink">Genetic testing</span>
      </div>
    </figure>
  )
}
