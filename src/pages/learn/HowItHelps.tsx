import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { StatGrid } from '../../components/learn/StatGrid'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

const IMPACT_STATS = [
  { value: '1 in 5', label: 'patients with CKD had a positive genetic finding' },
  { value: '9 in 10', label: "had their doctor's care plan change because of it" },
  { value: '86%', label: 'said testing was helpful, among those with a positive result' },
]

export function HowItHelps() {
  return (
    <>
      <Section id="how-it-helps" tone="wash" title="What the research shows">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">A genetic diagnosis can:</h3>
          <ul className="list-disc space-y-2 pl-6 marker:text-brand">
            <li>Confirm or correct your diagnosis</li>
            <li>Start, avoid, or switch a treatment based on the exact cause of your kidney disease</li>
            <li>Avoid an invasive test like a kidney biopsy</li>
            <li>Help you make decisions about family planning</li>
            <li>Help guide kidney donation</li>
            <li>Lead to a referral to other specialists for other medical problems caused by this genetic disease</li>
            <li>
              Help your family members be diagnosed early and start treatment early, which can
              delay the need of dialysis by up to 27 years
              <Cite n={3} />
            </li>
          </ul>

          <figure className="mx-auto mt-2 flex max-w-3xl flex-col items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}learn-figures/kdigo-conditions-amenable-to-genetic-testing.png`}
              alt="Table of kidney conditions where a genetic diagnosis can guide care, including disease-modifying therapies, renoprotective strategies, avoidance of unnecessary immunosuppression, transplant recurrence risk, extra-renal screening, and reproductive counseling."
              className="w-full rounded-xl border border-line"
            />
            <figcaption className="text-center text-[0.9rem] leading-snug text-muted">
              Examples of how a genetic diagnosis can guide care.
              <Cite n={4} />
            </figcaption>
          </figure>

          <p>
            A genetic result is one more piece of information for your care team, alongside your
            symptoms, imaging, and lab work. It's meant to sharpen the picture, not replace the
            conversation with your doctor about what's next.
            <Cite n={1} />
          </p>

          <p>
            In one large study of over 1,600 adults with chronic kidney disease, about 1 in 5
            people (20.8%) had a positive genetic finding, spanning 54 different genes. For nearly
            half of those people, the result gave them a brand-new diagnosis or corrected an
            earlier one.
            <Cite n={1} />
          </p>

          <StatGrid tint="brand" stats={IMPACT_STATS} />

          <p>
            The same study found that a positive result changed how doctors managed care for about
            9 in 10 patients, including an actual change in treatment plan for roughly a third. A
            follow-up study that tracked patients for a full year found genetic testing was
            reported helpful, or led to a change in management, for 86% of people with a positive
            result — and still helped 42% of people with a negative result, often by ruling
            other causes out.
            <Cite n={1} />
            <Cite n={2} />
          </p>
          <p>
            A positive result also changed a doctor's estimate of a patient's long-term outlook for
            more than half of people who received one.
            <Cite n={2} />
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <CTARow tint="brand" />
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Dahl, N.K. et al. The clinical utility of genetic testing in the diagnosis and management of adults with chronic kidney disease. Journal of the American Society of Nephrology 34, 2039-2050 (2023).',
              url: 'https://doi.org/10.1681/ASN.0000000000000249',
            },
            {
              n: 2,
              citation:
                'Chebib, F.T. et al. Genetic testing in the management of adult CKD. Journal of the American Society of Nephrology 37, 777-789 (2026).',
              url: 'https://doi.org/10.1681/ASN.0000000913',
            },
            {
              n: 3,
              citation:
                'Gross, O. et al. Early angiotensin-converting enzyme inhibition in Alport syndrome delays renal failure and improves life expectancy. Kidney International 81, 494-501 (2012).',
              url: 'https://doi.org/10.1038/ki.2011.407',
            },
            {
              n: 4,
              citation:
                'KDIGO Conference Participants. Genetics in chronic kidney disease: conclusions from a Kidney Disease: Improving Global Outcomes (KDIGO) Controversies Conference. Kidney International 101, 1126-1141 (2022).',
              url: 'https://doi.org/10.1016/j.kint.2022.03.019',
            },
          ]}
        />
      </Section>
    </>
  )
}
