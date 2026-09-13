import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  FlaskConical,
  HandHeart,
  HeartHandshake,
  Info,
  Landmark,
  ListChecks,
  MessagesSquare,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { HeroVideo } from '../../components/HeroVideo'
import { JourneyPicker } from '../../components/learn/JourneyPicker'
import { Sources } from '../../components/Sources'
import type { Tint } from '../../components/IconChip'
import { IconChip } from '../../components/IconChip'
import { Section } from '../../components/Section'
import { TrustBadge } from '../../components/TrustBadge'
import type { ConditionLinkGroup, ExternalLink } from '../../lib/supportLinks'
import { GENERAL_SUPPORT_RESOURCE, RESEARCH_LINKS, SUPPORT_GROUP_LINKS } from '../../lib/supportLinks'

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
 * Hero card row. The description is always visible as a caption; hovering
 * the row just shifts its colors slightly.
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

const BENEFITS: Array<{ icon: LucideIcon; tint: Tint; title: string; text: string }> = [
  {
    icon: Search,
    tint: 'brand',
    title: 'Discover WHY',
    text: 'A genetic test can show why the kidney disease started.',
  },
  {
    icon: Users,
    tint: 'accent',
    title: 'Help your family',
    text: 'A genetic diagnosis may delay dialysis or kidney transplant for family members.',
  },
  {
    icon: HandHeart,
    tint: 'plum',
    title: 'Support living donor decisions',
    text: 'Identify family members who can safely donate their kidney.',
  },
  {
    icon: Stethoscope,
    tint: 'brand',
    title: 'Guide care',
    text: 'A genetic diagnosis may help doctors choose better treatments.',
  },
  {
    icon: Users,
    tint: 'accent',
    title: 'Find a support group',
    text: 'Connect with patient communities living with the same kidney condition.',
  },
  {
    icon: FlaskConical,
    tint: 'plum',
    title: 'Explore research opportunities',
    text: 'See whether a relevant clinical trial or research study is open to join.',
  },
]

const TRUST_POINTS = [
  'Supported by the National Kidney Foundation',
  'Developed with input from medical researchers and genetic counseling experts',
  'Designed for patients and families',
  'Educational only - not a diagnosis or medical advice',
]

function LinkRow({ link }: { link: ExternalLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start justify-between gap-3 rounded-xl p-2 -m-2 transition-colors duration-150 hover:bg-wash"
    >
      <span>
        <span className="block text-[1rem] leading-snug font-semibold text-ink group-hover:text-brand-strong">
          {link.label}
        </span>
        <span className="mt-0.5 block text-[0.92rem] leading-snug text-muted">{link.text}</span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="mt-1 size-4.5 shrink-0 text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
      />
    </a>
  )
}

function LinkListCard({
  icon,
  tint,
  title,
  intro,
  links,
}: {
  icon: LucideIcon
  tint: Tint
  title: string
  intro: string
  links: ExternalLink[]
}) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-7">
      <IconChip icon={icon} tint={tint} />
      <h3 className="mt-4 text-[1.22rem] leading-snug font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[1.02rem] leading-relaxed text-body">{intro}</p>
      <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
        {links.map((link) => (
          <li key={link.href}>
            <LinkRow link={link} />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.85rem] leading-snug text-muted">
        These are outside organizations, not part of GARNET. Ask your care team which ones fit
        your situation.
      </p>
    </Card>
  )
}

/**
 * Support-group box, grouped by condition (Alport, Fabry, PKD, etc.) so a
 * visitor can scan to the disease that matches their own diagnosis. Ends
 * with one condition-agnostic resource (Global Genes) that doesn't belong
 * to any single group.
 */
function GroupedLinkListCard({
  icon,
  tint,
  title,
  intro,
  groups,
  generalResource,
}: {
  icon: LucideIcon
  tint: Tint
  title: string
  intro: string
  groups: ConditionLinkGroup[]
  generalResource: ExternalLink
}) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-7">
      <IconChip icon={icon} tint={tint} />
      <h3 className="mt-4 text-[1.22rem] leading-snug font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[1.02rem] leading-relaxed text-body">{intro}</p>
      <div className="mt-5 flex flex-col gap-5 border-t border-line pt-5">
        {groups.map((group) => (
          <div key={group.condition}>
            <p className="text-[0.8rem] font-bold tracking-[0.1em] text-muted uppercase">
              {group.condition}
            </p>
            <ul className="mt-2 flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <LinkRow link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="border-t border-line pt-5">
          <p className="text-[0.8rem] font-bold tracking-[0.1em] text-muted uppercase">
            General resource
          </p>
          <ul className="mt-2 flex flex-col gap-2.5">
            <li>
              <LinkRow link={generalResource} />
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-4 text-[0.85rem] leading-snug text-muted">
        These are outside organizations, not part of GARNET. Ask your care team which ones fit
        your situation.
      </p>
    </Card>
  )
}

export function Overview() {
  return (
    <>
      {/* ============ Patient hero banner (moved here from the old Home.tsx) ============ */}
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
              <Button href="#why-it-matters">Start learning</Button>
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

      <Section id="trust-strip" className="!py-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrustBadge icon={Landmark}>Columbia University Irving Medical Center research project</TrustBadge>
          <TrustBadge icon={BadgeCheck}>Supported by the National Kidney Foundation</TrustBadge>
        </div>
      </Section>

      <Section
        id="why-it-matters"
        className="!pt-8 sm:!pt-10"
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

      {/* Split into two focused boxes per feedback, instead of one combined card. */}
      <Section
        id="support-and-research"
        headerClassName="max-w-6xl"
        eyebrow="Beyond GARNET"
        title="Find support or research opportunities"
        intro="Connect with other patients, or see if a study is enrolling near you."
      >
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <GroupedLinkListCard
            icon={Users}
            tint="accent"
            title="Patient support groups"
            intro="Talk with others who understand what it's like to live with your specific condition."
            groups={SUPPORT_GROUP_LINKS}
            generalResource={GENERAL_SUPPORT_RESOURCE}
          />
          <LinkListCard
            icon={FlaskConical}
            tint="plum"
            title="Research and clinical trials"
            intro="Explore studies that are looking for participants with kidney disease."
            links={RESEARCH_LINKS}
          />
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
