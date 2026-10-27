import { ArrowRight, ClipboardCheck, HandHeart, Microscope, Pill, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/Card'
import { Cite } from '../../components/Cite'
import type { Tint } from '../../components/IconChip'
import { IconChip } from '../../components/IconChip'
import { SubtopicCards } from '../../components/learn/SubtopicCards'
import { TopicIntro } from '../../components/learn/TopicIntro'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

/** One of the five "what a genetic diagnosis can do" boxes. */
function HelpBox({
  icon,
  tint,
  title,
  readMore,
  children,
}: {
  icon: LucideIcon
  tint: Tint
  title: string
  /** Learn page this box links to with a "Read more" link. Omitted where Hila asked for none. */
  readMore?: string
  children: ReactNode
}) {
  return (
    <Card className="flex flex-col p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <IconChip icon={icon} tint={tint} />
        <h2 className="pt-2 font-display type-sub leading-snug font-semibold text-ink">{title}</h2>
      </div>
      <div className="mt-4 flex flex-col gap-4 type-copy text-body">{children}</div>
      {readMore ? (
        <Link
          to={readMore}
          className="mt-auto inline-flex items-center gap-1 self-start pt-5 type-support font-semibold text-brand underline-offset-2 hover:text-brand-strong hover:underline"
        >
          Read more
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      ) : null}
    </Card>
  )
}

/**
 * What finding a genetic cause can change, as five boxes. Guide care, Help
 * your family and Support living donor decisions sit under this page in the
 * Learn menu.
 */
export function HowTestingHelps() {
  return (
    <>
      <Section id="how-testing-helps" tone="wash">
        <div className="mx-auto grid max-w-3xl gap-5">
          <div className="type-copy text-body">
            <TopicIntro path="/learn/how-testing-helps" />
          </div>
          <HelpBox icon={ClipboardCheck} tint="brand" title="Confirm or correct a diagnosis">
            <p>
              In one large study of over 1,600 adults with chronic kidney disease, about 1 in 5
              people (20.8%) had a positive genetic finding, spanning 54 different genes. For nearly
              half of those people, the result gave them a brand-new diagnosis or corrected an
              earlier one.
              <Cite n={1} />
            </p>
            <p>
              A positive result also changed a doctor's estimate of a patient's long-term outlook for
              more than half of people who received one.
              <Cite n={2} />
            </p>
          </HelpBox>

          <HelpBox icon={Pill} tint="accent" title="Change treatment" readMore="/learn/guide-care">
            <p>
              In the same study, a positive result changed how doctors managed care for about 9 in 10
              patients, including an actual change in treatment plan for 1 in 3 patients. A
              follow-up study that tracked patients for a full year found genetic testing was
              reported helpful, or led to a change in management, for 86% of people with a positive
              result — and still helped 42% of people with a negative result, often by ruling other
              causes out.
              <Cite n={1} />
              <Cite n={2} />
            </p>
            <p>
              A genetic diagnosis can also lead to a referral to other specialists for other medical
              problems caused by the same genetic disease.
            </p>
          </HelpBox>

          <HelpBox icon={Microscope} tint="brand" title="Avoid a biopsy">
            <p>
              When a genetic test finds the cause, some people may be able to avoid an invasive test
              like a kidney biopsy.
              <Cite n={3} />
            </p>
          </HelpBox>

          <HelpBox
            icon={Users}
            tint="plum"
            title="Help your family members be diagnosed and treated early"
            readMore="/learn/help-your-family"
          >
            <p>Help you make decisions about family planning.</p>
          </HelpBox>

          <HelpBox icon={HandHeart} tint="plum" title="Help guide kidney donation" readMore="/learn/kidney-donation">
            <p>Testing can help identify relatives who did not inherit the genetic cause.</p>
          </HelpBox>
        </div>

        <SubtopicCards parent="/learn/how-testing-helps" />

        <Sources
          sources={[
            ...numbered('dahl2023', 'chebib2026'),
            {
              n: 3,
              citation: 'American Kidney Fund. Genetic testing and counseling.',
              url: 'https://www.kidneyfund.org/all-about-kidneys/tests/genetic-testing-and-counseling',
            },
          ]}
        />
      </Section>
    </>
  )
}
