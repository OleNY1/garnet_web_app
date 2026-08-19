import { BookOpen, HandHeart, ShieldCheck, Stethoscope, TestTubes, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import type { Tint } from '../../components/IconChip'
import { PageHero } from '../../components/PageHero'

type LearnTab = {
  label: string
  to: string
  end: boolean
  icon: LucideIcon
  tint: Tint
  eyebrow: string
  title: string
  intro: string
}

/**
 * Each topic gets its own icon, tint, and hero copy — rendered dynamically
 * below based on the active route. Content shifts color as you move
 * between topics, while the tab nav underneath stays visually neutral so
 * it always reads as the stable, clickable wayfinding element.
 */
const TABS: LearnTab[] = [
  {
    label: 'Overview',
    to: '/learn',
    end: true,
    icon: BookOpen,
    tint: 'brand',
    eyebrow: 'Start here',
    title: 'Why genetic testing may matter for you and your family',
    intro:
      'Plain-language guides to genetic testing for kidney disease, based on published research.',
  },
  {
    label: 'Types of testing',
    to: '/learn/testing-basics',
    end: false,
    icon: TestTubes,
    tint: 'accent',
    eyebrow: 'Types of testing',
    title: 'A quick, simple test — not a scary procedure',
    intro:
      "Genetic testing usually starts with a cheek swab, not a complicated procedure. Here's what it looks like and what results can and can't tell you.",
  },
  {
    label: 'How results help your care',
    to: '/learn/how-it-helps',
    end: false,
    icon: Stethoscope,
    tint: 'brand',
    eyebrow: 'How results help',
    title: 'How a result can guide your care',
    intro: 'For many patients, a single result changes what happens next with their care team.',
  },
  {
    label: 'Sharing with family',
    to: '/learn/family-sharing',
    end: false,
    icon: Users,
    tint: 'accent',
    eyebrow: 'Sharing with family',
    title: 'Sharing results with the people who share your DNA',
    intro: 'A result about you is sometimes a result about your relatives, too.',
  },
  {
    label: 'Kidney donors',
    to: '/learn/kidney-donation',
    end: false,
    icon: HandHeart,
    tint: 'plum',
    eyebrow: 'Kidney donors',
    title: "If you're considering donating a kidney",
    intro: 'What genetic testing means for donor candidates, and why the order of testing matters.',
  },
  {
    label: 'Your rights & choices',
    to: '/learn/your-rights',
    end: false,
    icon: ShieldCheck,
    tint: 'plum',
    eyebrow: 'Your rights & choices',
    title: 'Your rights, privacy, and choices',
    intro:
      "It's normal to wonder who can see a result and what happens to your DNA afterward. Here's what's protected — and where the gaps are.",
  },
]

const tabClasses = ({ isActive }: { isActive: boolean }) =>
  `shrink-0 rounded-full px-4 py-2.5 text-[0.95rem] font-medium whitespace-nowrap transition-colors ${
    isActive ? 'bg-brand text-on-brand' : 'bg-surface text-body hover:bg-brand-soft hover:text-ink'
  }`

/**
 * Shared shell for every /learn/* page: a topic-colored hero (content
 * driven by the active route) and one row of topic tabs, rendered here so
 * individual topic pages never repeat them.
 */
export function LearnLayout() {
  const { pathname } = useLocation()
  const activeTab =
    TABS.find((tab) => (tab.end ? pathname === tab.to : pathname.startsWith(tab.to))) ?? TABS[0]

  return (
    <>
      <PageHero
        icon={activeTab.icon}
        tint={activeTab.tint}
        eyebrow={activeTab.eyebrow}
        title={activeTab.title}
        intro={activeTab.intro}
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
