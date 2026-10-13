import { Cite } from '../../components/Cite'
import { StatGrid } from '../../components/learn/StatGrid'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

const IMPACT_STATS = [
  { value: '10–15%', label: 'of kidney disease in adults has a genetic cause' },
  { value: '7 in 10', label: 'cases in some groups of children have a genetic cause' },
  { value: '1 in 5', label: 'adults with CKD in one study had a positive genetic finding' },
]

/** Top half of the former "Discover why" page: how often a genetic cause is found. */
export function HowCommon() {
  return (
    <>
      <Section id="how-common" tone="wash" title="How often a genetic cause is behind kidney disease">
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

          <p>
            See <LearnLink to="/learn/how-testing-helps">How can genetic testing help?</LearnLink> for what
            finding a genetic cause can change.
          </p>
        </div>

        <Sources sources={numbered('groopman2019', 'dahl2023', 'franceschini2024')} />
      </Section>
    </>
  )
}
