import { Cite } from '../../components/Cite'
import { Card } from '../../components/Card'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

const TREATMENT_EXAMPLES = [
  {
    condition: 'Fabry disease',
    text: 'A genetic diagnosis of Fabry disease can lead to enzyme replacement therapy, which replaces the enzyme the body is missing.',
  },
  {
    condition: 'Primary hyperoxaluria type 1',
    text: 'A diagnosis of primary hyperoxaluria type 1 enables the prescription of lumasiran, a medicine that lowers how much oxalate the body makes.',
  },
  {
    condition: 'Primary coenzyme Q10 deficiency',
    text: 'Early diagnosis of primary coenzyme Q10 deficiency can help preserve kidney function by simply prescribing high-dose CoQ10 supplements.',
  },
]

/**
 * Second half of the former "How genetic testing helps" page: how knowing
 * the exact cause can start, avoid, or switch a treatment.
 */
export function GuideCare() {
  return (
    <>
      <Section id="guide-care" tone="wash" title="Start, avoid, or switch a treatment">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Some kidney diseases with a genetic cause have treatments made for that exact cause.
            Knowing the cause can help your care team start the right treatment, avoid one that is
            unlikely to work, or switch to a better option.
          </p>
          <p>
            In one large study of adults with chronic kidney disease, a positive genetic result
            changed how doctors managed care for about 9 in 10 patients, including an actual change
            in treatment plan for roughly a third.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Examples of treatments that depend on the genetic cause
          </h3>
          <div className="grid gap-4">
            {TREATMENT_EXAMPLES.map((example) => (
              <Card key={example.condition} className="p-5 sm:p-6">
                <p className="text-[1.08rem] leading-snug font-semibold text-ink">
                  {example.condition}
                </p>
                <p className="mt-2 text-[1rem] leading-relaxed text-body">{example.text}</p>
              </Card>
            ))}
          </div>

          <figure className="mx-auto mt-2 flex max-w-3xl flex-col items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}learn-figures/kdigo-conditions-amenable-to-genetic-testing.png`}
              alt="Table of kidney conditions where a genetic diagnosis can guide care, including disease-modifying therapies, renoprotective strategies, avoidance of unnecessary immunosuppression, transplant recurrence risk, extra-renal screening, and reproductive counseling."
              className="w-full rounded-xl border border-line"
            />
            <figcaption className="text-center text-[0.9rem] leading-snug text-muted">
              More examples of how a genetic diagnosis can guide care.
              <Cite n={2} />
            </figcaption>
          </figure>

          <p>
            Every situation is different. Talk with your doctor or a{' '}
            <LearnLink to="/learn/genetic-counselors">genetic counselor</LearnLink> about whether a
            genetic result could change your own care.
          </p>
        </div>

        <Sources sources={numbered('dahl2023', 'kdigo2022')} />
      </Section>
    </>
  )
}
