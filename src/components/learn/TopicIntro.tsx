import { LEARN_TOPICS } from '../../lib/learnTopics'

/**
 * The page's one-line description, shown as the first line of the page
 * body (Hila, Oct 2026) instead of under the banner title.
 */
export function TopicIntro({ path }: { path: string }) {
  const topic = LEARN_TOPICS.find((t) => t.to === path)
  if (!topic) return null
  return <p className="font-semibold text-ink">{topic.intro}</p>
}
