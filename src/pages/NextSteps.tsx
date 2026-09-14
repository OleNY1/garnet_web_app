import { Landmark, MessagesSquare, Signpost, Stethoscope, TestTubes, ShieldCheck, Wallet } from 'lucide-react'
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

const CARE_TEAM_QUESTIONS = [
  'Is the type of kidney disease I have sometimes due to a genetic disease?',
  'Does my family history of kidney disease point to a possible genetic risk running in my family?',
  "As a child I had [a condition, such as a learning difficulty or hearing impairment] — could that be linked to my kidney disease?",
  'If I have a genetic disease, would it change how you manage my kidney disease?',
  'Could you refer me for genetic testing, or refer me to a genetic counselor?',
  'Do you know how much a genetic test would cost?',
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
        id="care-team-questions"
        eyebrow="Help talking with your care team"
        title="Questions to ask your doctor or a genetic counselor"
        intro="Consider asking these questions at your next appointment."
      >
        <Card className="mx-auto max-w-3xl p-7 sm:p-8">
          <ul className="flex flex-col gap-4">
            {CARE_TEAM_QUESTIONS.map((question) => (
              <li key={question} className="flex items-start gap-3.5">
                <IconChip
                  icon={MessagesSquare}
                  tint="plum"
                  className="mt-0.5 size-9 shrink-0 rounded-lg"
                />
                <span className="text-[1.02rem] leading-relaxed text-ink">{question}</span>
              </li>
            ))}
          </ul>
        </Card>
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
              Referral to Genetic Counseling
            </h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
              In some states and with some health insurance, you will need your nephrologist or
              primary care doctor to refer you to a genetic counselor or a genetics clinic. In
              others, you can simply schedule a meeting with a genetic counselor directly.
            </p>
          </Card>
          <Card className="p-7 sm:p-8">
            <IconChip icon={Wallet} tint="plum" className="size-[3.25rem]" />
            <h3 className="mt-5 font-display text-[1.3rem] leading-snug font-semibold text-ink">
              Cost and insurance
            </h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
              Health insurance often covers genetic testing, and many laboratories offer financial
              assistance if not. Costs vary by test type and laboratory. Some tests could be free,
              but others could cost several thousand dollars, so ask before testing. Genetic
              counselors have experience managing insurance costs and can help you navigate the
              system. Some genetic counselors work with insurance; others offer a maximum
              out-of-pocket cost. The information should be provided before meeting with a genetic
              counselor (
              <a
                href="https://findageneticcounselor.nsgc.org/?reload=timezone"
                target="_blank"
                rel="noreferrer"
                className="text-brand underline underline-offset-2 hover:text-brand-strong"
              >
                find a genetic counselor
              </a>
              ).
            </p>
          </Card>
          <Card className="p-7 sm:p-8">
            <IconChip icon={ShieldCheck} tint="plum" className="size-[3.25rem]" />
            <h3 className="mt-5 font-display text-[1.3rem] leading-snug font-semibold text-ink">
              Privacy and legal protections
            </h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
              Genetic information is protected like any other clinical information, and your
              doctor needs your agreement to share it with other doctors and family members. For
              healthy individuals who have a genetic risk to develop disease, there is a law to
              protect them from genetic discrimination called{' '}
              <a
                href="https://www.genome.gov/about-genomics/policy-issues/Genetic-Discrimination"
                target="_blank"
                rel="noreferrer"
                className="text-brand underline underline-offset-2 hover:text-brand-strong"
              >
                GINA
              </a>
              .
            </p>
          </Card>
        </div>
      </Section>
    </>
  )
}
