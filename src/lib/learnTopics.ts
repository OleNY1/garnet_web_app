import { BookOpen, HandHeart, Layers, ShieldCheck, Stethoscope, TestTubes, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Tint } from '../components/IconChip'

export type LearnTopic = {
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
 * Single source of truth for every /learn/* subpage: used to build the
 * header's hover dropdown, the in-page tab strip, and each page's
 * topic-colored hero. Keeping one list means the nav and the Learn section
 * itself can never drift out of sync.
 */
export const LEARN_TOPICS: LearnTopic[] = [
  {
    label: 'Getting started',
    to: '/learn',
    end: true,
    icon: BookOpen,
    tint: 'brand',
    eyebrow: 'Getting started',
    title: 'Why genetic testing may matter for you and your family',
    intro: 'Guides to genetic testing for kidney disease, based on published research.',
  },
  {
    label: 'How testing works',
    to: '/learn/testing-basics',
    end: false,
    icon: TestTubes,
    tint: 'accent',
    eyebrow: 'How testing works',
    title: 'How a sample is collected, and what it looks for',
    intro:
      'Most tests start with a cheek swab. The lab then looks at genes that can be linked to kidney disease.',
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
  {
    label: 'Types of tests',
    to: '/learn/types-of-tests',
    end: false,
    icon: Layers,
    tint: 'accent',
    eyebrow: 'Types of tests',
    title: 'Different tests look at different amounts of DNA',
    intro: 'Your doctor or a genetic counselor can help choose the test that fits your situation.',
  },
]
