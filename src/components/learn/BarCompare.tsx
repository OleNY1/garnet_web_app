import type { Tint } from '../IconChip'
import { tints } from '../IconChip'

type Row = {
  label: string
  percent: number
  display: string
}

const fillClasses: Record<Tint, string> = {
  brand: 'bg-brand',
  accent: 'bg-accent',
  plum: 'bg-plum',
}

/** Horizontal proportion bars, for visualizing cited percentages side by side. */
export function BarCompare({ tint, rows }: { tint: Tint; rows: Row[] }) {
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="text-[0.98rem] font-medium text-ink">{row.label}</span>
            <span className={`shrink-0 font-display text-[1.05rem] font-bold ${tints[tint].icon}`}>
              {row.display}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-wash">
            <div
              className={`h-full rounded-full ${fillClasses[tint]}`}
              style={{ width: `${Math.min(100, Math.max(4, row.percent))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
