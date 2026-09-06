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
          ]}
        />
      </Section>
    </>
  )
}
