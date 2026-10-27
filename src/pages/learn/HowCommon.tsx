import { Cite } from '../../components/Cite'
import { Illustration } from '../../components/learn/Illustration'
import { StatGrid } from '../../components/learn/StatGrid'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

const IMPACT_STATS = [
  { value: '1 in 9', label: 'cases of kidney disease in adults have a genetic cause' },
  { value: '7 in 10', label: 'cases in some groups of children have a genetic cause' },
  { value: '1 in 5', label: 'adults with CKD in one study had a positive genetic finding' },
]

/** Top half of the former "Discover why" page: how often a genetic cause is found. */
export function HowCommon() {
  return (
    <>
      <Section id="how-common" tone="wash" title="How often a genetic cause is behind kidney disease">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <Illustration
            src="one-in-ten-people.png"
            alt="Ten people with kidney disease, one of them highlighted in red."
            size="lg"
          />

          <StatGrid tint="brand" stats={IMPACT_STATS} />

          <p>
            Studies suggest a genetic cause explains roughly 10% to 15% of kidney disease in adults,
            and as many as 70% of cases in some groups of children.
            <Cite n={1} />
            <Cite n={2} />
            <Cite n={3} />
          </p>

          <p>
            A genetic result is one more piece of information for your care team, alongside your
            symptoms, imaging, and lab work. It's meant to sharpen the picture, not replace the
            conversation with your doctor about what's next.
            <Cite n={2} />
          </p>

          <p>
            For more information on what a genetic diagnosis can change, see{' '}
            <LearnLink to="/learn/how-testing-helps">How can genetic testing help?</LearnLink>.
          </p>
        </div>

        <Sources sources={numbered('groopman2019', 'dahl2023', 'franceschini2024')} />
      </Section>
    </>
  )
}
