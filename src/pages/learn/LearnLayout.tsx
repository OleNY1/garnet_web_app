import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { GettingStartedHero } from '../../components/learn/GettingStartedHero'
import { PageHero } from '../../components/PageHero'
import { LEARN_TOPICS } from '../../lib/learnTopics'

const tabClasses = ({ isActive }: { isActive: boolean }) =>
  `shrink-0 rounded-full px-4 py-2.5 text-[0.95rem] font-medium whitespace-nowrap transition-all duration-150 hover:scale-105 ${
    isActive ? 'bg-brand text-on-brand' : 'bg-surface text-body hover:bg-brand-soft hover:text-ink'
  }`

/**
 * Shared shell for every /learn/* page: a banner (content driven by the
 * active route) and one row of topic tabs, rendered here so individual
 * topic pages never repeat them.
 *
 * The Getting Started tab is a special case: instead of the standard
 * colored PageHero every other topic gets, it shows the full video hero
 * banner (GettingStartedHero) in that same slot, directly above the tab
 * strip — so it reads as the site's main entry banner while still living
 * on the Getting Started tab.
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

      <div className="border-b border-line bg-surface">
        <nav
          aria-label="Learn topics"
          className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 py-4 sm:px-8"
        >
          {LEARN_TOPICS.map((tab) => (
            <NavLink key={tab.to} to={tab.to} end={tab.end} className={tabClasses}>
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <Outlet />
    </>
  )
}
