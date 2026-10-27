import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { LearnTopic } from '../../lib/learnTopics'
import { LEARN_TOPICS } from '../../lib/learnTopics'

function PagerLink({ topic, direction }: { topic: LearnTopic; direction: 'back' | 'next' }) {
  const isNext = direction === 'next'
  return (
    <Link
      to={topic.to}
      className={`group flex flex-1 flex-col gap-1 rounded-2xl border border-line bg-surface px-5 py-4 shadow-soft transition-colors duration-150 hover:border-brand/60 ${
        isNext ? 'items-end text-right' : 'items-start text-left'
      }`}
    >
      <span className="inline-flex items-center gap-1.5 type-support font-semibold text-brand">
        {isNext ? null : <ArrowLeft aria-hidden="true" className="size-4" />}
        {isNext ? 'Next' : 'Back'}
        {isNext ? <ArrowRight aria-hidden="true" className="size-4" /> : null}
      </span>
      <span className="type-copy leading-snug font-semibold text-ink group-hover:text-brand-strong">
        {topic.label}
      </span>
    </Link>
  )
}

/**
 * Back / Next buttons at the bottom of every Learn page, following the
 * Learn menu order, so a reader can go through the pages one after another.
 */
export function LearnPager({ path }: { path: string }) {
  const index = LEARN_TOPICS.findIndex((topic) => topic.to === path)
  if (index < 0) return null
  const back = index > 0 ? LEARN_TOPICS[index - 1] : undefined
  const next = index < LEARN_TOPICS.length - 1 ? LEARN_TOPICS[index + 1] : undefined

  return (
    <nav aria-label="Learn pages" className="border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 py-10 sm:flex-row sm:px-8">
        {back ? <PagerLink topic={back} direction="back" /> : <span className="hidden flex-1 sm:block" />}
        {next ? <PagerLink topic={next} direction="next" /> : <span className="hidden flex-1 sm:block" />}
      </div>
    </nav>
  )
}
