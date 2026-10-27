import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

export function Vus() {
  return (
    <>
      <Section id="uncertain-results" tone="wash" title="If you have questions about Variants of Uncertain Significance (VUS) in your report">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <p>
            Variants of Uncertain Significance (VUS) are changes that geneticists do not know whether to classify as
            harmful (pathogenic) or harmless (benign).
          </p>

          <p className="rounded-2xl border border-line bg-surface px-6 py-5 type-copy font-semibold text-ink shadow-soft">
            A VUS should <strong className="underline underline-offset-2">NOT</strong> be used to make medical decisions.
          </p>

          <p>
            As more people are tested and more research is done, these results are sometimes reclassified later — most
            often turning out to be harmless, though occasionally they're upgraded to a clear diagnosis.{' '}
            <a
              href="https://www.genomeconnect.org/"
              target="_blank"
              rel="noreferrer"
              className="text-brand underline underline-offset-2 hover:text-brand-strong"
            >
              GenomeConnect
            </a>{' '}
            is an NIH tool that notifies people if their variant is reclassified.
            <Cite n={1} />
            <Cite n={2} />
          </p>
          <p>
            People from backgrounds underrepresented in genetic research are more likely to receive an uncertain result
            — not because their DNA is more unusual, but because there is less existing data available for comparison.
            That's a gap in the research itself, not a reflection of any one person's results.
            <Cite n={1} />
          </p>
          <p>
            Broader tests are more likely to turn up an uncertain finding. See{' '}
            <LearnLink to="/learn/types-of-tests">Types of tests</LearnLink> for how doctors weigh that when choosing
            how much DNA to check.
          </p>
        </div>

        <Sources sources={numbered('groopman2025', 'bogyo2025')} />
      </Section>
    </>
  )
}
