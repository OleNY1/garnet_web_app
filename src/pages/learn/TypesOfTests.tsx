import { Dna, Layers, ScanSearch, TestTube } from 'lucide-react'
import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { FlowDiagram } from '../../components/learn/FlowDiagram'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

const TEST_TYPES = [
  { icon: TestTube, label: 'Single-gene test', caption: 'One gene, already suspected' },
  { icon: Layers, label: 'Gene panel', caption: 'A group of genes for one disease category' },
  { icon: ScanSearch, label: 'Exome sequencing', caption: 'The protein-making parts of nearly all genes' },
  { icon: Dna, label: 'Genome sequencing', caption: "Essentially all of a person's DNA" },
]

export function TypesOfTests() {
  return (
    <>
      <Section id="types-of-tests" title="The main types of genetic tests">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Not every genetic test looks at the same amount of DNA. Broader tests can find more,
            but they also take longer to process and can turn up findings unrelated to your
            kidneys.
            <Cite n={1} />
          </p>

          <FlowDiagram tint="accent" steps={TEST_TYPES} />

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Why the choice matters
          </h3>
          <p>
            Broader tests generally cost more and take longer to come back than a single-gene
            test, and the wider net means they're more likely to turn up genetic changes whose
            relevance isn't fully clear yet. A narrower test is faster and simpler to interpret,
            but only works well when your doctor already has a strong reason to suspect a
            particular gene.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Tests can also be grouped by what they're for
          </h3>
          <p>
            The categories above describe how much DNA a test checks. Genetic tests are also
            sometimes grouped by the question they're trying to answer: a diagnostic test looks
            for the cause of symptoms someone already has, a predictive (or presymptomatic) test
            checks a healthy relative's risk before any symptoms appear, and a carrier test tells
            someone without symptoms whether they could pass a condition on to a future child.
            <Cite n={3} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            When a result comes back "uncertain"
          </h3>
          <p>
            Sometimes a test finds a change in a gene that hasn't yet been classified as clearly
            harmful or clearly harmless — called a variant of uncertain significance, or VUS. By
            current guidelines, a VUS on its own shouldn't be used to make medical decisions. As
            more people are tested and more research is done, these results are sometimes
            reclassified later — most often turning out to be harmless, though occasionally they're
            upgraded to a clear diagnosis.
            <Cite n={1} />
            <Cite n={2} />
          </p>
          <p>
            People from backgrounds underrepresented in genetic research are more likely to
            receive an uncertain result — not because their DNA is more unusual, but because there
            is less existing data available for comparison. That's a gap in the research itself,
            not a reflection of any one person's results.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Findings beyond your kidneys
          </h3>
          <p>
            The broadest tests — exome and genome sequencing — occasionally turn up a genetic
            finding unrelated to kidney disease, such as an increased risk for a certain cancer or
            heart condition. National guidelines recommend that labs report a specific list of
            these "medically actionable" findings when one turns up, but patients can typically
            choose in advance whether they want to receive them.
            <Cite n={1} />
          </p>

          <p>
            Before testing, it's normal to talk through your personal and family medical history
            with your doctor or a genetic counselor, so the right test can be chosen and you know
            what each possible result would mean.
            <Cite n={2} />
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <CTARow tint="accent" />
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Groopman, E. & Milo Rasouly, H. Navigating genetic testing in nephrology: options and decision-making strategies. Kidney International Reports 10, 673-695 (2025).',
              url: 'https://doi.org/10.1016/j.ekir.2024.12.020',
            },
            {
              n: 2,
              citation:
                'Bogyo, K., Vena, N. & Milo Rasouly, H. The art and science of genetic counseling in nephrology. Kidney360 6, 1230-1244 (2025).',
              url: 'https://doi.org/10.34067/KID.0000000825',
            },
            {
              n: 3,
              citation: 'MedlinePlus Genetics (National Library of Medicine). What are the different types of genetic tests?',
              url: 'https://medlineplus.gov/genetics/understanding/testing/types/',
            },
          ]}
        />
      </Section>
    </>
  )
}
