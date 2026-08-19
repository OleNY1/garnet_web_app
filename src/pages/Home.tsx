import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  Info,
  Landmark,
  ListChecks,
  MessagesSquare,
  ShieldCheck,
  Signpost,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { HeroVideo } from '../components/HeroVideo'
import type { Tint } from '../components/IconChip'
import { IconChip } from '../components/IconChip'
import { Section } from '../components/Section'
import { TrustBadge } from '../components/TrustBadge'

const HERO_FEATURES: Array<{ icon: LucideIcon; tint: Tint; label: string; tooltip: string }> = [
  {
    icon: BookOpen,
    tint: 'brand',
    label: 'Guides to genetic testing',
    tooltip: 'Short reads on what testing involves.',
  },
  {
    icon: ListChecks,
    tint: 'accent',
    label: 'A short question check',
    tooltip: 'See if testing may be worth discussing.',
  },
  {
    icon: MessagesSquare,
    tint: 'plum',
    label: 'Help talking with your care team',
    tooltip: 'Questions to ask your doctor or a genetic counselor.',
  },
  {
    icon: ShieldCheck,
    tint: 'brand',
    label: 'Privacy, cost, and your rights',
    tooltip: 'Plain answers about protections and cost.',
  },
]

/**
 * Hero card row. Previously the description lived in a hover/tap tooltip,
 * but its absolute positioning overlapped the row below it. Now the
 * description is always visible as a caption, and hovering the row just
 * shifts its colors slightly — no popup, nothing to overlap.
 */
function HeroFeature({
  icon,
  tint,
  label,
  tooltip,
}: {
  icon: LucideIcon
  tint: Tint
  label: string
  tooltip: string
}) {
  return (
    <li className="group flex items-start gap-4 rounded-xl p-1.5 -m-1.5 transition-colors duration-150 hover:bg-wash">
      <IconChip
        icon={icon}
        tint={tint}
        className="size-11 shrink-0 rounded-xl transition-colors duration-150"
      />
      <div>
        <p className="text-[1.05rem] leading-snug font-semibold text-ink transition-colors duration-150 group-hover:text-brand-strong">
          {label}
        </p>
        <p className="mt-0.5 text-[0.92rem] leading-snug text-muted">{tooltip}</p>
      </div>
    </li>
  )
}

const PATHS: Array<{ icon: LucideIcon; tint: Tint; title: string; text: string; cta: string; href: string }> = [
  {
    icon: BookOpen,
    tint: 'brand',
    title: 'Learn about genetic testing',
    text: 'What it is, how it works, and what it can and cannot tell you.',
    cta: 'Learn more',
    href: '/learn',
  },
  {
    icon: ListChecks,
    tint: 'accent',
    title: 'Check if testing may help',
    text: 'A few simple questions about your health and family history.',
    cta: 'Start check',
    href: '/check',
  },
  {
    icon: Signpost,
    tint: 'plum',
    title: 'Understand next steps',
    text: 'How to talk with your care team and prepare for testing.',
    cta: 'See next steps',
    href: '/next-steps',
  },
]

export function Home() {
  return (
    <>
      {/* ============ 1. Hero ============ */}
      <section id="top" aria-labelledby="hero-heading" className="hero-wash relative overflow-hidden">
        <HeroVideo />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <TrustBadge icon={Landmark}>Supported by the National Kidney Foundation.</TrustBadge>
            <h1
              id="hero-heading"
              className="mt-6 font-display text-[2.3rem] leading-[1.12] font-semibold text-ink sm:text-5xl sm:leading-[1.08] lg:text-[3.35rem]"
            >
              Could genetic testing help you or your family understand kidney disease?
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body sm:text-xl">
              GARNET helps people with kidney disease learn about genetic testing and prepare to
              talk with their care team.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/learn">Start learning</Button>
              <Button href="/check" variant="secondary">
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
              className="absolute -top-10 -right-8 size-56 rounded-full bg-brand/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -left-10 size-56 rounded-full bg-accent/25 blur-3xl"
            />
            <Card className="relative bg-gradient-to-br from-surface to-wash-warm p-6 sm:p-8">
              <p className="font-display text-xl font-semibold text-ink">
                What you’ll find on GARNET
              </p>
              <ul className="mt-6 flex flex-col gap-5">
                {HERO_FEATURES.map((feature) => (
                  <HeroFeature key={feature.label} {...feature} />
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

      {/* ============ 2. Three main path cards ============ */}
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
              className="flex scale-100 flex-col p-6 transition-all duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] hover:shadow-lift sm:p-7 lg:p-8"
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

      {/* ============ 3. Call to action ============ */}
      <section id="check" aria-labelledby="check-heading" className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="on-dark cta-panel relative overflow-hidden rounded-[2rem] px-6 py-12 text-center shadow-lift sm:rounded-[2.75rem] sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-12 size-64 rounded-full bg-white/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-14 size-64 rounded-full bg-white/10 blur-3xl"
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
