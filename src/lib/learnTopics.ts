import {
  BookOpen,
  CircleHelp,
  Dna,
  FileText,
  FlaskConical,
  Globe,
  HandHeart,
  HeartHandshake,
  Layers,
  Lightbulb,
  Percent,
  MessagesSquare,
  Search,
  ShieldCheck,
  Stethoscope,
  TestTubes,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Tint } from '../components/IconChip'

export type LearnTopic = {
  label: string
  to: string
  end: boolean
  /** Set on sub-pages: the page they sit under in the Learn menu. */
  parent?: string
  icon: LucideIcon
  tint: Tint
  eyebrow: string
  title: string
  intro: string
}

/**
 * Single source of truth for every /learn/* subpage: used to build the
 * header's hover dropdown, the Getting started topic cards, and each
 * page's topic-colored hero.
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
    label: 'How common?',
    to: '/learn/how-common',
    end: false,
    icon: Percent,
    tint: 'brand',
    eyebrow: 'How common?',
    title: 'How common is a genetic cause of kidney disease?',
    intro: 'A genetic cause is behind some kidney disease, in adults and in children.',
  },
  {
    label: 'How can genetic testing help?',
    to: '/learn/how-testing-helps',
    end: false,
    icon: Lightbulb,
    tint: 'brand',
    eyebrow: 'How can genetic testing help?',
    title: 'How can genetic testing help?',
    intro: 'Finding a genetic cause can confirm or correct a diagnosis, guide your care, and help your family.',
  },
  {
    label: 'Guide care',
    to: '/learn/guide-care',
    end: false,
    parent: '/learn/how-testing-helps',
    icon: Stethoscope,
    tint: 'accent',
    eyebrow: 'Guide care',
    title: 'How a genetic result can guide your care',
    intro: 'Knowing the exact cause can help your care team start, avoid, or switch a treatment.',
  },
  {
    label: 'Help your family',
    to: '/learn/help-your-family',
    end: false,
    parent: '/learn/how-testing-helps',
    icon: Users,
    tint: 'plum',
    eyebrow: 'Help your family',
    title: 'How your result can help your family',
    intro:
      'A genetic cause can help relatives be diagnosed early, plan a family, and find safe living donors.',
  },
  {
    label: 'Support living donor decisions',
    to: '/learn/kidney-donation',
    end: false,
    parent: '/learn/how-testing-helps',
    icon: HandHeart,
    tint: 'plum',
    eyebrow: 'Support living donor decisions',
    title: 'Support living donor decisions',
    intro: 'Testing can help identify relatives who did not inherit the genetic cause.',
  },
  {
    label: 'Signs testing may help',
    to: '/learn/signs-testing-may-help',
    end: false,
    icon: Search,
    tint: 'brand',
    eyebrow: 'Signs testing may help',
    title: 'Signs testing may help',
    intro:
      'These signs make it more likely that testing will find a genetic cause. They do not guarantee a result.',
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
    label: 'Types of tests',
    to: '/learn/types-of-tests',
    end: false,
    parent: '/learn/testing-basics',
    icon: Layers,
    tint: 'accent',
    eyebrow: 'Types of tests',
    title: 'Different tests look at different amounts of DNA',
    intro: 'Your doctor or a genetic counselor can help choose the test that fits your situation.',
  },
  {
    label: 'Genetic counselors',
    to: '/learn/genetic-counselors',
    end: false,
    icon: MessagesSquare,
    tint: 'brand',
    eyebrow: 'Genetic counselors',
    title: 'Who genetic counselors are, and what a session looks like',
    intro:
      'Genetic counselors help you decide about testing, understand your result, and share it with family.',
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
      "It's normal to wonder who can see a result and what happens to your DNA afterward.",
  },
  {
    label: 'APOL1',
    to: '/learn/apol1',
    end: false,
    icon: Globe,
    tint: 'plum',
    eyebrow: 'APOL1',
    title: 'APOL1 risk factor',
    intro: 'Increased risk of having APOL1-Mediated Kidney Disease (AMKD)',
  },
  {
    label: 'Understanding your genetic test report',
    to: '/learn/uncertain-results',
    end: false,
    icon: FileText,
    tint: 'accent',
    eyebrow: 'Understanding your genetic test report',
    title: 'Understanding your genetic test report',
    intro: 'Genetic reports usually include the conclusion of the test: Positive or Negative.',
  },
  {
    label: 'What a VUS means',
    to: '/learn/vus',
    end: false,
    parent: '/learn/uncertain-results',
    icon: CircleHelp,
    tint: 'accent',
    eyebrow: 'What a VUS means',
    title: 'Variants of Uncertain Significance (VUS)',
    intro:
      'Variants of Uncertain Significance are changes that geneticists cannot yet classify as harmful or harmless.',
  },
  {
    label: 'Sharing with family',
    to: '/learn/family-sharing',
    end: false,
    icon: Dna,
    tint: 'accent',
    eyebrow: 'Sharing with family',
    title: 'Why sharing your result with family matters',
    intro: 'A result about you is sometimes a result about your relatives, too.',
  },
  {
    label: 'Find a support group',
    to: '/learn/support-groups',
    end: false,
    icon: HeartHandshake,
    tint: 'accent',
    eyebrow: 'Find a support group',
    title: 'Find a support group',
    intro: "Connect with other patients who understand what it's like to live with your condition.",
  },
  {
    label: 'Explore research opportunities',
    to: '/learn/research-opportunities',
    end: false,
    icon: FlaskConical,
    tint: 'plum',
    eyebrow: 'Explore research opportunities',
    title: 'Explore research opportunities',
    intro: 'See whether a relevant clinical trial or research study is currently open to join.',
  },
]

/** Top-level Learn pages (excluding Getting started), in menu order. */
export const LEARN_MAIN_TOPICS = LEARN_TOPICS.filter((topic) => !topic.end && !topic.parent)

/** Sub-pages listed under a Learn page, in menu order. */
export function subtopicsOf(path: string): LearnTopic[] {
  return LEARN_TOPICS.filter((topic) => topic.parent === path)
}
