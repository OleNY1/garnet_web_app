import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { StatGrid } from '../../components/learn/StatGrid'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

const IMPACT_STATS = [
  { value: '10–15%', label: 'of kidney disease in adults has a genetic cause' },
  { value: '7 in 10', label: 'cases in some groups of children have a genetic cause' },
  { value: '1 in 5', label: 'adults with CKD in one study had a positive genetic finding' },
]

/**
 * First half of the former "How genetic testing helps" page: why a genetic
 * cause matters and what finding it can tell you. The treatment half lives
 * on Guide care.
 */
export function DiscoverWhy() {
  return (
    <>
      <Section id="discover-why" tone="wash" title="How often a genetic cause is behind kidney disease">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Studies suggest a genetic cause explains roughly 10% to 15% of kidney disease in adults,
            and as many as 7 in 10 cases in some groups of children.
            <Cite n={1} />
            <Cite n={2} />
            <Cite n={3} />
          </p>

          <StatGrid tint="brand" stats={IMPACT_STATS} />

          <p>
            A genetic result is one more piece of information for your care team, alongside your
            symptoms, imaging, and lab work. It's meant to sharpen the picture, not replace the
            conversation with your doctor about what's next.
            <Cite n={2} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Confirm or correct a diagnosis
          </h3>
          <p>
            In one large study of over 1,600 adults with chronic kidney disease, about 1 in 5
            people (20.8%) had a positive genetic finding, spanning 54 different genes. For nearly
            half of those people, the result gave them a brand-new diagnosis or corrected an
            earlier one.
            <Cite n={2} />
          </p>
          <p>
            A positive result also changed a doctor's estimate of a patient's long-term outlook for
            more than half of people who received one.
            <Cite n={4} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">Change treatment</h3>
          <p>
            In the same study, a positive result changed how doctors managed care for about 9 in 10
            patients, including an actual change in treatment plan for roughly a third. A follow-up
            study that tracked patients for a full year found genetic testing was reported helpful,
            or led to a change in management, for 86% of people with a positive result — and still
            helped 42% of people with a negative result, often by ruling other causes out.
            <Cite n={2} />
            <Cite n={4} />
          </p>
          <p>
            See <LearnLink to="/learn/guide-care">Guide care</LearnLink> for examples of treatments
            that depend on knowing the exact genetic cause.
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">Avoid a biopsy</h3>
          <p>
            When a genetic test finds the cause, some people may be able to avoid an invasive test
            like a kidney biopsy.
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            A genetic diagnosis can also:
          </h3>
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

        <Sources sources={numbered('groopman2019', 'dahl2023', 'franceschini2024', 'chebib2026')} />
      </Section>
    </>
  )
}
