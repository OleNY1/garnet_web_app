import { ArrowRight, ListChecks } from 'lucide-react'
import { Button } from '../components/Button'
import { Cite } from '../components/Cite'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Sources } from '../components/Sources'

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

      <Section
        id="signs-testing-may-help"
        className="!py-10 sm:!py-14"
        title="Signs that testing is more likely to find an answer"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            These signs make it more likely that testing will find a genetic cause. They do not
            guarantee a result. You can still benefit from testing if none of these apply. Doctors
            are more likely to suggest testing when someone has:
            <Cite n={1} />
          </p>
          <ul className="list-disc space-y-2 pl-6 marker:text-accent">
            <li>Kidney disease that started at a young age, got worse quickly, or is very serious</li>
            <li>Other parts of the body also affected, not only because the kidneys are failing</li>
            <li>Kidney disease in the family</li>
            <li>
              A type of kidney disease that often has a genetic cause, such as cysts in the
              kidneys, certain kinds of scarring, or kidney disease with no clear cause
            </li>
            <li>Clues from a kidney biopsy or blood tests that point to a known genetic condition</li>
          </ul>
        </div>
      </Section>

      <Section
        id="check"
        className="!pt-8 sm:!pt-10"
        title="What to expect"
        intro="This takes about five minutes."
      >
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

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Bogyo, K., Vena, N. & Milo Rasouly, H. The art and science of genetic counseling in nephrology. Kidney360 6, 1230-1244 (2025).',
              url: 'https://doi.org/10.34067/KID.0000000825',
            },
          ]}
        />
      </Section>
    </>
  )
}
