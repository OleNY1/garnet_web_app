import { Outlet, useLocation } from 'react-router-dom'
import { GettingStartedHero } from '../../components/learn/GettingStartedHero'
import { PageHero } from '../../components/PageHero'
import { LEARN_TOPICS } from '../../lib/learnTopics'

/**
 * Shared shell for every /learn/* page: a banner driven by the active
 * route. Topic pages are reached from the Getting started cards and the
 * header Learn menu, not from a second tab bar.
 */
export function LearnLayout() {
  const { pathname } = useLocation()
  const activeTab =
    LEARN_TOPICS.find((tab) => (tab.end ? pathname === tab.to : pathname.startsWith(tab.to))) ??
    LEARN_TOPICS[0]
  const isGettingStarted = activeTab.end

  return (
    <>
      {isGettingStarted ? (
        <GettingStartedHero />
      ) : (
        <PageHero
          icon={activeTab.icon}
          tint={activeTab.tint}
          eyebrow={activeTab.eyebrow}
          title={activeTab.title}
          intro={activeTab.intro}
        />
      )}

      <Outlet />
    </>
  )
}
