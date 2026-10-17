import { LearnLink } from '../../components/learn/LearnLink'
import { SubtopicCards } from '../../components/learn/SubtopicCards'
import { Section } from '../../components/Section'

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

          <p>
            Sometimes a result is not clearly positive or clearly negative. See{' '}
            <LearnLink to="/learn/vus">If your result is a VUS</LearnLink> for what that finding is, and why it should not be
            used to make medical decisions.
          </p>
        </div>

        <SubtopicCards parent="/learn/uncertain-results" />
      </Section>
    </>
  )
}
