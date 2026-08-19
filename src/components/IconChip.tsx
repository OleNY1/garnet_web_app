import type { LucideIcon } from 'lucide-react'

/* Icon chip tints. Color is decorative only; every chip sits next to text. */
export const tints = {
  brand: { chip: 'bg-brand-soft', icon: 'text-brand' },
  accent: { chip: 'bg-accent-soft', icon: 'text-accent' },
  plum: { chip: 'bg-plum-soft', icon: 'text-plum' },
} as const

export type Tint = keyof typeof tints

export function IconChip({
  icon: Icon,
  tint,
  className,
}: {
  icon: LucideIcon
  tint: Tint
  className?: string
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-2xl ${tints[tint].chip} ${className ?? 'size-12'}`}
    >
      <Icon aria-hidden="true" className={`size-[55%] ${tints[tint].icon}`} />
    </span>
  )
}
