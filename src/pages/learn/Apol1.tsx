import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

export function Apol1() {
  return (
    <>
      <Section id="apol1" tone="wash" title="A note on ancestry-linked testing">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            For donor candidates with recent West African ancestry, doctors may also raise the
            option of testing a gene called APOL1, which is linked to a higher risk of kidney
            disease in this population. Having a higher-risk APOL1 result doesn't automatically
            rule someone out as a donor — it's a factor to weigh together with the transplant team,
            not a mandatory test or an automatic disqualifier.
            <Cite n={1} />
          </p>
          <p>
            See{' '}
            <LearnLink to="/learn/kidney-donation">Support living donor decisions</LearnLink> for
            how specialists usually decide whether — and how — to test a donor candidate.
          </p>
        </div>

        <Sources sources={numbered('thomas2023')} />
      </Section>
    </>
  )
}
