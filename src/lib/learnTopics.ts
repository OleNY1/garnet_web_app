import {
  BookOpen,
  Dna,
  FlaskConical,
  HandHeart,
  HeartHandshake,
  Layers,
  Lightbulb,
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
    label: 'Discover why',
    to: '/learn/discover-why',
    end: false,
    icon: Lightbulb,
    tint: 'brand',
    eyebrow: 'Discover why',
    title: 'Discover why your kidney disease happened',
    intro:
      'A genetic cause is behind some kidney disease. Finding it can confirm or correct a diagnosis.',
  },
  {
    label: 'Guide care',
    to: '/learn/guide-care',
    end: false,
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
    icon: HandHeart,
    tint: 'plum',
    eyebrow: 'Support living donor decisions',
    title: 'Support living donor decisions',
    intro: 'Testing can help identify relatives who did not inherit the genetic cause.',
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
    icon: Layers,
    tint: 'accent',
    eyebrow: 'Types of tests',
    title: 'Different tests look at different amounts of DNA',
    intro: 'Your doctor or a genetic counselor can help choose the test that fits your situation.',
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
