import { Landmark, MessagesSquare, Signpost } from 'lucide-react'
import { Card } from '../components/Card'
import { IconChip } from '../components/IconChip'
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

export function HowToGetTested() {
  return (
    <>
      <PageHero
        icon={Signpost}
        tint="plum"
        eyebrow="How to get tested"
        title="How to get tested?"
        intro="Learn how to talk with your doctor or a genetic counselor, ask about cost, and prepare for testing."
      />

      <Section id="trust-strip" className="!py-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TrustBadge icon={Landmark}>Columbia University Irving Medical Center research project</TrustBadge>
        </div>
      </Section>

      <Section
        id="care-team-questions"
        className="!pt-0"
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
    </>
  )
}
