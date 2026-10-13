import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

export function UncertainResults() {
  return (
    <>
      <Section id="test-report">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            We are all different, and so is our DNA. Geneticists use multiple sources of information to classify the
            variants in each of us.
          </p>

          <p className="font-semibold text-ink">
            Genetic reports usually include the conclusion of the test: Positive or Negative.
          </p>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line border-t-4 border-t-accent bg-surface px-5 py-5 shadow-soft">
              <dt className="font-display text-[1.25rem] font-semibold text-accent">Positive</dt>
              <dd className="mt-2">
                A potential diagnostic finding is reported. The variant(s) are either classified as Pathogenic or Likely
                Pathogenic.
              </dd>
            </div>
            <div className="rounded-2xl border border-line border-t-4 border-t-brand bg-surface px-5 py-5 shadow-soft">
              <dt className="font-display text-[1.25rem] font-semibold text-brand">Negative</dt>
              <dd className="mt-2">
                No definitive diagnostic finding is reported. These results include heterozygote variants (1 variant on 1
                copy of the gene) in genes associated with recessive diseases (2 variants cause disease). They also
                include Variants of Uncertain Significance.
              </dd>
            </div>
          </dl>

          <figure className="flex flex-col items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}learn-figures/genetic-report-positive-vs-negative.png`}
              alt="Positive vs negative result. Variants run on a scale from Benign and Likely Benign (not reported), through Uncertain (negative; the report depends on the laboratory and type of test ordered), to Likely Pathogenic and Pathogenic, which give a positive result with one copy in dominant disease or two copies in recessive disease."
              className="w-full rounded-xl border border-line bg-white"
            />
          </figure>
        </div>
      </Section>

      <Section id="uncertain-results" tone="wash" title="What a VUS means">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Variants of Uncertain Significance (VUS) are changes that geneticists do not know whether to classify as
            harmful (pathogenic) or harmless (benign).
          </p>

          <p className="rounded-2xl border border-line bg-surface px-6 py-5 text-[1.12rem] font-semibold text-ink shadow-soft">
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
