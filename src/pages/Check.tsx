import { ArrowRight, ListChecks } from 'lucide-react'
import { Button } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'

export function Check() {
  return (
    <>
      <PageHero
        icon={ListChecks}
        tint="accent"
        eyebrow="Check if testing may help"
        title="A few simple questions"
        intro="Answer simple questions about your kidney disease, family history, and related health signs."
      />

      <Section id="check" title="What to expect" intro="This takes about five minutes.">
        <div className="on-dark cta-panel relative overflow-hidden rounded-[2rem] px-6 py-12 text-center shadow-lift sm:rounded-[2.75rem] sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-12 size-64 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-14 size-64 rounded-full bg-white/10 blur-3xl"
          />
          <h2 className="relative mx-auto max-w-2xl font-display text-[1.7rem] leading-tight font-semibold text-white sm:text-3xl">
            Your answers are not a diagnosis
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/90">
            They may help you prepare for a conversation with a doctor or genetic counselor.
          </p>
          <div className="relative mt-8">
            <Button href="/next-steps" variant="inverse" className="w-full sm:w-auto">
              See what happens next
              <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
