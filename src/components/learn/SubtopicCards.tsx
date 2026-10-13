import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { subtopicsOf } from '../../lib/learnTopics'
import { IconChip } from '../IconChip'

/** Cards linking a Learn page to the sub-pages listed under it in the Learn menu. */
export function SubtopicCards({ parent, title = 'Read more on this topic' }: { parent: string; title?: string }) {
  const topics = subtopicsOf(parent)
  if (!topics.length) return null

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <h2 className="font-display text-[1.5rem] font-semibold text-ink sm:text-[1.7rem]">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link
            key={topic.to}
            to={topic.to}
            className="group flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-soft transition-colors duration-150 hover:border-brand/60"
          >
            <IconChip icon={topic.icon} tint={topic.tint} />
            <span className="mt-4 text-[1.15rem] leading-snug font-semibold text-ink group-hover:text-brand-strong">
              {topic.label}
            </span>
            <span className="mt-2 text-[1rem] leading-relaxed text-body">{topic.intro}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[0.95rem] font-semibold text-brand">
              Read more
              <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
