import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Compass,
  HandHeart,
  HeartHandshake,
  Info,
  Landmark,
  ListChecks,
  MessagesSquare,
  Search,
  ShieldCheck,
  Signpost,
  Stethoscope,
  TestTubes,
  Users,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { HeroVideo } from '../components/HeroVideo'
import { Section } from '../components/Section'
import { StepCard } from '../components/StepCard'
import { TrustBadge } from '../components/TrustBadge'

/* Icon chip tints. Color is decorative only; every chip sits next to text. */
const tints = {
  brand: { chip: 'bg-brand-soft', icon: 'text-brand' },
  accent: { chip: 'bg-accent-soft', icon: 'text-accent' },
  plum: { chip: 'bg-plum-soft', icon: 'text-plum' },
} as const

type Tint = keyof typeof tints

function IconChip({ icon: Icon, tint, className }: { icon: LucideIcon; tint: Tint; className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-2xl ${tints[tint].chip} ${className ?? 'size-12'}`}
    >
      <Icon aria-hidden="true" className={`size-[55%] ${tints[tint].icon}`} />
    </span>
  )
}

const HERO_FEATURES: Array<{ icon: LucideIcon; tint: Tint; label: string; sub: string }> = [
  {
    icon: BookOpen,
    tint: 'brand',
    label: 'Plain-language guides',
    sub: 'Short reads in everyday words.',
  },
  {
    icon: ListChecks,
    tint: 'accent',
    label: 'A short question check',
    sub: 'See if testing may be worth discussing.',
  },
  {
    icon: MessagesSquare,
    tint: 'plum',
    label: 'Help talking with your care team',
    sub: 'Questions to ask your doctor or a genetic counselor.',
  },
  {
    icon: ShieldCheck,
    tint: 'brand',
    label: 'Privacy, cost, and your rights',
    sub: 'Plain answers about protections and cost.',
  },
]

/* These buttons will point to dedicated pages once they are built. */
const PATHS: Array<{ icon: LucideIcon; tint: Tint; title: string; text: string; cta: string; href: string }> = [
  {
    icon: BookOpen,
    tint: 'brand',
    title: 'Learn about genetic testing',
    text: 'Understand what genetic testing is, how it works, and what it can and cannot tell you.',
    cta: 'Learn more',
    href: '/learn',
  },
  {
    icon: ListChecks,
    tint: 'accent',
    title: 'Check if testing may help',
    text: 'Answer simple questions about your kidney disease, family history, and related health signs.',
    cta: 'Start check',
    href: '/check',
  },
  {
    icon: Signpost,
    tint: 'plum',
    title: 'Understand next steps',
    text: 'Learn how to talk with your doctor or a genetic counselor, ask about cost, and prepare for testing.',
    cta: 'See next steps',
    href: '/next-steps',
  },
]

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

const STEPS = [
  { title: 'Learn', text: 'Read simple information about genetic testing and counseling.' },
  { title: 'Answer questions', text: 'Check whether genetic testing may be worth discussing.' },
  {
    title: 'Talk with a professional',
    text: 'Use what you learned to speak with your doctor or a genetic counselor.',
  },
  { title: 'Ask about cost', text: 'Insurance and financial assistance may be available.' },
  {
    title: 'Give a sample',
    text: 'Testing can often be as easy as a cheek swab or saliva sample.',
  },
]

const TRUST_POINTS = [
  'Created as part of a Columbia medical research project',
  'Developed with input from medical researchers and genetic counseling experts',
  'Designed for patients and families',
  'Educational only - not a diagnosis or medical advice',
]

export function LandingPage() {
  return (
    <>
      {/* ============ 2. Hero ============ */}
      <section id="top" aria-labelledby="hero-heading" className="hero-wash relative overflow-hidden">
        <HeroVideo />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <TrustBadge icon={Landmark}>
              Created as part of a Columbia medical research project.
            </TrustBadge>
            <h1
              id="hero-heading"
              className="mt-6 font-display text-[2.3rem] leading-[1.12] font-semibold text-ink sm:text-5xl sm:leading-[1.08] lg:text-[3.35rem]"
            >
              Could genetic testing help you or your family understand kidney disease?
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body sm:text-xl">
              GARNET helps people with kidney disease learn about genetic testing, understand
              whether it may be worth discussing, and prepare for a conversation with a doctor or
              genetic counselor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="#learn">Start learning</Button>
              <Button href="#check" variant="secondary">
                Check if testing may help
              </Button>
            </div>
            <p className="mt-6 flex max-w-xl items-start gap-2.5 text-[0.99rem] leading-normal text-muted">
              <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
              GARNET is for education only. It does not provide a diagnosis or medical advice.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-8 size-56 rounded-full bg-brand/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -left-10 size-56 rounded-full bg-accent/15 blur-3xl"
            />
            <Card className="relative bg-gradient-to-br from-surface to-wash-warm p-6 sm:p-8">
              <p className="font-display text-xl font-semibold text-ink">
                What you’ll find on GARNET
              </p>
              <ul className="mt-6 flex flex-col gap-5">
                {HERO_FEATURES.map((feature) => (
                  <li key={feature.label} className="flex items-start gap-4">
                    <IconChip icon={feature.icon} tint={feature.tint} className="size-11 rounded-xl" />
                    <div>
                      <p className="text-[1.05rem] font-semibold text-ink">{feature.label}</p>
                      <p className="text-[0.98rem] text-muted">{feature.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex items-center gap-3 border-t border-line pt-5 text-[0.95rem] font-medium text-muted">
                <HeartHandshake aria-hidden="true" className="size-5 shrink-0 text-accent" />
                Made for patients and families.
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ 3. Three main path cards ============ */}
      <Section
        id="learn"
        eyebrow="Start here"
        title="Choose where to begin"
        intro="Three simple paths, made for patients and families."
      >
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {PATHS.map((path) => (
            <Card
              key={path.title}
              className="flex flex-col p-6 transition-all duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lift sm:p-7 lg:p-8"
            >
              <IconChip icon={path.icon} tint={path.tint} className="size-[3.25rem]" />
              <h3 className="mt-5 font-display text-[1.4rem] leading-snug font-semibold text-ink">
                {path.title}
              </h3>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-body">{path.text}</p>
              <div className="mt-auto pt-7">
                <Button href={path.href} variant="secondary" size="md" className="w-full">
                  {path.cta}
                  <ArrowRight aria-hidden="true" className="size-4.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============ 4. Why this may matter ============ */}
      <Section
        id="why-it-matters"
        tone="wash"
        eyebrow="Why it matters"
        title="Why genetic testing may matter"
        intro="One question matters most: how could this help you or your family?"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <Card key={benefit.title} className="p-6 sm:p-7">
              <IconChip icon={benefit.icon} tint={benefit.tint} />
              <h3 className="mt-4 text-[1.22rem] leading-snug font-semibold text-ink">
                {benefit.title}
              </h3>
              <p className="mt-2.5 text-[1.02rem] leading-relaxed text-body">{benefit.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============ 5. Simple process ("How it works") ============ */}
      <Section
        id="how-it-works"
        tone="warm"
        eyebrow="What to expect"
        title="How it works"
        intro="Five simple steps, at your own pace. GARNET guides the learning - your care team guides the medical decisions."
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <ol className="flex flex-col">
            {STEPS.map((step, index) => (
              <StepCard
                key={step.title}
                number={index + 1}
                title={step.title}
                last={index === STEPS.length - 1}
              >
                {step.text}
              </StepCard>
            ))}
          </ol>
          <Card className="border-brand/20 bg-brand-soft p-7 sm:p-8 lg:sticky lg:top-28">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-surface text-brand shadow-soft">
              <TestTubes aria-hidden="true" className="size-6" />
            </span>
            <p className="mt-5 font-display text-2xl leading-snug font-semibold text-ink">
              Testing can often be as easy as a cheek swab.
            </p>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
              Many tests use a cheek swab or a saliva sample. Your doctor or genetic counselor can
              tell you what to expect.
            </p>
          </Card>
        </div>
      </Section>

      {/* ============ 6. Cost and privacy preview ============ */}
      <Section
        id="cost-privacy"
        tone="wash"
        eyebrow="Common questions"
        title="Cost and privacy"
        intro="Two things patients ask about most."
      >
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <Card className="p-7 sm:p-9">
            <IconChip icon={Wallet} tint="brand" className="size-[3.25rem]" />
            <h3 className="mt-5 font-display text-[1.4rem] leading-snug font-semibold text-ink">
              Cost and insurance
            </h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-body">
              Genetic testing may be covered by insurance, and financial assistance may be
              available. Costs vary, so it is important to ask before testing.
            </p>
          </Card>
          <Card className="p-7 sm:p-9">
            <IconChip icon={ShieldCheck} tint="plum" className="size-[3.25rem]" />
            <h3 className="mt-5 font-display text-[1.4rem] leading-snug font-semibold text-ink">
              Privacy and legal protections
            </h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-body">
              Genetic information is personal. GARNET explains privacy, genetic discrimination, and
              legal protections in simple language.
            </p>
          </Card>
        </div>
      </Section>

      {/* ============ 7. Credibility / Columbia connection ============ */}
      <Section
        id="about"
        eyebrow="Who is behind GARNET"
        title="Built with patient education and trust in mind"
      >
        <Card className="bg-gradient-to-br from-surface to-wash-warm p-7 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-lg leading-relaxed text-body">
                GARNET is being created as part of a research project at Columbia University Irving
                Medical Center. Medical researchers and genetic counseling experts help shape the
                information you read here - in plain language, for patients and families.
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
      </Section>

      {/* ============ 8. Call to action ============ */}
      <section id="check" aria-labelledby="check-heading" className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="on-dark cta-panel relative overflow-hidden rounded-[2rem] px-6 py-12 text-center shadow-lift sm:rounded-[2.75rem] sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-12 size-64 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-14 size-64 rounded-full bg-white/5 blur-3xl"
            />
            <h2
              id="check-heading"
              className="relative mx-auto max-w-3xl font-display text-[1.9rem] leading-tight font-semibold text-white sm:text-4xl"
            >
              Ready to learn whether genetic testing may be worth discussing?
            </h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Start with a few simple questions. Your answers are not a diagnosis, but they may
              help you prepare for a conversation with a doctor or genetic counselor.
            </p>
            <div className="relative mt-9">
              <Button href="/check" variant="inverse" className="w-full sm:w-auto">
                Start check
                <ArrowRight aria-hidden="true" className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
