import { Dna, Layers, ScanSearch, TestTube } from 'lucide-react'
import { Cite } from '../../components/Cite'
import { FlowDiagram } from '../../components/learn/FlowDiagram'
import { LearnLink } from '../../components/learn/LearnLink'
import { LinkRow } from '../../components/learn/LinkCards'
import { TopicIntro } from '../../components/learn/TopicIntro'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { GENERAL_SUPPORT_RESOURCE } from '../../lib/supportLinks'

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
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <FlowDiagram tint="accent" steps={TEST_TYPES} connected={false} />
          <p className="-mt-2 text-center type-support leading-snug text-muted">
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

          <TopicIntro path="/learn/types-of-tests" />
          <p>
            Not every genetic test looks at the same number of genes. Broader tests can find more,
            but they also take longer to process and can turn up findings unrelated to your
            kidneys.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display type-sub font-semibold text-ink">
            Why the choice matters
          </h3>
          <p>
            Broader tests generally cost more and take longer to come back than a single-gene
            test, and the wider net means they're more likely to turn up genetic changes whose
            relevance isn't fully clear yet. A narrower test is faster and simpler to interpret,
            but only works well when your doctor already has a strong reason to suspect a
            particular gene. See{' '}
            <LearnLink to="/learn/vus">What a VUS means</LearnLink> for what
            happens when a finding is not yet clearly harmful or clearly harmless.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display type-sub font-semibold text-ink">
            Genes can be grouped by disease and tested with a "genetic panel"
          </h3>
          <p>
            Genetic tests are often looking for genes associated with a clinical presentation. Some
            kidney diseases have a limited number of genes that can cause them, so the test can
            focus only on those genes. Other kidney diseases can be caused by many different genes, and a large panel
            is more effective.
            <Cite n={3} />
          </p>

          <h3 className="mt-2 font-display type-sub font-semibold text-ink">
            Findings beyond your kidneys
          </h3>
          <p>
            The broadest tests, like exome sequencing, can return results of a genetic disease
            unrelated to your kidney disease, such as an increased risk for a certain cancer or
            heart condition. National guidelines recommend that labs report a specific list of
            these "medically actionable" findings when one turns up, but patients can typically
            choose whether they want to receive them before the test.
            <Cite n={1} />
            <Cite n={4} />
          </p>

          <p>
            Before testing, it's normal to talk through your personal and family medical history
            with your doctor or a genetic counselor, so the right test can be chosen and you know
            what each possible result would mean.
            <Cite n={2} />
          </p>

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-soft sm:p-6">
            <p className="type-support font-bold tracking-[0.1em] text-muted uppercase">General resource</p>
            <div className="mt-3">
              <LinkRow link={GENERAL_SUPPORT_RESOURCE} />
            </div>
          </div>
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
            {
              n: 4,
              citation:
                'Elefant, N., Marasà, M. & Milo Rasouly, H. Beyond kidney genes: broad clinical implications of genetic testing for nephrology patients. Seminars in Nephrology 45, 151660 (2025).',
              url: 'https://doi.org/10.1016/j.semnephrol.2025.151660',
            },
          ]}
        />
      </Section>
    </>
  )
}
