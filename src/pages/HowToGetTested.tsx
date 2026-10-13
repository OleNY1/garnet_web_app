import { ExternalLink, Landmark, MessagesSquare, Signpost } from 'lucide-react'
import { Card } from '../components/Card'
import { IconChip } from '../components/IconChip'
import { LearnLink } from '../components/learn/LearnLink'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { TrustBadge } from '../components/TrustBadge'

const CARE_TEAM_QUESTIONS = [
  'Is the type of kidney disease I have sometimes due to a genetic disease?',
  'Does my family history of kidney disease point to a possible genetic risk running in my family?',
  "As a child I had [a condition, such as a learning difficulty or hearing impairment] — could that be linked to my kidney disease?",
  'If I have a genetic disease, would it change how you manage my kidney disease?',
  'Could you refer me for genetic testing, or refer me to a genetic counselor?',
  'Do you know how much a genetic test would cost?',
]

const FIND_A_GENETIC_COUNSELOR = 'https://findageneticcounselor.nsgc.org/?reload=timezone'

const ADDITIONAL_INFO = [
  {
    label: 'American Kidney Fund: Genetic testing and counseling',
    href: 'https://www.kidneyfund.org/all-about-kidneys/tests/genetic-testing-and-counseling',
  },
  { label: 'NephCure: Genetic testing', href: 'https://nephcure.org/managing-rkd/genetic-testing/' },
]

const linkClasses = 'text-brand underline underline-offset-2 hover:text-brand-strong'
const bodyClasses = 'mx-auto flex max-w-3xl flex-col gap-5 text-[1.05rem] leading-relaxed text-body'

export function HowToGetTested() {
  return (
    <>
      <PageHero
        icon={Signpost}
        tint="plum"
        eyebrow="How to get tested"
        title="How can I get genetic testing?"
        intro="Learn how to talk with your doctor or a genetic counselor, ask about cost, and prepare for testing."
      />

      <Section id="trust-strip" className="!py-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrustBadge icon={Landmark}>Columbia University Irving Medical Center research project</TrustBadge>
        </div>
      </Section>

      <Section id="path-to-test" className="!pt-0" title="The path to the test">
        <div className={bodyClasses}>
          <p className="font-semibold text-ink">Your health care provider needs to order the genetic test.</p>
          <p>
            Your health care provider can be your primary care provider, family doctor, nephrologist, or a{' '}
            <LearnLink to="/learn/genetic-counselors">genetic counselor</LearnLink>.
          </p>
          <p>
            You can use the <LearnLink to="/check">Genetic Risk Check</LearnLink> to receive personalized information to
            share with your doctor and start the process.
          </p>
        </div>
      </Section>

      <Section
        id="care-team-questions"
        tone="wash"
        eyebrow="Help talking with your care team"
        title="Questions to ask your doctor or a genetic counselor"
        intro="Consider asking these questions at your next appointment."
      >
        <Card className="mx-auto max-w-3xl p-7 sm:p-8">
          <ul className="flex flex-col gap-4">
            {CARE_TEAM_QUESTIONS.map((question) => (
              <li key={question} className="flex items-start gap-3.5">
                <IconChip icon={MessagesSquare} tint="plum" className="mt-0.5 size-9 shrink-0 rounded-lg" />
                <span className="text-[1.02rem] leading-relaxed text-ink">{question}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section id="genetic-counselor" title="What do I need to do to meet with a genetic counselor?">
        <div className={bodyClasses}>
          <p>
            In many states in the US, you can simply schedule an appointment with a genetic counselor directly (
            <a href={FIND_A_GENETIC_COUNSELOR} target="_blank" rel="noreferrer" className={linkClasses}>
              find a genetic counselor
            </a>
            ). Some insurance plans require a referral to a genetic counselor to cover the appointment costs.
          </p>
          <p>
            <LearnLink to="/learn/genetic-counselors">To learn more about genetic counselors</LearnLink>.
          </p>
        </div>
      </Section>

      <Section id="cost-insurance" tone="wash" title="Is genetic testing covered by insurance?">
        <div className={bodyClasses}>
          <p>
            Health insurance often covers genetic testing, and many laboratories offer financial assistance if not.
            Receiving approval for genetic testing from private insurance companies can sometimes be difficult and
            time-consuming. If denied, your doctor's office can submit an appeal. Some laboratories offer financial aid,
            and others have relatively affordable out-of-pocket costs (saving you the time of chasing your insurance).
          </p>
          <p>
            Costs vary by test type and laboratory. Some tests could be free, but others could cost several thousand
            dollars, so ask before testing. Genetic counselors have experience managing insurance costs and can help you
            navigate the system. Some genetic counselors work with insurance; others offer a maximum out-of-pocket cost.
            The information should be provided before meeting with a genetic counselor (
            <a href={FIND_A_GENETIC_COUNSELOR} target="_blank" rel="noreferrer" className={linkClasses}>
              find a genetic counselor
            </a>
            ).
          </p>
        </div>
      </Section>

      <Section id="additional-info" title="Additional information">
        <ul className="mx-auto flex max-w-3xl flex-col gap-3 text-[1.05rem]">
          {ADDITIONAL_INFO.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noreferrer" className={`inline-flex items-start gap-2 ${linkClasses}`}>
                <ExternalLink aria-hidden="true" className="mt-1.5 size-4 shrink-0" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
