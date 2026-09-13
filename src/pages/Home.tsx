import { ArrowRight, HeartHandshake, Landmark, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import type { Tint } from '../components/IconChip'
import { IconChip } from '../components/IconChip'
import { TrustBadge } from '../components/TrustBadge'

const DOCTOR_APP_URL = '/doctor/dashboard'

/**
 * The gateway landing page greets both audiences and asks them to pick a
 * side up front, instead of assuming a patient. Each side then gets its
 * own tailored banner: /learn (Overview.tsx) owns the patient-facing hero,
 * and /doctor/dashboard owns the clinician-facing one.
 */
const PATHS: Array<{
  icon: LucideIcon
  tint: Tint
  eyebrow: string
  title: string
  text: string
  cta: string
  href: string
}> = [
  {
    icon: HeartHandshake,
    tint: 'brand',
    eyebrow: 'For patients and families',
    title: 'I am a patient',
    text: 'Learn about genetic testing for kidney disease in plain language, including family sharing, privacy, and next steps.',
    cta: 'Enter patient side',
    href: '/learn',
  },
  {
    icon: Stethoscope,
    tint: 'accent',
    eyebrow: 'For doctors and clinicians',
    title: 'I am a doctor',
    text: 'Access the clinician-facing side with nephrology education, workflow guidance, counseling resources, and practical tools.',
    cta: 'Enter doctor side',
    href: DOCTOR_APP_URL,
  },
]

export function Home() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero-wash relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-20 size-72 rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-16 size-72 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-16 text-center sm:px-8 sm:py-24">
        <TrustBadge icon={Landmark}>Supported by the National Kidney Foundation.</TrustBadge>
        <p className="mt-6 text-[1.05rem] font-semibold tracking-[0.14em] text-brand uppercase">
          Hello, and welcome
        </p>
        <h1
          id="hero-heading"
          className="mt-3 max-w-3xl font-display text-[2.2rem] leading-[1.14] font-semibold text-ink sm:text-5xl sm:leading-[1.1]"
        >
          Welcome to GARNET
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">
          Whether you're a patient or family member trying to understand a diagnosis, or a
          physician looking for workflow and counseling support — welcome. GARNET has a side
          built for you. Tell us which one describes you today, and we'll take you there.
        </p>

        <div className="mt-12 grid w-full gap-5 sm:gap-6 md:grid-cols-2">
          {PATHS.map((path) => (
            <Card
              key={path.title}
              className="flex scale-100 flex-col p-6 text-left transition-all duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.015] hover:shadow-lift sm:p-8"
            >
              <IconChip icon={path.icon} tint={path.tint} className="size-[3.25rem]" />
              <p className="mt-6 text-[0.9rem] font-bold tracking-[0.14em] uppercase text-brand">
                {path.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-[1.7rem] leading-snug font-semibold text-ink sm:text-[1.9rem]">
                {path.title}
              </h2>
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

        <p className="mt-10 max-w-xl text-[0.95rem] leading-relaxed text-muted">
          GARNET is for education only. It does not provide a diagnosis or medical advice, and you
          can switch sides at any time using the link in the header.
        </p>
      </div>
    </section>
  )
}
