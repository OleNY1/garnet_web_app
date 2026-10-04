import { Dna, Layers, ScanSearch, TestTube } from 'lucide-react'
import { Cite } from '../../components/Cite'
import { FlowDiagram } from '../../components/learn/FlowDiagram'
import { LearnLink } from '../../components/learn/LearnLink'
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

          <FlowDiagram tint="accent" steps={TEST_TYPES} connected={false} />
          <p className="-mt-2 text-center text-[0.95rem] leading-snug text-muted">
            <a
              href="https://doi.org/10.1016/j.ekir.2024.12.020"
              target="_blank"
              rel="noreferrer"
              className="text-brand underline underline-offset-2 hover:text-brand-strong"
            >
              Learn more about types of genetic testing
            </a>
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Why the choice matters
          </h3>
          <p>
            Broader tests generally cost more and take longer to come back than a single-gene
            test, and the wider net means they're more likely to turn up genetic changes whose
            relevance isn't fully clear yet. A narrower test is faster and simpler to interpret,
            but only works well when your doctor already has a strong reason to suspect a
            particular gene. See{' '}
            <LearnLink to="/learn/uncertain-results">Uncertain results / VUS</LearnLink> for what
            happens when a finding is not yet clearly harmful or clearly harmless.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Tests can also be grouped by disease
          </h3>
          <p>
            Genetic tests are also sometimes grouped by disease. Some kidney diseases have a
            limited number of genes that can cause them, so the test can focus on those genes
            only. Other kidney diseases can be caused by many different genes, and a large panel
            is more effective.
            <Cite n={3} />
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
