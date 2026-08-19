import type { Tint } from '../IconChip'
import { tints } from '../IconChip'

type Stat = {
  value: string
  label: string
}

/**
 * Big-number stat cards. Used to visualize a figure already cited in the
 * surrounding text (never a new, uncited claim) so a skimming reader gets
 * the headline number before deciding whether to read the paragraph.
 */
export function StatGrid({ tint, stats }: { tint: Tint; stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`scale-100 rounded-2xl border border-line ${tints[tint].chip} p-5 text-center transition-transform duration-200 hover:scale-[1.04] sm:p-6`}
        >
          <p className={`font-display text-[2rem] leading-none font-bold sm:text-[2.3rem] ${tints[tint].icon}`}>
            {stat.value}
          </p>
          <p className="mt-2.5 text-[0.95rem] leading-snug font-medium text-ink">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
