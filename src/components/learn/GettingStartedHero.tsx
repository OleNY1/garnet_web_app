import { BookOpen, HeartHandshake, Info, Landmark, ListChecks, MessagesSquare, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../Button'
import { Card } from '../Card'
import { HeroVideo } from '../HeroVideo'
import type { Tint } from '../IconChip'
import { IconChip } from '../IconChip'
import { TrustBadge } from '../TrustBadge'

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

/**
 * The Getting Started tab's own full banner — video background, headline,
 * and the "What you'll find on GARNET" card. Rendered by LearnLayout
 * *instead of* the standard PageHero, only on the /learn (Getting Started)
 * route, so it sits above the tab strip in the same position every other
 * topic's PageHero would occupy.
 */
export function GettingStartedHero() {
  return (
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
  )
}
