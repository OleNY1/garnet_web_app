import { BadgeCheck, Landmark, Signpost } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/Card'
import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { JourneyPicker } from '../../components/learn/JourneyPicker'
import { Sources } from '../../components/Sources'
import type { Tint } from '../../components/IconChip'
import { IconChip } from '../../components/IconChip'
import { Section } from '../../components/Section'
import { LEARN_TOPICS } from '../../lib/learnTopics'

type TopicCardData = {
  label: string
  to: string
  icon: LucideIcon
  tint: Tint
  intro: string
}

const TOPIC_CARDS: TopicCardData[] = [
  ...LEARN_TOPICS.filter((topic) => !topic.end).map((topic) => ({
    label: topic.label,
    to: topic.to,
    icon: topic.icon,
    tint: topic.tint,
    intro: topic.intro,
  })),
  {
    label: 'How to get tested',
    to: '/next-steps',
    icon: Signpost,
    tint: 'plum',
    intro:
      'Learn how to talk with your doctor or a genetic counselor, ask about cost, and prepare for testing.',
  },
]

const TRUST_POINTS = [
  'Supported by the National Kidney Foundation',
  'Columbia University Irving Medical Center research project',
  'Developed with input from medical researchers and genetic counseling experts',
  'Designed for patients and families',
  'Educational only - not a diagnosis or medical advice',
]

function TopicCard({ topic }: { topic: TopicCardData }) {
  return (
    <Link
      to={topic.to}
      className="scale-100 rounded-3xl border border-line bg-surface p-6 shadow-soft transition-transform duration-200 hover:scale-[1.03] hover:shadow-lift sm:p-7"
    >
      <IconChip icon={topic.icon} tint={topic.tint} />
      <h3 className="mt-4 text-[1.22rem] leading-snug font-semibold text-ink">{topic.label}</h3>
      <p className="mt-2.5 text-[1.02rem] leading-relaxed text-body">{topic.intro}</p>
    </Link>
  )
}

/**
 * The video hero banner is rendered by LearnLayout. This page picks up
 * right where that banner leaves off.
 */
export function Overview() {
  return (
    <>
      <Section
        id="why-it-matters"
        headerClassName="max-w-6xl"
        titleClassName="sm:whitespace-nowrap sm:text-[2.05rem] lg:text-[2.25rem]"
        eyebrow="Why it matters"
        title="How genetic testing could help you or your family?"
      >
        <p className="mx-auto mb-10 max-w-6xl text-center text-xl leading-snug text-body sm:mb-12">
          <span className="block">Genetic causes explain a meaningful share of kidney disease.</span>
          <span className="mt-1 block tracking-tight min-[1100px]:whitespace-nowrap">
            Studies suggest a genetic cause is behind kidney failure in roughly 10% to 15% of
            adults, and in as many as 7 in 10 children.
            <Cite n={1} />
          </span>
        </p>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {TOPIC_CARDS.map((topic) => (
            <TopicCard key={topic.to} topic={topic} />
          ))}
        </div>
      </Section>

      <Section
        id="find-your-path"
        tone="wash"
        headerClassName="max-w-6xl"
        introClassName="sm:whitespace-nowrap sm:text-lg"
        eyebrow="Where are you today?"
        title="Start with what's relevant to you"
        intro="The information you need depends on whether a genetic cause has already been named. Pick what fits you."
      >
        <JourneyPicker />
      </Section>

      <Section
        id="about"
        tone="warm"
        eyebrow="Who is behind GARNET"
        title="Built with patient education and trust in mind"
      >
        <Card className="bg-gradient-to-br from-surface to-wash-warm p-7 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-lg leading-relaxed text-body">
                GARNET is being created as part of a research project at Columbia University Irving
                Medical Center. Medical researchers and genetic counseling experts help shape the
                information you read here for patients and families.
              </p>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft">
                  <Landmark aria-hidden="true" className="size-6 text-brand" />
                </span>
                <div>
                  <p className="font-semibold text-ink">
                    Columbia University Irving Medical Center
                  </p>
                  <p className="text-[0.95rem] text-muted">GARNET research project affiliation</p>
                </div>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3.5">
                  <BadgeCheck aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand" />
                  <span className="text-[1.05rem] leading-normal font-medium text-ink">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="mx-auto mt-10 max-w-3xl">
          <CTARow tint="brand" />
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Groopman, E. & Milo Rasouly, H. Navigating genetic testing in nephrology: options and decision-making strategies. Kidney International Reports 10, 673-695 (2025).',
              url: 'https://doi.org/10.1016/j.ekir.2024.12.020',
            },
          ]}
        />
      </Section>
    </>
  )
}
