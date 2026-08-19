import { Landmark, Signpost, Stethoscope, TestTubes, ShieldCheck, Wallet } from 'lucide-react'
import { Card } from '../components/Card'
import { IconChip } from '../components/IconChip'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { StepCard } from '../components/StepCard'
import { TrustBadge } from '../components/TrustBadge'

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

export function NextSteps() {
  return (
    <>
      <PageHero
        icon={Signpost}
        tint="plum"
        eyebrow="Next steps"
        title="Understand next steps"
        intro="Learn how to talk with your doctor or a genetic counselor, ask about cost, and prepare for testing."
      />

      <Section id="trust-strip" className="!py-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrustBadge icon={Landmark}>Columbia University Irving Medical Center research project</TrustBadge>
        </div>
      </Section>

      <Section
        id="how-it-works"
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

      <Section
        id="cost-privacy"
        tone="wash"
        eyebrow="Common questions"
        title="Cost, referrals, and privacy"
        intro="The practical questions patients ask about most."
      >
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          <Card className="p-7 sm:p-8">
            <IconChip icon={Stethoscope} tint="plum" className="size-[3.25rem]" />
            <h3 className="mt-5 font-display text-[1.3rem] leading-snug font-semibold text-ink">
              Getting a referral
            </h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
              Your nephrologist or primary care doctor can refer you to a genetic counselor or a
              genetics clinic. Eligibility varies, so it's worth asking your doctor directly
              whether testing could be relevant for you.
            </p>
          </Card>
          <Card className="p-7 sm:p-8">
            <IconChip icon={Wallet} tint="plum" className="size-[3.25rem]" />
            <h3 className="mt-5 font-display text-[1.3rem] leading-snug font-semibold text-ink">
              Cost and insurance
            </h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
              Genetic testing may be covered by insurance, and financial assistance may be
              available. Costs vary, so it is important to ask before testing.
            </p>
          </Card>
          <Card className="p-7 sm:p-8">
            <IconChip icon={ShieldCheck} tint="plum" className="size-[3.25rem]" />
            <h3 className="mt-5 font-display text-[1.3rem] leading-snug font-semibold text-ink">
              Privacy and legal protections
            </h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
              Genetic information is personal. GARNET explains privacy, genetic discrimination, and
              legal protections in simple language.
            </p>
          </Card>
        </div>
      </Section>
    </>
  )
}
