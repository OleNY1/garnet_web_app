import { BookOpen } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { PageHero } from '../../components/PageHero'

const TABS = [
  { label: 'Overview', to: '/learn', end: true },
  { label: 'Types of testing', to: '/learn/testing-basics' },
  { label: 'How results help your care', to: '/learn/how-it-helps' },
  { label: 'Sharing with family', to: '/learn/family-sharing' },
  { label: 'Kidney donors', to: '/learn/kidney-donation' },
  { label: 'Your rights & choices', to: '/learn/your-rights' },
]

const tabClasses = ({ isActive }: { isActive: boolean }) =>
  `shrink-0 rounded-full px-4 py-2.5 text-[0.95rem] font-medium whitespace-nowrap transition-colors ${
    isActive ? 'bg-brand text-on-brand' : 'bg-surface text-body hover:bg-brand-soft hover:text-ink'
  }`

/**
 * Shared shell for every /learn/* page: one PageHero banner and one row of
 * topic tabs, rendered here so individual topic pages never repeat them.
 */
export function LearnLayout() {
  return (
    <>
      <PageHero
        icon={BookOpen}
        tint="brand"
        eyebrow="Learn"
        title="Learn about genetic testing"
        intro="Plain-language guides to genetic testing for kidney disease, based on published research."
      />

      <div className="border-b border-line bg-surface">
        <nav
          aria-label="Learn topics"
          className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 py-4 sm:px-8"
        >
          {TABS.map((tab) => (
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
