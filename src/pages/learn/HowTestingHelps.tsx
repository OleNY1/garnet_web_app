import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { SubtopicCards } from '../../components/learn/SubtopicCards'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

/**
 * Bottom half of the former "Discover why" page: what finding a genetic
 * cause can change. Guide care, Help your family and Support living donor
 * decisions sit under this page in the Learn menu.
 */
export function HowTestingHelps() {
  return (
    <>
      <Section id="how-testing-helps" tone="wash">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <h2 className="font-display type-sub font-semibold text-ink">
            Confirm or correct a diagnosis
          </h2>
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

          <h2 className="mt-2 font-display type-sub font-semibold text-ink">Change treatment</h2>
          <p>
            In the same study, a positive result changed how doctors managed care for about 9 in 10
            patients, including an actual change in treatment plan for roughly a third. A follow-up
            study that tracked patients for a full year found genetic testing was reported helpful,
            or led to a change in management, for 86% of people with a positive result — and still
            helped 42% of people with a negative result, often by ruling other causes out.
            <Cite n={1} />
            <Cite n={2} />
          </p>
          <p>
            See <LearnLink to="/learn/guide-care">Guide care</LearnLink> for examples of treatments
            that depend on knowing the exact genetic cause.
          </p>

          <h2 className="mt-2 font-display type-sub font-semibold text-ink">Avoid a biopsy</h2>
          <p>
            When a genetic test finds the cause, some people may be able to avoid an invasive test
            like a kidney biopsy.
          </p>

          <h2 className="mt-2 font-display type-sub font-semibold text-ink">
            A genetic diagnosis can also:
          </h2>
          <ul className="list-disc space-y-2 pl-6 marker:text-brand">
            <li>
              Help your family members be diagnosed and treated early —{' '}
              <LearnLink to="/learn/help-your-family">Help your family</LearnLink>
            </li>
            <li>
              Help you make decisions about family planning —{' '}
              <LearnLink to="/learn/help-your-family">Help your family</LearnLink>
            </li>
            <li>
              Help guide kidney donation —{' '}
              <LearnLink to="/learn/kidney-donation">Support living donor decisions</LearnLink>
            </li>
            <li>
              Lead to a referral to other specialists for other medical problems caused by the same
              genetic disease
            </li>
          </ul>
        </div>

        <SubtopicCards parent="/learn/how-testing-helps" />

        <Sources sources={numbered('dahl2023', 'chebib2026')} />
      </Section>
    </>
  )
}
