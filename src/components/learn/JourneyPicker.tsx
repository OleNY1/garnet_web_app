import { Compass, HandHeart, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Tint } from '../IconChip'
import { IconChip } from '../IconChip'

/**
 * The more useful split is whether a genetic cause has already been named,
 * not how long someone has had kidney disease. Visitors self-sort into the
 * Learn page most relevant to that starting point.
 */
const PATHS: Array<{ icon: LucideIcon; tint: Tint; title: string; text: string; to: string }> = [
  {
    icon: Compass,
    tint: 'brand',
    title: 'No genetic diagnosis yet',
    text: 'Learn what testing looks for and what a result can tell you.',
    to: '/learn/testing-basics',
  },
  {
    icon: Stethoscope,
    tint: 'accent',
    title: 'Already have a genetic diagnosis',
    text: 'See how a result can guide care and family conversations.',
    to: '/learn/how-it-helps',
  },
  {
    icon: HandHeart,
    tint: 'plum',
    title: 'Thinking about family or donation',
    text: 'Learn how to share a result with relatives, or what it means for a living donor.',
    to: '/learn/family-sharing',
  },
]

export function JourneyPicker() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PATHS.map((path) => (
        <Link
          key={path.title}
          to={path.to}
          className="group flex scale-100 flex-col rounded-2xl border border-line bg-surface p-5 shadow-soft transition-all duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] hover:shadow-lift sm:p-6"
        >
          <IconChip icon={path.icon} tint={path.tint} />
          <p className="mt-4 text-[1.05rem] leading-snug font-semibold text-ink">{path.title}</p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{path.text}</p>
        </Link>
      ))}
    </div>
  )
}
