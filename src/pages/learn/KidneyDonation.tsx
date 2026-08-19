import { HeartHandshake, Search, Stethoscope } from 'lucide-react'
import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { FlowDiagram } from '../../components/learn/FlowDiagram'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

const DONATION_STEPS = [
  { icon: Stethoscope, label: 'Affected relative tested first', caption: 'The person with kidney disease' },
  { icon: Search, label: 'Exact cause identified', caption: 'A specific genetic finding, if there is one' },
  { icon: HeartHandshake, label: 'Donor candidate tested for that finding', caption: 'Only for the specific variant found' },
]

export function KidneyDonation() {
  return (
    <>
      <Section id="kidney-donation" tone="wash" title="What genetic testing means for donor candidates">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Living kidney donors already face a higher lifetime risk of kidney failure than similar
            people who don't donate — roughly five to ten times higher. That's part of why
            transplant centers evaluate donor candidates carefully, and why genetic disease in the
            family is one thing they screen for.
            <Cite n={1} />
          </p>
          <p>
            Genetic testing isn't recommended for every donor candidate. Specialists generally
            suggest it only when there's a family history of a known or suspected genetic kidney
            disease in a close relative — for example, a parent or sibling with a diagnosed or
            strongly suspected inherited kidney condition.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Test the affected relative first
          </h3>
          <p>
            The recommended approach is sequential: test the relative who already has kidney
            disease first, to pin down the exact genetic cause, and only then test the healthy
            donor candidate for that specific finding.
            <Cite n={1} />
          </p>

          <FlowDiagram tint="plum" steps={DONATION_STEPS} />

          <p>
            Testing a healthy candidate directly, without first confirming the cause in an
            affected relative, is generally discouraged — it's more likely to turn up confusing or
            misleading results in someone who was never at meaningful risk to begin with.
            <Cite n={1} />
          </p>
          <p>
            Before any testing, donor candidates should be counseled on what each possible result
            would mean: a positive result usually means donation isn't recommended, while a
            negative result reduces concern but doesn't always rule out risk completely.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            A note on ancestry-linked testing
          </h3>
          <p>
            For donor candidates with recent West African ancestry, doctors may also raise the
            option of testing a gene called APOL1, which is linked to a higher risk of kidney
            disease in this population. Having a higher-risk APOL1 result doesn't automatically
            rule someone out as a donor — it's a factor to weigh together with the transplant team,
            not a mandatory test or an automatic disqualifier.
            <Cite n={1} />
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <CTARow tint="plum" />
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Thomas, C.P. et al. Genetic evaluation of living kidney donor candidates: a review and recommendations for best practices. American Journal of Transplantation 23, 597-607 (2023).',
              url: 'https://doi.org/10.1016/j.ajt.2023.02.020',
            },
          ]}
        />
      </Section>
    </>
  )
}
