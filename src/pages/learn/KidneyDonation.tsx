import { HeartHandshake, Search, Stethoscope } from 'lucide-react'
import { Cite } from '../../components/Cite'
import { FlowDiagram } from '../../components/learn/FlowDiagram'
import { Illustration } from '../../components/learn/Illustration'
import { TopicIntro } from '../../components/learn/TopicIntro'
import { LearnLink } from '../../components/learn/LearnLink'
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
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <Illustration
            src="family-generations.png"
            alt="Four people of increasing age, from a baby to an adult aged 50, standing along a timeline."
            size="sm"
          />

          <FlowDiagram tint="plum" steps={DONATION_STEPS} />

          <TopicIntro path="/learn/kidney-donation" />
          <p>
            When a family member needs a kidney, relatives often want to help. If the kidney disease
            has a genetic cause, testing can help identify relatives who did not inherit that cause
            and may be able to donate more safely.
            <Cite n={1} />
          </p>
          <p>
            The best way is to test the family member who already has kidney disease first. This
            helps doctors find the exact genetic change causing the disease. Then they can test the
            healthy person who wants to donate a kidney to see if they have that same genetic
            change.
            <Cite n={1} />
          </p>

          <figure className="mx-auto mt-2 flex max-w-3xl flex-col items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}learn-figures/testing-recommendations-at-risk.png`}
              alt="Flowchart of recommendations for genetic testing in at-risk adults and children, including kidney donor candidates and relatives at risk for a familial kidney disease."
              className="w-full rounded-xl border border-line"
            />
            <figcaption className="text-center type-support leading-snug text-muted">
              How specialists decide whether — and how — to test a donor candidate or an at-risk
              relative.
              <Cite n={2} />
            </figcaption>
          </figure>

          <p>
            Doctors usually do not recommend testing a healthy person first. If they do, the test may
            find results that are confusing or hard to understand. Testing the family member who
            has kidney disease first gives clearer answers and helps avoid unnecessary worry.
            <Cite n={1} />
          </p>
          <p>
            Donor candidates with recent West African ancestry may also be offered testing of a
            gene called <em>APOL1</em>. See{' '}
            <LearnLink to="/learn/apol1">
              <em>APOL1</em> risk factor
            </LearnLink>{' '}
            for what that
            result can and cannot mean for donation.
          </p>
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Thomas, C.P. et al. Genetic evaluation of living kidney donor candidates: a review and recommendations for best practices. American Journal of Transplantation 23, 597-607 (2023).',
              url: 'https://doi.org/10.1016/j.ajt.2023.02.020',
            },
            {
              n: 2,
              citation:
                'Franceschini, N. et al. Advancing Genetic Testing in Kidney Diseases: Report From a National Kidney Foundation Working Group. American Journal of Kidney Diseases 84, 751-766 (2024).',
              url: 'https://doi.org/10.1053/j.ajkd.2024.05.010',
            },
          ]}
        />
      </Section>
    </>
  )
}
