import { BadgeCheck, Compass, HandHeart, Landmark, Search, Stethoscope, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '../../components/Card'
import { CTARow } from '../../components/learn/CTARow'
import { JourneyPicker } from '../../components/learn/JourneyPicker'
import type { Tint } from '../../components/IconChip'
import { IconChip } from '../../components/IconChip'
import { Section } from '../../components/Section'
import { TrustBadge } from '../../components/TrustBadge'

const BENEFITS: Array<{ icon: LucideIcon; tint: Tint; title: string; text: string }> = [
  {
    icon: Search,
    tint: 'brand',
    title: 'Understand the cause',
    text: 'Testing may help explain why kidney disease developed.',
  },
  {
    icon: Users,
    tint: 'accent',
    title: 'Help your family',
    text: 'Results may help relatives understand whether they should ask about testing.',
  },
  {
    icon: HandHeart,
    tint: 'plum',
    title: 'Support living donor decisions',
    text: 'Testing may help guide conversations about family kidney donation.',
  },
  {
    icon: Stethoscope,
    tint: 'brand',
    title: 'Guide care conversations',
    text: 'A genetic diagnosis may help doctors choose better next steps in some cases.',
  },
  {
    icon: Compass,
    tint: 'accent',
    title: 'Find support or research options',
    text: 'Some results may connect patients to support groups, specialists, or clinical trials.',
  },
]

const TRUST_POINTS = [
  'Supported by the National Kidney Foundation',
  'Developed with input from medical researchers and genetic counseling experts',
  'Designed for patients and families',
  'Educational only - not a diagnosis or medical advice',
]

export function Overview() {
  return (
    <>
      <Section id="trust-strip" className="!py-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrustBadge icon={Landmark}>Columbia University Irving Medical Center research project</TrustBadge>
          <TrustBadge icon={BadgeCheck}>Supported by the National Kidney Foundation</TrustBadge>
        </div>
      </Section>

      <Section
        id="find-your-path"
        tone="wash"
        eyebrow="Where are you today?"
        title="Start with what's relevant to you"
        intro="Everyone's informational needs are different depending on where they are in their kidney disease journey. Pick what fits best."
      >
        <JourneyPicker />
      </Section>

      <Section
        id="why-it-matters"
        eyebrow="Why it matters"
        title="How it could help you"
        intro="One question matters most: how could this help you or your family?"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <Card
              key={benefit.title}
              className="scale-100 p-6 transition-transform duration-200 hover:scale-[1.03] sm:p-7"
            >
              <IconChip icon={benefit.icon} tint={benefit.tint} />
              <h3 className="mt-4 text-[1.22rem] leading-snug font-semibold text-ink">
                {benefit.title}
              </h3>
              <p className="mt-2.5 text-[1.02rem] leading-relaxed text-body">{benefit.text}</p>
            </Card>
          ))}
        </div>
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
      </Section>
    </>
  )
}
